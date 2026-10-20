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
            <feTurbulence /* TODO replace this turbulence with a pre-generated noise image */
              type="fractalNoise"
              baseFrequency="0.3" /* Lower frequency creates larger visible ripples */
              numOctaves="1"
              seed="1"
              result="noise"
              stitchTiles="noStitch"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="8" /* Increased so distortion is clearly visible */
              xChannelSelector="R"
              yChannelSelector="G"
            />

            {/* <feComposite in="SourceGraphic" in2="SourceGraphic" operator="in" clipPath="url(#filterClip)" /> */}
          </filter>
        </defs>
      </svg>
    )
}