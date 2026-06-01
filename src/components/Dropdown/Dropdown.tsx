import { useEffect, useState } from 'react';
import type { DropdownProps } from './types';
import { ArrowDownIcon } from '../Icons';
import type { Mode } from '../../features/session/sessionTypes';
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
//   const [collapsed, setCollapsed] = useState(false);

//   const id = cyrb53(options.map((o: string) => o).join()).toString();

  const selectedObject = options.find((o) => o === selected)!;

  const selectedIndex = options.indexOf(selectedObject);
  const unselectedObjects = options.toSpliced(selectedIndex, 1);
  const newOptions = [selectedObject].concat(unselectedObjects);

//   console.log(options)

//   const handleCloseDropdownOnOutsideClick = (e: any) => {
//     if (!disabled) {
//       e.target.id !== id && setCollapsed(false);
//     }
//   };

//   useEffect(() => {
//     document.addEventListener('click', handleCloseDropdownOnOutsideClick);

//     return () => document.removeEventListener('click', handleCloseDropdownOnOutsideClick);
//   }, []);

  //   const DropdownStyled = styled(Select)(() => ({
  //     color: 'var(--color-light-green)',
  //     height: "1.5rem",
  //     padding: 0,
  //     '& .MuiSlider-thumb': {
  //         height: '2rem',
  //         width: '2rem',
  //         backgroundColor: '#fff',
  //         border: '0.25rem solid currentColor',
  //         '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible, &::before': {
  //             boxShadow: 'none',
  //         },
  //     }
  // }));

  return (
    <Select //TODO padding-y override
      className="bg-white border-6 border-blue rounded-full! px-4 text-xl! text-blue! hover:cursor-pointer!"
      IconComponent={() => <ArrowDownIcon width="30" className="stroke-blue" />}
      sx={{
        boxShadow: 'none',
        '.MuiOutlinedInput-notchedOutline': {
          border: 'none'
        },
        '.MuiSelect-select': {
          paddingRight: '0px!important',
          paddingY: "0.25rem"
        }
      }}
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
      {options.map((value: string) => {
        const mode = value as Mode;
        const modeName = mode.replace('_', ' ');

        return <MenuItem value={value}>{modeName}</MenuItem>;
      })}
    </Select>
    // </div>
    // <div className={"w-full max-w-52 h-full relative text-xl text-center text-white rounded-4xl -mb-25 transition-all z-50 font-lexend"}>
    //     <div className={"bg-blue absolute -z-10 w-full rounded-4xl transition-all " + (collapsed ? "h-full" : "")}></div>
    //     {newOptions.map((value: string, index: number) => {
    //         const mode = value as Mode
    //         const modeName = mode.replace("_", " ")

    //         if (mode === selected) {
    //             return (
    //                 <button
    //                     aria-label={modeName}
    //                     disabled={disabled}
    //                     data-testid={"selected"}
    //                     key={index}
    //                     className={"max-h-full w-full flex justify-center items-center gap-2 py-2 border-6 border-blue rounded-full transition-all bg-white text-blue cursor-pointer hover:bg-light-blue " + (disabled ? "grayscale-100 hover:!bg-white" : "")}
    //                     onClick={() => setCollapsed(!collapsed)}
    //                     id={id}
    //                 >
    //                     {modeName}
    //                     <ArrowDownIcon className={"stroke-blue  inline-block " + (collapsed ? "rotate-180" : null)} id={id} />
    //                 </button>
    //             )
    //         } else {
    //             return (
    //                 <button
    //                     aria-label={modeName}
    //                     key={index}
    //                     data-testid={"not-selected"}
    //                     className={"max-h-full flex w-full justify-center items-center py-2 bg-blue border-6 border-blue rounded-full transition-all hover:bg-light-blue cursor-pointer " + (collapsed ? "opacity-100 delay-75 " : "opacity-0 -z-50 !cursor-default ")}
    //                     disabled={disabled}
    //                     onClick={() => {
    //                         setCollapsed(false)
    //                         if (collapsed) {
    //                             onSelect(mode)
    //                         }
    //                     }}
    //                 >
    //                     {modeName}
    //                 </button>
    //             )
    //         }
    //     })}

    // </div>
  );
};

// used to get a random string for key
// const cyrb53 = (str: string, seed = 3) => {
//   let h1 = 0xdeadbeef ^ seed,
//     h2 = 0x41c6ce57 ^ seed;
//   for (let i = 0, ch; i < str.length; i++) {
//     ch = str.charCodeAt(i);
//     h1 = Math.imul(h1 ^ ch, 2654435761);
//     h2 = Math.imul(h2 ^ ch, 1597334677);
//   }
//   h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507);
//   h1 ^= Math.imul(h2 ^ (h2 >>> 13), 3266489909);
//   h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507);
//   h2 ^= Math.imul(h1 ^ (h1 >>> 13), 3266489909);

//   return 4294967296 * (2097151 & h2) + (h1 >>> 0);
// };
