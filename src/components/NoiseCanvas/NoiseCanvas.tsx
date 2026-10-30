// import React, { useEffect, useRef } from "react";
// import noiseImage from "./noise.jpg"; // Import your noise image

// export default function NoiseCanvas() {
//   const canvasRef = useRef(null);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;

//     const ctx = canvas.getContext("2d");
//     if (!ctx) return;

//     // Set canvas to full viewport size
//     function resizeCanvas() {
//       const width = window.innerWidth;
//       const height = window.innerHeight;
//       canvas.width = width;
//       canvas.height = height;
//     }

//     resizeCanvas();
//     window.addEventListener("resize", resizeCanvas);

//     // Create an Image object
//     const noise = new Image();
//     noise.src = noiseImage;

//     // Draw the noise image as a seamless, repeating pattern
//     function drawNoise() {
//       const width = canvas.width;
//       const height = canvas.height;

//       // Clear canvas
//       ctx.clearRect(0, 0, width, height);

//       // Create a pattern from the noise image
//       const pattern = ctx.createPattern(noise, "repeat");
//       if (!pattern) return;

//       // Draw the pattern to cover the entire canvas
//       ctx.fillStyle = pattern;
//       ctx.fillRect(0, 0, width, height);

//       // Optional: Adjust opacity or blending
//       ctx.globalAlpha = 0.25; // Match your original opacity
//       ctx.globalCompositeOperation = "soft-light";
//     }

//     // Wait for the image to load
//     noise.onload = () => {
//       drawNoise();
//     };

//     // Fallback if image fails to load
//     noise.onerror = () => {
//       console.error("Failed to load noise image");
//       // Optionally fall back to procedural noise here
//     };

//     // Cleanup
//     return () => {
//       window.removeEventListener("resize", resizeCanvas);
//       noise.onload = null;
//       noise.onerror = null;
//     };
//   }, []);

//   return (
//     <canvas
//       ref={canvasRef}
//       className="absolute w-screen h-screen pointer-events-none mix-blend-soft-light opacity-25 z-1000"
//     />
//   );
// }

import React, { useEffect, useRef, useState } from 'react';
import type { Settings } from '../../context/Settings/types';
import LocalStorage from '../../utils/LocalStorage';

const localStorage = new LocalStorage();

function smoothstep(t) {
  return t * t * (3 - 2 * t);
}

// Flat 1D Float32Array avoids array allocation overhead and cache misses
function randomGrid(cols, rows) {
  const size = cols * rows;
  const grid = new Float32Array(size);
  for (let i = 0; i < size; i++) {
    grid[i] = Math.random();
  }
  return grid;
}

export default function NoiseCanvas() {
  const canvasRef = useRef(null);

  const [enabled, setEnabled] = useState<boolean>((): boolean => {
    const stored = localStorage.getValue('settings') as Settings;
    return stored ? (stored.graphics.noiseFilter as boolean) : false;
  });

  useEffect(() => {
    window.addEventListener('changedNoiseFilter', handleEventListener);

    function handleEventListener({ detail }: any) {
      setEnabled(detail);
    }

    return function cleanupListener() {
      window.removeEventListener('changedNoiseFilter', handleEventListener);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let resizeTimer = null;

    function generateNoise() {
      const width = window.innerWidth;
      const height = window.innerHeight;

      canvas.width = width;
      canvas.height = height;

      const image = ctx.createImageData(width, height);
      // 32-bit view allows writing R, G, B, A in a single operation
      const buf32 = new Uint32Array(image.data.buffer);

      const scale = 2;
      const cols = Math.ceil(width / scale) + 2;
      const rows = Math.ceil(height / scale) + 2;

      const darkGrid = randomGrid(cols, rows);
      const lightGrid = randomGrid(cols, rows);

      // Precompute horizontal interpolation factors and column indices
      const xIndices = new Int32Array(width);
      const xWeights = new Float32Array(width);
      for (let x = 0; x < width; x++) {
        const gx = x / scale;
        const ix = Math.floor(gx);
        xIndices[x] = ix;
        xWeights[x] = smoothstep(gx - ix);
      }

      // Pre-packed 32-bit colors (Little-Endian: 0xAABBGGRR)
      const BLACK = 0xff000000;
      const WHITE = 0xffffffff;

      for (let y = 0; y < height; y++) {
        const gy = y / scale;
        const iy = Math.floor(gy);
        const sy = smoothstep(gy - iy);

        // Precompute row offsets in the flat 1D grid
        const row0 = iy * cols;
        const row1 = (iy + 1) * cols;
        const pixelRowOffset = y * width;

        for (let x = 0; x < width; x++) {
          const ix = xIndices[x];
          const sx = xWeights[x];

          const i00 = row0 + ix;
          const i10 = i00 + 1;
          const i01 = row1 + ix;
          const i11 = i01 + 1;

          // Sample dark grid
          const dTop = darkGrid[i00] + (darkGrid[i10] - darkGrid[i00]) * sx;
          const dBottom = darkGrid[i01] + (darkGrid[i11] - darkGrid[i01]) * sx;
          const darkNoise = dTop + (dBottom - dTop) * sy;

          // Sample light grid
          const lTop = lightGrid[i00] + (lightGrid[i10] - lightGrid[i00]) * sx;
          const lBottom = lightGrid[i01] + (lightGrid[i11] - lightGrid[i01]) * sx;
          const lightNoise = lTop + (lBottom - lTop) * sy;

          if (darkNoise > 0.66) {
            buf32[pixelRowOffset + x] = BLACK;
          } else if (lightNoise > 0.72) {
            buf32[pixelRowOffset + x] = WHITE;
          }
          // Default remains 0x00000000 (fully transparent)
        }
      }

      ctx.putImageData(image, 0, 0);
    }

    generateNoise();

    // Debounce the resize listener to avoid thrashing on window resize
    function handleResize() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(generateNoise, 100);
    }

    window.addEventListener('resize', handleResize);

    if (!enabled) return <></>;

    return () => {
      clearTimeout(resizeTimer);
      window.removeEventListener('resize', handleResize);
    };
  }, [enabled]);

  if(!enabled) return <></>

  return (
    <canvas
      ref={canvasRef}
      className="absolute w-screen h-screen pointer-events-none mix-blend-soft-light opacity-25 z-1000"
    />
  );
}
