import { get } from "@vercel/edge-config";
import { NextRequest, NextResponse } from "next/server";
import { hostname } from "os";
///(:locale)/path
export const config = {
  matcher: [
    "/",
    "/editPlanPro",
    "/editPlanStarter",
    "/fullPlan",
    "/fullPlanPro",
    "/fullPlanStarter",
    "/loggedInFullPlan",
    "/loggedInFullPlanPro",
    "/mainWizard",
    "/login",
    "/privacy-policy",
    "/refundPolicy",
    "/userHomepage",
    "/form/business-info",
    "/form/customer-group",
    "/form/finance",
    "/form/example-plan",
    "/form/generate-result",
    "/form/investment-items",
    "/form/objective",
    "/form/product-and-service",
    "/form/register",
    "/form/success-drivers",
    // "/en/",
    // "/en/editPlanPro",
    // "/en/editPlanStarter",
    // "/en/fullPlan",
    // "/en/fullPlanPro",
    // "/en/fullPlanStarter",
    // "/en/loggedInFullPlan",
    // "/en/loggedInFullPlanPro",
    // "/en/mainWizard",
    // "/en/login",
    // "/en/privacy-policy",
    // "/en/refundPolicy",
    // "/en/userHomepage",
    // "/en/form/business-info",
    // "/en/form/customer-group",
    // "/en/form/finance",
    // "/en/form/example-plan",
    // "/en/form/generate-result",
    // "/en/form/investment-items",
    // "/en/form/objective",
    // "/en/form/product-and-service",
    // "/en/form/register",
    // "/en/form/success-drivers",
  ],
};

// Configuration stored in Edge Config.
interface CanaryConfig {
  deploymentExistingDomain: string;
  deploymentCanaryDomain: string;
  trafficCanaryPercent: number;
}

const PUBLIC_FILE = /\.(.*)$/;

const allowedOrigin = [
  "http://localhost:3000",
  "https://15minuteplan-ai.kanoonth.com",
  "https://canary-15minuteplan-ai.kanoonth.com",
];

export async function middleware(req: NextRequest) {
  // We don't want to run canary during development.
  const { pathname, hostname } = req.nextUrl;
  if (process.env.NODE_ENV !== "production") {
    return NextResponse.next();
  }

  if (
    pathname.startsWith("/_next") || // exclude Next.js internals
    pathname.startsWith("/static") || // exclude static files
    pathname.includes("/favicon") ||
    PUBLIC_FILE.test(pathname) // exclude all files in the public folder
  ) {
    return NextResponse.next();
  }
  console.log("Middleware ==========", {
    pathname,
    hostname,
    nextData: req.headers.get("X-Nextjs-Data"),
  });

  // If pathname is /api/..., set allowed origin.
  const origin = req.headers.get("origin") || "";

  const res = NextResponse.next();
  if (pathname.startsWith("/api/")) {
    if (allowedOrigin.includes(origin)) {
      res.headers.set("Access-Control-Allow-Origin", origin);
    }
    res.headers.set("Access-Control-Allow-Credentials", "true");
    res.headers.set(
      "Access-Control-Allow-Methods",
      "GET, DELETE, PATCH, POST, PUT, OPTIONS"
    );
    res.headers.set(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization, Api-Key"
    );
    // Handle preflight requests
    if (req.method === "OPTIONS") {
      return new NextResponse(null, { status: 204, headers: res.headers });
    }
    return res;
  }

  const experiment_id = req.cookies.get("experiment_id");
  const experimentId = process.env.EXPERIMENT_ID || "NO_EXPERIMENT";

  console.log("experiment_id: Coolie", experiment_id);

  if (experimentId === "NO_EXPERIMENT") {
    console.log("if =====> NO_EXPERIMENT");
    return clearCookies(experimentId);
  }

  if (
    req.cookies.has("experiment_id") &&
    experiment_id.value === experimentId &&
    req.cookies.has("hostname")
  ) {
    console.log("if cookies =====");
    const hostname = req.cookies.get("hostname");
    const headers = new Headers(req.headers);
    headers.set("x-deployment-override", hostname.value);
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
    console.log("if =====> x-deployment-override");
    return getDeploymentWithCookieBasedOnEnvVar(req);
  }
  // We skip canary when accesing from deployment urls
  if (req.nextUrl.hostname === process.env.VERCEL_URL) {
    console.log("hostname === VERCEL_URL ------------->><<<<<<", {
      hostname: req.nextUrl.hostname,
      vercelUrl: process.env.VERCEL_URL,
    });
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
  console.log("servingDeploymentDomain", servingDeploymentDomain);
  const selectedDeploymentDomain = selectDeploymentDomain(canary);
  console.log("selectedDeploymentDomain", selectedDeploymentDomain);

  if (!selectedDeploymentDomain) {
    return NextResponse.next();
  }
  // The selected deployment domain is the same as the one serving the request.
  if (servingDeploymentDomain === selectedDeploymentDomain) {
    console.log("servingDeploymentDomain === selectedDeploymentDomain");
    return getDeploymentWithCookieBasedOnEnvVar(req);
  }

  // default cookies
  if (
    selectedDeploymentDomain ===
    new URL(canary.deploymentExistingDomain || "").hostname
  ) {
    console.log("<<<<<<<< if default cookies >>>>>>>");
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
  console.log("url ==", url);
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

async function clearCookies(experimentId: string) {
  const response = NextResponse.next();
  response.cookies.set("experiment_id", experimentId);
  response.cookies.delete("variant_id");
  response.cookies.delete("hostname");
  return response;
}

function setDefaultCookies(hostname: string) {
  const response = NextResponse.next();
  response.cookies.set("experiment_id", "NO_EXPERIMENT");
  response.cookies.set("hostname", hostname);
  return response;
}
async function getDeploymentWithCookieBasedOnEnvVar(
  req: NextRequest,
  defaultVariantID?: string
) {
  console.log(
    "getDeploymentWithCookieBasedOnEnvVar: req ====>",
    req.nextUrl.hostname
  );
  const response = NextResponse.next();
  const experimentId = process.env.EXPERIMENT_ID;

  if (!req.cookies.has("experiment_id")) {
    const experiment_id = req.cookies.get("experiment_id");
    if (
      req.cookies.has("experiment_id") &&
      experiment_id.value === experimentId
    ) {
      return response;
    } else {
      const random = Math.random() * 100;
      const variantID = defaultVariantID ?? random < 50 ? "1" : "2";
      response.cookies.set("experiment_id", experimentId);
      response.cookies.set("variant_id", variantID);
      response.cookies.set("hostname", req.nextUrl.hostname);

      await saveVariantIDCount(variantID, experimentId);
    }
  }

  return response;
}
