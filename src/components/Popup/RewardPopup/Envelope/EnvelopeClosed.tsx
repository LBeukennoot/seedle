import type { IconProps } from "../../../Icons";
import { Icon } from "../../../Icons/Icon";

export function EnvelopeClosed(props: IconProps) {
  return (
    <Icon viewBox="0 0 329 232" size={24} {...props}>
      <path
        d="M327.623 221.783V0.783203H0.623047V221.782C0.623047 227.305 5.1002 231.782 10.6231 231.782H317.623C323.146 231.782 327.623 227.305 327.623 221.783Z"
        fill="#F3BACF"
      />
      <path
        d="M0.623047 0.783203L137.009 109.391M327.623 0.783203L190.819 109.391M137.009 109.391L157.653 125.83C161.294 128.729 166.455 128.733 170.1 125.839L190.819 109.391M137.009 109.391L3.85006 228.887M190.819 109.391L324.449 228.943"
        stroke="#DB7CAD"
        strokeWidth="2"
      />
    </Icon>
  );
}
