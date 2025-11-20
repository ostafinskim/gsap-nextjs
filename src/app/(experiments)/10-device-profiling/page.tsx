/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useBattery } from "@/hooks/use-battery";
import { DeviceType } from "@/types";
import { getGPUTier } from "detect-gpu";
import { useEffect, useState } from "react";
import { getSelectorsByUserAgent } from "react-device-detect";
import { StaticVersion } from "./logo-static";
import { ShaderEffect } from "./logo-webgl";

export default function Page() {
  const shouldUseShaders = useShouldRenderShader();
  return shouldUseShaders ? <ShaderEffect /> : <StaticVersion />;
}

function useShouldRenderShader() {
  const [deviceData, setDeviceData] = useState<DeviceType | null>(null);
  const [gpuTier, setGpuTier] = useState<number | null>(null);
  const battery = useBattery();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const data = getSelectorsByUserAgent(
      window.navigator.userAgent
    ) as DeviceType;
    setDeviceData(data);

    getGPUTier().then((gpu) => {
      setGpuTier(gpu.tier);
    });
  }, []);

  if (battery.isSupported && battery.fetched && battery.level < 0.2) {
    return false;
  }

  if (deviceData && deviceData.isSafari) {
    return false;
  }

  if (typeof gpuTier === "number" && gpuTier < 2) {
    return false;
  }

  return true;
}
