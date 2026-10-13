import type { IconProps } from '.';
import { Icon } from './Icon';

export function StatisticsIcon(props: IconProps) {
  return (
    <Icon viewBox="0 0 18 18" size={24} {...props}>
      <path
        d="M1 1V15.5C1 15.7652 1.10536 16.0196 1.29289 16.2071C1.48043 16.3946 1.73478 16.5 2 16.5H17M4 10.5L8 6.5L12 10.5L17 5.5M17 8.707V5.5H13.793"
        stroke="white"
        fill="transparent"
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Icon>
  );
}
