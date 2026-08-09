import React, { useEffect, useRef } from "react";

// Pure helper functions placed outside the component to avoid recreating them on re-renders
function smoothstep(t) {
  return t * t * (3 - 2 * t);
}

function randomGrid(cols, rows) {
  const grid = [];
  for (let y = 0; y <= rows; y++) {
    grid[y] = [];
    for (let x = 0; x <= cols; x++) {
      grid[y][x] = Math.random();
    }
  }
  return grid;
}

function sample(grid, x, y, scale) {
  const gx = x / scale;
  const gy = y / scale;

  const ix = Math.floor(gx);
  const iy = Math.floor(gy);

  const fx = gx - ix;
  const fy = gy - iy;

  const sx = smoothstep(fx);
  const sy = smoothstep(fy);

  const v00 = grid[iy]?.[ix] ?? 0;
  const v10 = grid[iy]?.[ix + 1] ?? 0;
  const v01 = grid[iy + 1]?.[ix] ?? 0;
  const v11 = grid[iy + 1]?.[ix + 1] ?? 0;

  const top = v00 + (v10 - v00) * sx;
  const bottom = v01 + (v11 - v01) * sx;

  return top + (bottom - top) * sy;
}

export default function NoiseCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    function generateNoise() {
      const width = window.innerWidth;
      const height = window.innerHeight;

      canvas.width = width;
      canvas.height = height;

      const image = ctx.createImageData(width, height);
      const data = image.data;

      const scale = 2;
      const cols = Math.ceil(width / scale) + 2;
      const rows = Math.ceil(height / scale) + 2;

      const darkGrid = randomGrid(cols, rows);
      const lightGrid = randomGrid(cols, rows);

      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const darkNoise = sample(darkGrid, x, y, scale);
          const lightNoise = sample(lightGrid, x, y, scale);

          let value = null;

          if (darkNoise > 0.66) {
            value = 0;
          }

          if (lightNoise > 0.72) {
            value = 255;
          }

          const i = (y * width + x) * 4;

          if (value === null) {
            data[i + 3] = 0;
          } else {
            data[i] = value;
            data[i + 1] = value;
            data[i + 2] = value;
            data[i + 3] = 255;
          }
        }
      }

      ctx.putImageData(image, 0, 0);
    }

    // Initial draw
    generateNoise();

    // Attach resize listener
    window.addEventListener("resize", generateNoise);

    // Cleanup listener on unmount
    return () => {
      window.removeEventListener("resize", generateNoise);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute pointer-events-none mix-blend-soft-light opacity-25 z-1000" />;
}