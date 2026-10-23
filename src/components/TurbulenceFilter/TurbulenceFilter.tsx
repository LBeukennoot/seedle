import noiseImage from './noise.jpg';

export const TurbulenceFilter = () => {
  return (
    <svg
      aria-hidden="true"
      style={{
        position: 'absolute',
        width: 0,
        height: 0,
        overflow: 'hidden',
        pointerEvents: 'none'
      }}>
      <defs>
        <clipPath id="filterClip">
          <rect x="0" y="0" width="100%" height="100%" />
        </clipPath>

        <filter
          id="edgeTexture"
          x="-10%"
          y="-10%"
          width="120%"
          height="120%"
          clipPath="url(#clip)"
          colorInterpolationFilters="sRGB">
          <feImage
            href={noiseImage}
            width="100" /* Adjust this to control the size of the noise pattern */
            height="100"
            result="noiseImage"
          />

          <feOffset dx="0" dy="0" in="noiseImage" result="offsetNoise" />

          <feTile in="offsetNoise" x="0" y="0" width="100%" height="100%" result="tiledNoise" />

          <feDisplacementMap
            in="SourceGraphic"
            in2="tiledNoise"
            scale="4" /* Adjust this to control the intensity of the distortion */
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>

        {/* <filter
            id="edgeTexture"
            x="-10%"
            y="-10%"
            width="120%"
            height="120%"
            clipPath="url(#clip)"
            colorInterpolationFilters="sRGB"> 
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.3"
              numOctaves="1"
              seed="1"
              result="noise"
              stitchTiles="noStitch"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="8"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter> */}
      </defs>
    </svg>
  );
};
