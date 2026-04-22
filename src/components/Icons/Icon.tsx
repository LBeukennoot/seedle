import type { IconProps } from "./type";

/**
 * @author      LBeukennoot for Seedle
 * @created     13-04-2026
 * 
 * @param size number
 * @param className string | undefined
 * @param children string | JSX.Element | JSX.Element[];
 */
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