import { get } from "@vercel/edge-config";
import { NextRequest, NextResponse } from "next/server";
///(:locale)/path
// export const config = {
//   matcher: [
//     "/",
//     "/(:locale)",
//     "/(:locale)/editPlanPro",
//     "/(:locale)/editPlanStarter",
//     "/(:locale)/fullPlan",
//     "/(:locale)/fullPlanPro",
//     "/(:locale)/fullPlanStarter",
//     "/(:locale)/loggedInFullPlan",
//     "/(:locale)/loggedInFullPlanPro",
//     "/(:locale)/mainWizard",
//     "/(:locale)/login",
//     "/(:locale)/privacy-policy",
//     "/(:locale)/refundPolicy",
//     "/(:locale)/userHomepage",
//     "/(:locale)/form/business-info",
//     "/(:locale)/form/customer-group",
//     "/(:locale)/form/finance",
//     "/(:locale)/form/example-plan",
//     "/(:locale)/form/generate-result",
//     "/(:locale)/form/investment-items",
//     "/(:locale)/form/objective",
//     "/(:locale)/form/product-and-service",
//     "/(:locale)/form/register",
//     "/(:locale)/form/success-drivers",
//     // "/en/",
//     // "/en/editPlanPro",
//     // "/en/editPlanStarter",
//     // "/en/fullPlan",
//     // "/en/fullPlanPro",
//     // "/en/fullPlanStarter",
//     // "/en/loggedInFullPlan",
//     // "/en/loggedInFullPlanPro",
//     // "/en/mainWizard",
//     // "/en/login",
//     // "/en/privacy-policy",
//     // "/en/refundPolicy",
//     // "/en/userHomepage",
//     // "/en/form/business-info",
//     // "/en/form/customer-group",
//     // "/en/form/finance",
//     // "/en/form/example-plan",
//     // "/en/form/generate-result",
//     // "/en/form/investment-items",
//     // "/en/form/objective",
//     // "/en/form/product-and-service",
//     // "/en/form/register",
//     // "/en/form/success-drivers",
//   ],
// };

// Configuration stored in Edge Config.
interface CanaryConfig {
  deploymentExistingDomain: string;
  deploymentCanaryDomain: string;
  trafficCanaryPercent: number;
}

const PUBLIC_FILE = /\.(.*)$/;

export async function middleware(req: NextRequest) {
  // We don't want to run blue-green during development.
  const { pathname } = req.nextUrl;

  if (
    pathname.startsWith("/_next") || // exclude Next.js internals
    pathname.startsWith("/api") || //  exclude all API routes
    pathname.startsWith("/static") || // exclude static files
    pathname.startsWith("/favicon") ||
    PUBLIC_FILE.test(pathname) // exclude all files in the public folder
  ) {
    return NextResponse.next();
  }
  console.log("Middleware ==========", { pathname });

  if (process.env.NODE_ENV !== "production") {
    return NextResponse.next();
  }
  // Skip if the middleware has already run.
  if (req.headers.get("x-deployment-override")) {
    console.log("if =====> x-deployment-override");
    return getDeploymentWithCookieBasedOnEnvVar(req);
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
    console.warn("EDGE_CONFIG env variable not set. Skipping canary.");
    return NextResponse.next();
  }
  // Get the blue-green configuration from Edge Config.
  const canary = await get<CanaryConfig>("canary-configuration");
  if (!canary) {
    console.warn("No canary configuration found");
    return NextResponse.next();
  }
  const servingDeploymentDomain = req.nextUrl.hostname;
  console.log("servingDeploymentDomain", servingDeploymentDomain);
  const selectedDeploymentDomain = selectDeploymentDomain(canary);
  console.log("selectedDeploymentDomain", selectedDeploymentDomain);

  if (!selectedDeploymentDomain) {
    return NextResponse.next();
  }
  // The selected deployment domain is the same as the one serving the request.
  if (servingDeploymentDomain === selectedDeploymentDomain) {
    return getDeploymentWithCookieBasedOnEnvVar(req);
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

async function getDeploymentWithCookieBasedOnEnvVar(req: NextRequest) {
  const response = NextResponse.next();
  const experimentId = process.env.EXPERIMENT_ID || "NO_EXPERIMENT";
  if (!req.cookies.has("experiment_id")) {
    const experiment_id = req.cookies.get("experiment_id");
    if (
      req.cookies.has("experiment_id") &&
      experiment_id.value === experimentId
    ) {
      return response;
    } else {
      const random = Math.random() * 100;
      const variantID = random < 50 ? "1" : "2";
      response.cookies.set("experiment_id", experimentId);
      response.cookies.set("variant_id", variantID);
      await saveVariantIDCount(variantID, experimentId);
    }
  }

  return response;
}
