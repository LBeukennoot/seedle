export const GridPaper = (props: any) => {
  const componentId = `GridPaper-${props.id}`;

  return (
    <div className={`drop-shadow-xl ${props.className}`}>
      <div
        style={{ mask: `url(#${componentId})` }}
        className={`w-full relative bg-center text-center py-3 bg-linen bg-[linear-gradient(to_right,#b1c6e0ff_2px,transparent_2px),linear-gradient(to_bottom,#b1c6e0ff_2px,transparent_2px)] bg-size-[34px_34px]`}>
        {props.children}
        <svg className="absolute w-full h-full top-0">
          <defs>
            <mask id={componentId}>
              <rect width="100%" height="100%" fill="white" />

              <path
                transform={`translate(-40,${props.offset}) scale(0.2)`}
                d="M266.208 786.702C268.69 796.468 267.471 806.234 262.551 816H0V0H234.623C234.405 1.99841 234.176 3.99683 233.935 5.99524C232.093 21.3032 234.572 36.6112 241.372 51.9191C248.173 67.2271 253.174 82.5351 256.377 97.843C259.58 113.151 259.567 128.459 256.339 143.767C253.11 159.075 255.829 174.383 264.495 189.691C273.162 204.999 269.323 220.307 252.978 235.615C236.633 250.923 233.908 266.231 244.801 281.539C255.695 296.847 259.335 312.155 255.721 327.463C252.107 342.771 250.952 358.079 252.256 373.387C253.56 388.695 249.445 404.003 239.911 419.311C230.376 434.619 225.425 449.927 225.058 465.235C224.691 480.543 230.952 495.851 243.841 511.159C256.73 526.467 260.199 541.775 254.248 557.083C248.296 572.391 243.895 587.699 241.045 603.007C238.194 618.314 238.154 633.622 240.927 648.93C243.7 664.238 242.81 679.546 238.26 694.854C233.709 710.162 236.257 725.47 245.902 740.778C255.548 756.086 262.316 771.394 266.208 786.702Z"
                fill="black"
              />

              <circle cx="90%" cy={`${5 + props.offset}`} r="17" fill="black" />
              <circle cx="90%" cy={`${65 + props.offset}`} r="17" fill="black" />
              <circle cx="90%" cy={`${125 + props.offset}`} r="17" fill="black" />
            </mask>
          </defs>
        </svg>
      </div>
    </div>
  );
};
