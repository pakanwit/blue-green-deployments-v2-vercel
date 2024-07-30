import { get } from "@vercel/edge-config";
import { NextRequest, NextResponse } from "next/server";

// Configuration stored in Edge Config.
interface CanaryConfig {
  deploymentExistingDomain: string;
  deploymentCanaryDomain: string;
  trafficCanaryPercent: number;
}

const PUBLIC_FILE = /\.(.*)$/;

const allowedOrigins = process.env.ALLOWED_ORIGIN.split(",") || [
  "https://15minuteplan-ai.kanoonth.com",
];

export async function middleware(req: NextRequest) {
  // We don't want to run canary during development.
  const { pathname } = req.nextUrl;
  if (process.env.NODE_ENV !== "production") {
    return NextResponse.next();
  }

  const experiment_id = req.cookies.get("experimentID");
  const experimentId = process.env.EXPERIMENT_ID;

  if (
    experimentId === "NO_EXPERIMENT" ||
    experiment_id?.value === "NO_EXPERIMENT"
  ) {
    return NextResponse.next();
  }

  // If pathname is /api/..., set allowed origin.
  const origin = req.headers.get("origin") || "";
  const res = NextResponse.next();
  // if (pathname.startsWith("/api/")) {
  //   if (allowedOrigins.includes(origin)) {
  //     res.headers.set("Access-Control-Allow-Origin", origin);
  //   }
  //   res.headers.set("Access-Control-Allow-Credentials", "true");
  //   res.headers.set(
  //     "Access-Control-Allow-Methods",
  //     "GET, DELETE, PATCH, POST, PUT, OPTIONS"
  //   );
  //   res.headers.set(
  //     "Access-Control-Allow-Headers",
  //     "Content-Type, Authorization, Api-Key"
  //   );
  //   // Handle preflight requests
  //   if (req.method === "OPTIONS") {
  //     console.log("OPTIONS =====");
  //     return new NextResponse(null, { status: 204, headers: res.headers });
  //   }

  //   return res;
  // }

  if (
    pathname.startsWith("/_next") || // exclude Next.js internals
    pathname.startsWith("/static") || // exclude static files
    pathname.includes("/favicon") ||
    pathname.startsWith("/api/") ||
    PUBLIC_FILE.test(pathname) // exclude all files in the public folder
  ) {
    return NextResponse.next();
  }

  if (
    req.cookies.has("experimentID") &&
    experiment_id.value === experimentId &&
    req.cookies.has("hostname")
  ) {
    const hostname = req.cookies.get("hostname");
    const headers = new Headers(req.headers);
    headers.set("x-deployment-override", hostname.value);
    headers.set("x-forwarded-host", "15minuteplan-ai.kanoonth.com");
    headers.set(
      "x-vercel-protection-bypass",
      process.env.VERCEL_AUTOMATION_BYPASS_SECRET || "unknown"
    );
    const url = new URL(req.url);
    url.hostname = hostname.value;
    return fetch(url, {
      headers,
      redirect: "manual",
    });
  }

  // Skip if the middleware has already run.
  if (req.headers.get("x-deployment-override")) {
    return getDeploymentWithCookieBasedOnEnvVar(req);
  }
  // We skip canary when accesing from deployment urls
  if (req.nextUrl.hostname === process.env.VERCEL_URL) {
    return NextResponse.next();
  }
  // We only want to run canary for GET requests that are for HTML documents.
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
    console.warn("EDGE_CONFIG env variable not set. Skipping canary.");
    return NextResponse.next();
  }
  // Get the canary configuration from Edge Config.
  const canary = await get<CanaryConfig>("canary-configuration");

  if (!canary) {
    console.warn("No canary configuration found");
    return NextResponse.next();
  }
  const servingDeploymentDomain = process.env.VERCEL_URL;
  const selectedDeploymentDomain = selectDeploymentDomain(canary);

  if (!selectedDeploymentDomain) {
    return NextResponse.next();
  }
  // The selected deployment domain is the same as the one serving the request.
  if (servingDeploymentDomain === selectedDeploymentDomain) {
    return getDeploymentWithCookieBasedOnEnvVar(req);
  }

  // default cookies
  if (
    selectedDeploymentDomain ===
    new URL(canary.deploymentExistingDomain || "").hostname
  ) {
    return setDefaultCookies(selectedDeploymentDomain);
  }

  // Fetch the HTML document from the selected deployment domain and return it to the user.
  return fetchDocument(req, selectedDeploymentDomain);
}

async function fetchDocument(req: NextRequest, selectedDeploymentDomain) {
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
// Selects the deployment domain based on the canary configuration.
function selectDeploymentDomain(canaryConfig: CanaryConfig) {
  const random = Math.random() * 100;

  const selected =
    random < canaryConfig.trafficCanaryPercent
      ? canaryConfig.deploymentCanaryDomain
      : canaryConfig.deploymentExistingDomain || process.env.VERCEL_URL;
  if (!selected) {
    console.error("Canary configuration error", canaryConfig);
  }
  if (/^http/.test(selected || "")) {
    return new URL(selected || "").hostname;
  }
  return selected;
}

async function saveVariantIDCount(variantID, experimentID) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/saveVariantIDCount`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "api-key": `${process.env.API_KEY}`,
        },
        body: JSON.stringify({
          experimentID,
          variantID: variantID.toString(),
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json(); // assuming your API returns a JSON response
    return data; // use or return the data as needed
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

function setDefaultCookies(hostname: string) {
  const response = NextResponse.next();
  response.cookies.set("experimentID", "NO_EXPERIMENT");
  response.cookies.set("hostname", hostname);
  return response;
}
async function getDeploymentWithCookieBasedOnEnvVar(
  req: NextRequest,
  defaultVariantID?: string
) {
  const response = NextResponse.next();
  const experimentId = process.env.EXPERIMENT_ID;

  if (!req.cookies.has("experimentID")) {
    const experiment_id = req.cookies.get("experimentID");
    if (
      req.cookies.has("experimentID") &&
      experiment_id.value === experimentId
    ) {
      return response;
    } else {
      const random = Math.random() * 100;
      const variantID = defaultVariantID ?? random < 50 ? "1" : "2";
      response.cookies.set("experimentID", experimentId);
      response.cookies.set("variantID", variantID);
      response.cookies.set("hostname", req.nextUrl.hostname);

      await saveVariantIDCount(variantID, experimentId);
    }
  }

  return response;
}
