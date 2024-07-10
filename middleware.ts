import { get } from "@vercel/edge-config";
import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};

// Configuration stored in Edge Config.
interface CanaryConfig {
  deploymentExistingDomain: string;
  deploymentCanaryDomain: string;
  trafficCanaryPercent: number;
}

export async function middleware(req: NextRequest) {
  // We don't want to run blue-green during development.
  if (process.env.NODE_ENV !== "production") {
    return NextResponse.next();
  }
  // Skip if the middleware has already run.
  if (req.headers.get("x-deployment-override")) {
    return getDeploymentWithCookieBasedOnEnvVar();
  }
  // We skip blue-green when accesing from deployment urls
  if (req.nextUrl.hostname === process.env.VERCEL_URL) {
    return NextResponse.next();
  }
  // We only want to run blue-green for GET requests that are for HTML documents.
  if (req.method !== "GET") {
    return NextResponse.next();
  }
  if (req.headers.get("sec-fetch-dest") !== "document") {
    return NextResponse.next();
  }
  // Skip if the request is coming from Vercel's deployment system.
  if (/vercel/i.test(req.headers.get("user-agent") || "")) {
    return NextResponse.next();
  }
  if (!process.env.EDGE_CONFIG) {
    console.warn("EDGE_CONFIG env variable not set. Skipping blue-green.");
    return NextResponse.next();
  }
  // Get the blue-green configuration from Edge Config.
  const canary = await get<CanaryConfig>("canary-configuration");
  console.log("canary", canary);
  if (!canary) {
    console.warn("No blue-green configuration found");
    return NextResponse.next();
  }
  const servingDeploymentDomain = process.env.VERCEL_URL;
  console.log("servingDeploymentDomain", servingDeploymentDomain);
  const selectedDeploymentDomain = selectBlueGreenDeploymentDomain(canary);
  console.log("selectedDeploymentDomain", selectedDeploymentDomain);

  if (!selectedDeploymentDomain) {
    return NextResponse.next();
  }
  // The selected deployment domain is the same as the one serving the request.
  if (servingDeploymentDomain === selectedDeploymentDomain) {
    return getDeploymentWithCookieBasedOnEnvVar();
  }
  // Fetch the HTML document from the selected deployment domain and return it to the user.
  const headers = new Headers(req.headers);
  headers.set("x-deployment-override", selectedDeploymentDomain);
  headers.set(
    "x-vercel-protection-bypass",
    process.env.VERCEL_AUTOMATION_BYPASS_SECRET || "unknown"
  );
  const url = new URL(req.url);
  url.hostname = selectedDeploymentDomain;
  return fetch(url, {
    headers,
    redirect: "manual",
  });
}

// Selects the deployment domain based on the blue-green configuration.
function selectBlueGreenDeploymentDomain(blueGreenConfig: CanaryConfig) {
  const random = Math.random() * 100;

  const selected =
    random < blueGreenConfig.trafficCanaryPercent
      ? blueGreenConfig.deploymentCanaryDomain
      : blueGreenConfig.deploymentExistingDomain || process.env.VERCEL_URL;
  if (!selected) {
    console.error("Blue green configuration error", blueGreenConfig);
  }
  if (/^http/.test(selected || "")) {
    return new URL(selected || "").hostname;
  }
  return selected;
}

function getDeploymentWithCookieBasedOnEnvVar() {
  console.log(
    "Setting cookie based on env var",
    process.env.VERCEL_DEPLOYMENT_ID
  );
  const response = NextResponse.next();
  // We need to set this cookie because next.js does not do this by default, but we do want
  // the deployment choice to survive a client-side navigation.
  response.cookies.set("__vdpl", process.env.VERCEL_DEPLOYMENT_ID || "", {
    sameSite: "strict",
    httpOnly: true,
    maxAge: 60 * 60 * 24, // 24 hours
  });
  return response;
}
