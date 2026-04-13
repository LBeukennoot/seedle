import type { IconProps } from "./type";

export function Icon({
  size = 16,
  className,
  children,
  ...props
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {children}
    </svg>
  );
}