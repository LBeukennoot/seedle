import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { Slider } from './index';
import { useArgs } from 'storybook/internal/preview-api';
import type { SliderProps } from './types';

const meta = {
    component: Slider,
    parameters: { 
        layout: 'centered',
        docs: {
            description: {
                component: "A styled slider with a number input on the side. Can be customised to have maximum and minimum values."
            }
        }
    },
    tags: ['autodocs'],
    argTypes: {
        min: {
            control: "number",
            description: "Minimum value of the slider",
            table: {
                defaultValue: {
                    summary: "5"
                }
            }
        },
        max: {
            control: "number",
            description: "Maximum value of the slider",
            table: {
                defaultValue: {
                    summary: "120"
                }
            }
        },
        invert: {
            control: "boolean",
            description: "Whether the `safeZone` colors should be inverted.",
            table: {
                defaultValue: {
                    summary: "true"
                }
            }
            
        },
        value: {
            control: "number",
            description: "The number that gets represented by the slider."
        },
        name: {
            control: "text",
            description: "An aria label for accessibility.",
            table: {
                defaultValue: {
                    summary: "slider"
                }
            }
        },
        //@ts-ignore
        safeZoneMin: {
            control: "number",
            description: "Start of the `safeZone`. If 25 is allowed, this value should be 24.",
        },
        safeZoneMax: {
            control: "number",
            description: "End of the `safeZone`. If 90 is allowed, this value should be 91.",
        },
        setValue: {
            table: {
                type: {
                    summary: "(value: number) => void"
                }
            }
        }
    },
    args: {
        min: 5,
        max: 120,
        //@ts-ignore
        safeZoneMin: 24,
        safeZoneMax: 91,
        invert: true,
        value: 25,
        setValue: fn(),
        name: 'slider'
    },
    render: () => {
        const [storyArgs, updateArgs] = useArgs<SliderProps>();

        const handleValue = (value: number) => {
            updateArgs({ value });
            storyArgs.setValue?.(value);
        };

        return (
            <div className="w-100">
                <Slider
                    {...storyArgs}
                    //@ts-ignore
                    safeZone={{min: storyArgs.safeZoneMin, max: storyArgs.safeZoneMax}}
                    setValue={handleValue}
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
        safeZone: { min: 24, max: 91 },
        invert: true,
        value: 25,
        setValue: fn(),
    }
};

export const Only_A_Max_Value: Story = {
    args: {
        min: 5,
        max: 120,
        // @ts-ignore
        safeZoneMin: 0,
        safeZoneMax: 60,
        safeZone: { min: 0, max: 60 },
        invert: true,
        value: 5,
        setValue: fn(),
    }
};

export const No_Invalid_Value: Story = {
    args: {
        min: 5,
        max: 120,
        // @ts-ignore
        safeZoneMin: 0,
        safeZoneMax: 120,
        safeZone: { min: 0, max: 120 },
        invert: true,
        value: 60,
        setValue: fn(),
    }
};