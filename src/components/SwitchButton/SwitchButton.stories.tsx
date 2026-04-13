import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn } from 'storybook/test';
import { SwitchButton } from './SwitchButton';
import { DefaultMode, Mode, Modes, type SessionData } from '../Modes';
import { useArgs } from 'storybook/internal/preview-api';

const options: SessionData[] = Object.keys(Modes).map((key: string) => Modes[key])

const meta = {
    component: SwitchButton,
    parameters: { layout: 'centered' },
    tags: ['autodocs'],
    // argTypes: {
    //   backgroundColor: { control: 'color' },
    // },
    argTypes: {
        options: {
            
        },
        selected: {
            control: { type: 'select' },
            options: Object.values(Mode),
            // defaultValue: DefaultMode,
            // summary: "",
            description: "A value based on clicking on the button.",
            table: { type: { summary: `${Mode.FOCUS} | ${Mode.REST} | ${Mode.LONG_REST}`}}
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
            updateArgs({ selected: mode.id }); // 🔥 update Storybook state
            args.onSelect(mode);            // still log action
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