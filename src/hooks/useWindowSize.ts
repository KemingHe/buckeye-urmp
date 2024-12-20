// ./src/hooks/useWindowSize.ts
//
// Client (browser-only) hook to track the current window size,
// for dynamically rendering desktop/mobile components.

// Explicitly declare as a NextJS client-only hook/module.
"use client";

// NextJS essential imports.
import { useEffect, useState } from "react";

// biome-ignore format: added alignment for clarity.
export interface WindowSize {
  width : number | undefined;
  height: number | undefined;
}

export function useWindowSize(): WindowSize{

  // Declare state for window size (width and height),
  // init with current value if applicable.
  const [windowSize, setWindowSize] = useState<WindowSize>(
    (typeof window !== "undefined") 
      ? { width: window.innerWidth, height: window.innerHeight }
      : { width: undefined, height: undefined }
  );

  // Define the resize event handler.
  function handleResize(): void {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  // On window resize, update the window size state.
  useEffect(() => {
    // Add event listener for window resize.
    window.addEventListener("resize", handleResize);

    handleResize();

    // Cleanup event listener on unmount.
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
}
