// import { styled } from '@mui/material';
// import './Slider.css'
// import SliderMUI from '@mui/material/Slider';
// import { useState } from 'react';

// export default function Slider({ }: any) {
//     const [value, setValue] = useState(20)

//     const handleChange = (event: Event, newValue: number | number[], activeThumb: number) => {
//         if (typeof (newValue) === "number") {
//             setValue(newValue);
//         }
//     };

//     const marks = {
//         min: 5,
//         max: 120,
//         minSafe: 30,
//         maxSafe: 90
//     }

//     const minSafe = Math.round((marks.minSafe / marks.max) * 100) - 4
//     // const maxSafe = Math.round((marks.maxSafe / marks.max) * 100) - 4
//     const maxSafe = Math.round(((marks.max - marks.maxSafe) / marks.max) * 100)
//     // console.log(minSafe, maxSafe)


//     const SafeZones = () => {

//         if (marks.minSafe > marks.maxSafe) {
//             //one zone at the center of the slider
//             return (
//                 <>
//                     <div
//                         className={"bg-light-red absolute ml-4 h-[48%] rounded-full"}
//                         style={{
//                             width: maxSafe + "%",
//                             left: minSafe + "%"
//                         }}
//                     ></div>
//                 </>
//             )
//         } else {
//             //two zones on the left and right of the slider
//             return (
//                 <>
//                     <div
//                         className={"bg-light-red absolute left-0 ml-4 h-[48%] rounded-l-full"}
//                         style={{ width: (minSafe < 4 ? 0 : minSafe) + "%" }}
//                     ></div>
//                     <div
//                         className={"bg-light-red absolute right-0 mr-4 h-[48%] rounded-r-full"}
//                         style={{ width: (maxSafe < 4 ? 0 : maxSafe) + "%" }}
//                     ></div>
//                 </>
//             )
//         }


//     }

//     const SliderStyled = styled(SliderMUI)(({ theme }) => ({
//         color: 'var(--color-light-green)',
//         '& .MuiSlider-thumb': {
//             height: '2rem',
//             width: '2rem',
//             backgroundColor: '#fff',
//             border: '0.25rem solid currentColor',
//             '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible, &::before': {
//                 boxShadow: 'none',
//                 // Reset on touch devices, it doesn't add specificity
//                 '@media (hover: none)': {
//                     boxShadow: 'none',
//                 },
//             },
//         },
//         '& .MuiSlider-track': {
//             height: '1.5rem',
//         },
//         '& .MuiSlider-rail': {
//             color: 'var(--color-light-blue)',
//             opacity: 1,
//             height: '1.5rem',
//             ...theme.applyStyles('dark', {
//                 color: '#bfbfbf',
//                 opacity: undefined,
//             }),
//         },
//     }));

//     return (
//         <div className='flex items-center w-full'>
//             <div className='w-6'>{value}</div>

//             <div className='px-4 flex items-center relative w-full'>
//                 <SliderStyled
//                     valueLabelDisplay="auto"
//                     aria-label="pretto slider"
//                     value={value}
//                     onChange={handleChange}

//                 // aria-label="Volume"
//                 // value={value}
//                 // onChange={handleChange}
//                 // min={marks.min}
//                 // max={marks.max}
//                 // step={5}
//                 />
//                 {/* <SliderStyled /> */}
//                 {/* <div className='flex items-center'>
//                     <SafeZones />
//                 </div> */}
//             </div>
//         </div>
//     )
// }

// import "./styles.css";
import Slider, { SliderThumb, SliderTrack } from "@mui/material/Slider";
import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";

const SliderStyled = styled(Slider)(({ theme }) => ({
    color: 'var(--color-light-green)',
    height: "1.5rem",
    '& .MuiSlider-thumb': {
        height: '2rem',
        width: '2rem',
        backgroundColor: '#fff',
        border: '0.25rem solid currentColor',
        '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible, &::before': {
            boxShadow: 'none',
        },
    }
}));

export default function Sliderr() {
    const marks = {
        min: 5,
        max: 120,
        minSafe: 19,
        maxSafe: 121,
        invert: true
    }

    const max = marks.max - marks.min
    const minSafe = Math.round(((marks.minSafe - marks.min) / max) * 100)
    const maxSafe = Math.round(((marks.max - marks.maxSafe) / max) * 100)
    const safe = 100 - minSafe - maxSafe
    console.log(minSafe, maxSafe, safe)

    const [value, setValue] = useState(50);
    const [sliderSafe, setSliderSafe] = useState(true)

    const handleSliderChange = async (_: any, newValue: any) => {
        setValue(newValue);
    };

    useEffect(() => {
        if (marks.invert) {
            setSliderSafe(value > marks.minSafe && value < marks.maxSafe)
        } else {
            setSliderSafe((value >= 0 && value < marks.minSafe) || (value > marks.maxSafe && value <= marks.max))
        }
    }, [value])

    const RailComponent = ({ ...other }: any) => {
        return (
            <div {...other} className="w-full h-full rounded-full flex overflow-hidden">
                <div
                    className={"h-full " + (marks.invert ? "bg-light-red" : "bg-light-blue")}
                    style={{ width: minSafe + "%" }}
                ></div>
                <div
                    className={"h-full " + (marks.invert ? "bg-light-blue" : "bg-light-red")}
                    style={{ width: safe + "%" }}
                ></div>
                <div
                    className={"h-full " + (marks.invert ? "bg-light-red" : "bg-light-blue")}
                    style={{ width: maxSafe + "%" }}
                ></div>
            </div>
        )
    }

    const ThumbComponent = ({ ...other }: any) => {
        return (
            <SliderThumb { ...other } className={"!bg-white !h-[2rem] !w-[2rem] border-5 before:!shadow-none hover:!shadow-none transition-all " + (sliderSafe ? "border-light-green" : " !border-red")}>
            </SliderThumb>
        )
    }

    const TrackComponent = ({ ...other }: any) => {
        return (
            <SliderTrack {...other} className={"h-full w-full " + (sliderSafe ? "" : "!bg-red !border-red")}>
            </SliderTrack>
        )
    }

    return (
        <div className='flex items-center w-full'>
            <div className='w-8 text-blue text-lg overflow-hidden'>{value}</div>

            <div className='px-4 flex items-center relative w-full'>
                <SliderStyled
                    slots={{ rail: RailComponent, thumb: ThumbComponent, track: TrackComponent  }}
                    value={value}
                    onChange={handleSliderChange}
                    aria-label="slider-name"
                    min={marks.min}
                    max={marks.max}
                    step={5}
                />
            </div>
        </div>
    );
}