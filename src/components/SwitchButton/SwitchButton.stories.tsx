import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn } from 'storybook/test';
import { SwitchButton } from './SwitchButton';
import { useArgs } from 'storybook/internal/preview-api';
import { Mode, type SessionData } from '../../features/session/sessionTypes';
import { DefaultMode, Modes } from '../../features/session/sessionModes';

const options: string[] = Object.keys(Modes)

const meta = {
    component: SwitchButton,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: "Button that switches between `Modes`."
            }
        }
    },
    tags: ['autodocs'],
    // argTypes: {
    //   backgroundColor: { control: 'color' },
    // },
    argTypes: {
        options: {
            description: "An array of `Modes`.",
            table: {
                type: {
                    summary: "SessionData[]"
                }
            }
        },
        selected: {
            control: { type: 'select' },
            options: Object.values(Mode),
            // defaultValue: DefaultMode,
            // summary: "",
            description: "A value based on clicking on the button.",
            table: { type: { summary: `${Mode.FOCUS} | ${Mode.REST} | ${Mode.LONG_REST}` } }
        },
        onSelect: {
            table: {
                defaultValue: undefined,
                type: {
                    summary: "(mode: Mode) => void"
                }
            }
        }
    },
    args: {
        options,
        selected: DefaultMode,
        onSelect: fn()
    },
    render: (args) => {
        const [{ selected }, updateArgs] = useArgs();

        const handleChange = (mode: SessionData) => {
            updateArgs({ selected: mode });
            args.onSelect(mode);
        };

        return (
            <SwitchButton
                {...args}
                selected={selected}
                onSelect={handleChange}
            />
        );
    },
} satisfies Meta<typeof SwitchButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    play: async ({ canvas, userEvent }) => {

        const restElement = canvas.getByTestId('switchbuttonelement_' + Mode.REST + '_button')
        await userEvent.click(restElement)
        await expect(restElement).toHaveAttribute('aria-selected', 'true')

        const longrestElement = canvas.getByTestId('switchbuttonelement_' + Mode.LONG_REST + '_button')
        await userEvent.click(longrestElement)
        await expect(longrestElement).toHaveAttribute('aria-selected', 'true')

        const focusElement = canvas.getByTestId('switchbuttonelement_' + Mode.FOCUS + '_button')
        await userEvent.click(focusElement)
        await expect(focusElement).toHaveAttribute('aria-selected', 'true')

    },
    args: {
        options,
        selected: DefaultMode,
        onSelect: fn()
    }
};