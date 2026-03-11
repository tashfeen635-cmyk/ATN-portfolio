"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";
import ErrorBoundary from "./ErrorBoundary";

const Starfield = dynamic(() => import("./Starfield"), { ssr: false });
const Globe = dynamic(() => import("./Globe"), {
  ssr: false,
  loading: () => <div id="globe-bg" />,
});

export default function BackgroundEffects() {
  return (
    <>
      <ErrorBoundary fallback={null}>
        <Suspense fallback={null}>
          <Starfield />
        </Suspense>
      </ErrorBoundary>

      <ErrorBoundary fallback={null}>
        <Suspense fallback={null}>
          <Globe />
        </Suspense>
      </ErrorBoundary>
    </>
  );
}
