import { useEffect, useState } from 'react';
import type { Settings } from '../../context/Settings/types';
import LocalStorage from '../../utils/LocalStorage';

const localStorage = new LocalStorage();

export default function TurbulenceFilter() {
  const [enabled, setEnabled] = useState<boolean>((): boolean => {
    const stored = localStorage.getValue('settings') as Settings;
    return stored ? (stored.graphics.turbulenceFilter as boolean) : false;
  });

  useEffect(() => {
    window.addEventListener('changedTurbulenceFilter', handleEventListener);

    function handleEventListener({ detail }: any) {
      setEnabled(detail);
    }

    return function cleanupListener() {
      window.removeEventListener('changedTurbulenceFilter', handleEventListener);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!enabled) return <></>;

  return (
    <svg
      aria-hidden="true"
      style={{
        position: 'fixed',
        width: 0,
        height: 0,
        overflow: 'hidden',
        pointerEvents: 'none'
      }}>
      <defs>
        <filter
          id="edgeTexture"
          x="-5%"
          y="-5%"
          width="110%"
          height="110%"
          filterUnits="objectBoundingBox"
          primitiveUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.3"
            numOctaves="1"
            seed="1"
            result="noise"
            stitchTiles="stitch"
          />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="8" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
    </svg>
  );
}

// Named export so both `import TurbulenceFilter` and `import { TurbulenceFilter }` work
export { TurbulenceFilter };
