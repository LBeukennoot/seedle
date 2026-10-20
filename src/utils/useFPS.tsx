import { useState, useEffect } from "react";

export const useFPS = (sampleSize = 10) => {
  const [fps, setFPS] = useState(0);

  useEffect(() => {
    const fpsSamples: number[] = [];
    let lastFrameTime = performance.now();
    // let frameCount = 0;

    const measureFPS = (currentTime: number) => {
      // Calculate FPS for the last frame
      const deltaTime = currentTime - lastFrameTime;
      const currentFPS = deltaTime > 0 ? 1000 / deltaTime : 0;
      fpsSamples.push(currentFPS);

      // Keep only the last `sampleSize` samples
      if (fpsSamples.length > sampleSize) {
        fpsSamples.shift();
      }

      // Calculate average FPS
      const avgFPS = fpsSamples.reduce((sum, val) => sum + val, 0) / fpsSamples.length;
      setFPS(Math.round(avgFPS));

      // Update last frame time
      lastFrameTime = currentTime;
    //   frameCount++;

      // Continue the loop
      requestAnimationFrame(measureFPS);
    };

    // Start measuring
    const animationFrameId = requestAnimationFrame(measureFPS);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [sampleSize]);

  return fps;
};
