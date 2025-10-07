"use client";

import { useEffect } from "react";
import {
  getEnvironmentInfo,
  logEnvironmentInfo,
} from "@/shared/utils/environment";

export function EnvironmentBanner() {
  const envInfo = getEnvironmentInfo();

  useEffect(() => {
    logEnvironmentInfo();
  }, []);

  // 本番環境では表示しない
  if (envInfo.isProduction) {
    return null;
  }

  return (
    <div
      className={`px-4 py-2 text-sm font-medium text-center ${
        envInfo.isStaging
          ? "bg-yellow-100 text-yellow-800"
          : "bg-blue-100 text-blue-800"
      }`}
    >
      🔧 {envInfo.appEnv.toUpperCase()} Environment | API: {envInfo.apiUrl}
      {envInfo.debugMode && " | Debug Mode ON"}
    </div>
  );
}
