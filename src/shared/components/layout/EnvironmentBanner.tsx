"use client";

import clsx from "clsx";
import { useEffect } from "react";
import {
  getEnvironmentInfo,
  logEnvironmentInfo,
} from "@/shared/utils/environment";
import styles from "./EnvironmentBanner.module.css";

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
      className={clsx(
        styles.banner,
        envInfo.isStaging ? styles.bannerStaging : styles.bannerDev
      )}
    >
      🔧 {envInfo.appEnv.toUpperCase()} Environment | API: {envInfo.apiUrl}
      {envInfo.debugMode && " | Debug Mode ON"}
    </div>
  );
}
