import type { IconProps } from '.';
import { Icon } from './Icon';

export function EnvelopeClosedIcon(props: IconProps) {
  return (
    <Icon viewBox="0 0 44 31" size={24} {...props}>
      <path
        d="M43.8832 21V0H0V21C0 26.5228 4.47714 31 9.99999 31H33.8832C39.4061 31 43.8832 26.5228 43.8832 21Z"
        strokeWidth="0"
      />
      <mask
        id="mask0_2317_427"
        style={{ maskType: 'alpha' }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="44"
        height="31">
        <path
          d="M43.8832 21V0H0V21C0 26.5228 4.47714 31 9.99999 31H33.8832C39.4061 31 43.8832 26.5228 43.8832 21Z"
          
        />
      </mask>
      <g mask="url(#mask0_2317_427)">
        <path
          d="M0 0L18.303 14.5751M43.8832 0L25.5242 14.5751M18.303 14.5751L0.433063 30.6114M18.303 14.5751C20.4135 16.2557 23.4112 16.2525 25.5242 14.5751M25.5242 14.5751L43.4573 30.6189"
          
          strokeWidth="2"
        />
      </g>
    </Icon>
  );
}
