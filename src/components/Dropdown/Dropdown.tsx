import type { DropdownOptions, DropdownProps } from './types';
import { ArrowDownIcon } from '../Icons';
import { MenuItem, Select } from '@mui/material';

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
  return (
    <Select
      className={"bg-white border-6 border-blue rounded-full! px-4 text-xl! text-blue! " + (!disabled && "hover:cursor-pointer!")}
      IconComponent={() => <ArrowDownIcon width="30" className="stroke-blue" />}
      sx={{
        boxShadow: 'none',
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
            backgroundColor: 'var(--color-blue)',
            color: 'white',
            borderRadius: '2rem'
          }
        }
      }}
      displayEmpty={false}
      value={selected}
      onChange={(e) => onSelect(e.target.value)}
      >
      {options.map((value: DropdownOptions) => {
        return <MenuItem value={value.id}>{value.label}</MenuItem>;
      })}
    </Select>
  );
};