export type ButtonProps = {
  label: string;
  children: string | JSX.Element | JSX.Element[];
  onClick: () => void;
  className?: string;
  disabled?: boolean;
}