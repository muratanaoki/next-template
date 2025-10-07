import { env } from "@/env";

export function getEnvironmentInfo() {
  return {
    appEnv: env.APP_ENV,
    nodeEnv: env.NODE_ENV,
    apiUrl: env.API_URL,
    debugMode: env.DEBUG_MODE,
    analyticsId: env.ANALYTICS_ID,
    isDevelopment: env.APP_ENV === "development",
    isStaging: env.APP_ENV === "staging",
    isProduction: env.APP_ENV === "production",
  };
}

export function isClientSide() {
  return typeof window !== "undefined";
}

export function logEnvironmentInfo() {
  if (env.DEBUG_MODE && isClientSide()) {
    console.group("🔧 Environment Info");
    console.log("App Environment:", env.APP_ENV);
    console.log("Node Environment:", env.NODE_ENV);
    console.log("API URL:", env.API_URL);
    console.log("Debug Mode:", env.DEBUG_MODE);
    console.log("Analytics ID:", env.ANALYTICS_ID || "Not set");
    console.groupEnd();
  }
}
