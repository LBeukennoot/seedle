import type { IconProps } from '.';
import { Icon } from './Icon';

export function CrossIcon(props: IconProps) {
  return (
    <Icon viewBox="0 0 15 15" size={24} {...props}>
      <path d="M1.5 13.2851L13.2851 1.5" stroke="#ffffff" stroke-width="3" stroke-linecap="round" />
      <path d="M1.5 1.61849L13.2851 13.4036" stroke="#ffffff" stroke-width="3" stroke-linecap="round" />
    </Icon>
  );
}
