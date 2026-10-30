import { Popover as StyledPopover } from '@mui/material';

export const Popover = (props) => {
  return (
    <StyledPopover
      {...props}
      sx={{
        '.MuiPopover-paper': {
          backgroundColor: 'var(--color-linen01)',
          color: 'var(--color-green03)',
          paddingY: '5px',
          paddingX: '15px',
          borderRadius: '100px',
          '--Paper-shadow': 'var(--shadow-3xl)!important'
        }
      }}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left'
      }}>
      {props.children}
    </StyledPopover>
  );
};
