import './sliderStyle.css'
import SliderMUI, { SliderThumb, SliderTrack } from "@mui/material/Slider";
import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";

const SliderStyled = styled(SliderMUI)(() => ({
    color: 'var(--color-light-green)',
    height: "1.5rem",
    padding: 0,
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

export default function Slider({ min, max, safeZone, invert, value, setValue, name }: SliderOptionsType) {

    const maxValue = max - min
    const minSafe = Math.round(((safeZone.min - min) / maxValue) * 100)
    const maxSafe = Math.round(((max - safeZone.max) / maxValue) * 100)
    const safe = 100 - minSafe - maxSafe

    const [sliderSafe, setSliderSafe] = useState(true)
    const [tempValue, setTempValue] = useState(value)

    const handleSliderChange = (_: any, newValue: any) => {
        if (typeof newValue === "string" && newValue !== "") newValue = parseInt(newValue)
        if(checkValueAllowed(newValue)) setValue(newValue)
        setTempValue(newValue);
    };

    useEffect(() => {


        if (invert) {
            setSliderSafe(tempValue > safeZone.min && tempValue < safeZone.max)
        } else {
            setSliderSafe((tempValue >= 0 && tempValue < safeZone.min) || (tempValue > safeZone.max && tempValue <= max))
        }
    }, [tempValue])

    const checkValueAllowed = (value: number) => {
        return value >= 1 && value <= 999
    }

    const RailComponent = () => {
        return (
            <div className="w-full h-full rounded-full flex overflow-hidden">
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

    //TODO put thumb and track outside of slider() to prevent rerenders and maybe fix transition-all
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
            <input
                id={name}
                name={name}
                className={"w-11 overflow-hidden cursor-text text-lg rounded-lg px-1 transition-all border-2 border-transparent hover:border-light-blue focus:outline-blue " + (checkValueAllowed(tempValue) ? "text-blue border-light-blue" : "text-red !border-red")}
                type="number"
                min={min}
                max={max}
                value={tempValue}
                onChange={(e) => handleSliderChange(undefined, e.target.value)}
            />

            <div className='pl-5 pr-8 flex items-center relative w-full'>
                <SliderStyled
                    slots={{ rail: RailComponent, thumb: ThumbComponent, track: TrackComponent }}
                    value={tempValue}
                    onChange={handleSliderChange}
                    aria-label={name}
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
    name: string
}