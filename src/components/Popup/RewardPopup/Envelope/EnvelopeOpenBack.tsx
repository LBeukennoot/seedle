import type { IconProps } from '../../../Icons';
import { Icon } from '../../../Icons/Icon';

export function EnvelopeOpenBack(props: IconProps) {
  return (
    <Icon viewBox="0 0 327 361" size={24} {...props}>
      <path
        d="M157.523 4.9438C161.168 2.04961 166.329 2.05345 169.97 4.95308L327 130.001H5.68233e-05L157.523 4.9438Z"
        fill="#F3BACF"
      />
      <path
        d="M317 361C322.523 361 327 356.523 327 351V130.001H5.68233e-05V351C5.68233e-05 356.523 4.47721 361 10.0001 361H317Z"
        fill="#F3BACF"
      />
      <path d="M0 130H327" stroke="#DB7CAD" strokeWidth="2" strokeLinejoin="round" />
    </Icon>
  );
}
