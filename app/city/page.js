"use client";

import React, { Suspense } from "react";
import CityDetail from "./CityDetail";

export default function CityPage() {
  return (
    <Suspense fallback={<p>加载中...</p>}>
      <CityDetail />
    </Suspense>
  );
}
