import type { DropdownOptions, DropdownProps } from './types';
import { ArrowDownIcon } from '../Icons';
import { MenuItem, Select } from '@mui/material';
import { useState } from 'react';

/**
 * @author      LBeukennoot for Seedle
 * @created     13-04-2026
 *
 * @param selected Mode
 * @param options SessionData[]
 * @param onSelect (mode: SessionData) => void
 * @param disabled boolean | undefined
 */
export const Dropdown = ({ selected, options, onSelect, disabled }: DropdownProps) => {
  const [open, setOpen] = useState(false)

  return (
    <Select
      className={"bg-[#F1E6CF] px-4 text-xl! font-semibold text-green! " + (!disabled && "hover:cursor-pointer!")}
      IconComponent={() => <ArrowDownIcon width="30" className="stroke-green" />}
      sx={{
        boxShadow: 'none',
        borderRadius: '0.7rem',
        height: '3rem',
        '.MuiOutlinedInput-notchedOutline': {
          border: 'none'
        },
        '.MuiSelect-select': {
          paddingRight: '0px!important',
          paddingY: "0.25rem"
        },
        '&.Mui-disabled': {
          filter: "grayscale(100)"
        }
      }}
      disabled={disabled}
      MenuProps={{
        sx: {
          '.MuiPaper-root': {
            backgroundColor: 'var(--color-linen)',
            color: 'var(--color-green)',
            borderRadius: '0rem'
          }
        }
      }}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      open={open}
      displayEmpty={false}
      value={selected}
      onClick={() => setOpen(!open)}
      onChange={(e) => onSelect(e.target.value)}
      >
      {options.map((value: DropdownOptions) => {
        return <MenuItem value={value.id}>{value.label}</MenuItem>;
      })}
    </Select>
  );
};