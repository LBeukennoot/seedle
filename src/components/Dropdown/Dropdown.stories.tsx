import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn } from 'storybook/test';
import { DefaultMode, Mode, Modes, type SessionData } from '../Modes';
import { useArgs } from 'storybook/internal/preview-api';
import { Dropdown } from '.';

const options: SessionData[] = Object.keys(Modes).map((key: string) => Modes[key])

const meta = {
    component: Dropdown,
    parameters: { layout: 'centered' },
    tags: ['autodocs'],
    argTypes: {
        selected: {
            control: { type: 'select' },
            options: Object.values(Mode),
            // defaultValue: DefaultMode,
            // summary: "",
            description: "A value based on clicking on the button. Either `" + Mode.FOCUS + "`, `" + Mode.REST + "` or `" + Mode.LONG_REST + "`."
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
            updateArgs({ selected: mode.id });
            args.onSelect(mode);
        };

        return (
            <div style={{ height: '250px' }}>
                <div className='max-h-45 w-50'>
                    <Dropdown
                        {...args}
                        selected={selected}
                        onSelect={handleChange}
                    />
                </div>
            </div>
        );
    },
    // play: async ({ canvas, userEvent }) => {
    //     const focusButton = canvas.getByRole('button', { name: "focus" })
    //     const restButton = canvas.getByRole('button', { name: "rest" })

    //     await userEvent.click(focusButton)
    //     .then(() => userEvent.click(restButton))
    //     .then(() => expect(restButton).toHaveAttribute('data-testid', "selected"))
    //     .then(() => expect(focusButton).toHaveAttribute('data-testid', "not-selected"))
    // }
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Disabled: Story = {
    args: {
        disabled: true
    },
    play: async ({ canvas }) => {
        const focusButton = canvas.getByRole('button', { name: "focus" })
        await expect(focusButton).toHaveAttribute('disabled');
    }
};