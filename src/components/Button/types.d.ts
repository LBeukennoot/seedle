export type ButtonProps = {
  label: string = button;
  children: string | JSX.Element | JSX.Element[];
  onClick: () => void;
  className?: string;
  disabled?: boolean;
}