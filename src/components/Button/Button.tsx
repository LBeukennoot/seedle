import type { ButtonProps } from './types';

/**
 * Clickable object that can hold text or an icon.
 *
 * @author      LBeukennoot for Seedle
 * @created     13-04-2026
 */
export const Button = ({ label, children, onClick, className, disabled, ...props }: ButtonProps) => {
  return (
    <button
      className={"w-auto bg-blue text-xl text-white rounded-full border-6 border-blue hover:bg-light-blue cursor-pointer transition-all duration-150 px-2 py-2 font-lexend " + className + " " + (disabled ? "grayscale-100 hover:!bg-blue" : "")}
      data-testid={"button"}
      disabled={disabled}
      onClick={onClick}
      aria-label={`${disabled ? 'disabled' : ''} ${label} button`}
      {...props}
    >
      {children}
    </button>

  );
};