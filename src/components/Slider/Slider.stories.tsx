import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { Slider } from './index';
import { useArgs } from 'storybook/internal/preview-api';
import type { SliderProps } from './types';

const meta = {
    component: Slider,
    parameters: { layout: 'centered' },
    tags: ['autodocs'],
    argTypes: {
        min: {control: "number"},
        max: {control: "number"},
        invert: {control: "boolean"},
        value: {control: "number"},
        name: {control: "text"},
        //@ts-ignore
        safeZoneMin: {control: "number"},
        safeZoneMax: {control: "number"},
        // value: {control: {
        //     type:"number",
        //     min: 5,
        //     max: 120,
        //     step: 1
        // }},
        // safeZone: { control: 'object' },
    },
    args: {
        // onClick: fn(),
        min: 5,
        max: 120,
        // safeZone: { min: 25, max: 89 },
        //@ts-ignore
        safeZoneMin: 25,
        safeZoneMax: 89,
        invert: true,
        value: 25,
        setValue: fn(),
        name: 'default'
    },
    render: () => {
        const [storyArgs, updateArgs] = useArgs<SliderProps>();

        const handleValue = (value: number) => {
            updateArgs({ value });
            storyArgs.setValue?.(value); // optional, still logs action
        };

        return (
            <div className="w-100">
                <Slider
                    {...storyArgs} // ✅ includes min, max, safeZone, etc.
                    //@ts-ignore
                    safeZone={{min: storyArgs.safeZoneMin, max: storyArgs.safeZoneMax}}
                    setValue={handleValue} // ✅ override only this
                />
            </div>
        );
    },
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        min: 5,
        max: 120,
        safeZone: { min: 25, max: 89 },
        invert: true,
        value: 25,
        setValue: fn(),
        name: 'default'
    }
};