import SliderMUI, { SliderThumb, SliderTrack } from "@mui/material/Slider";
import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { sessionTimeType } from "../providers/SettingsProvider";

const SliderStyled = styled(SliderMUI)(() => ({
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

export default function Slider({ min, max, safeZone, invert, value, setValue }: SliderOptionsType) {
    // const marks = {
    //     min: 5,
    //     max: 120,
    //     minSafe: 19,
    //     maxSafe: 121,
    //     invert: true
    // }

    const maxValue = max - min
    const minSafe = Math.round(((safeZone.min - min) / maxValue) * 100)
    const maxSafe = Math.round(((max - safeZone.max) / maxValue) * 100)
    const safe = 100 - minSafe - maxSafe

    // const [value, setValue] = useState(50);
    // console.log(options)
    const [sliderSafe, setSliderSafe] = useState(true)

    const handleSliderChange = async (_: any, newValue: any) => {
        setValue(newValue);
    };

    useEffect(() => {
        if (invert) {
            setSliderSafe(value > safeZone.min && value < safeZone.max)
        } else {
            setSliderSafe((value >= 0 && value < safeZone.min) || (value > safeZone.max && value <= max))
        }
    }, [value])

    const RailComponent = ({ ...other }: any) => {
        return (
            <div {...other} className="w-full h-full rounded-full flex overflow-hidden">
                <div
                    className={"h-full " + (invert ? "bg-light-red" : "bg-light-blue")}
                    style={{ width: minSafe + "%" }}
                ></div>
                <div
                    className={"h-full " + (invert ? "bg-light-blue" : "bg-light-red")}
                    style={{ width: safe + "%" }}
                ></div>
                <div
                    className={"h-full " + (invert ? "bg-light-red" : "bg-light-blue")}
                    style={{ width: maxSafe + "%" }}
                ></div>
            </div>
        )
    }

    const ThumbComponent = ({ ...other }: any) => {
        return (
            <SliderThumb {...other} className={"!bg-white !h-[2rem] !w-[2rem] border-5 before:!shadow-none hover:!shadow-none transition-all " + (sliderSafe ? "border-light-green" : " !border-red")}>
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
                    slots={{ rail: RailComponent, thumb: ThumbComponent, track: TrackComponent }}
                    value={value}
                    onChange={handleSliderChange}
                    aria-label="slider-name"
                    min={min}
                    max={max}
                />
            </div>
        </div>
    );
}

type SliderOptionsType = {
    min: number
    max: number
    safeZone: {
        min: number,
        max: number
    }
    invert: boolean
    value: number
    setValue: Function
}