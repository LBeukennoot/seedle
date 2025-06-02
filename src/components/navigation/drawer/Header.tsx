import React, {forwardRef} from 'react';

// import styles from './Drawer.module.css';

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

export const Header = forwardRef<HTMLDivElement, Props>(function Header(
  {children, ...props},
  ref
) {
  return (
    <div className={"relative flex shrink-0 box-border items-center justify-center bg-white cursor-grab"} {...props} ref={ref}>
      {children}
    </div>
  );
});