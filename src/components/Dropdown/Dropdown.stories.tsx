import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn } from 'storybook/test';
import { useArgs } from 'storybook/internal/preview-api';
import { Dropdown } from '.';
import { DefaultMode, Modes } from '../../features/session/sessionModes';
import { Mode, type SessionData } from '../../features/session/sessionTypes';

const options: string[] = Object.keys(Modes)

const meta = {
    component: Dropdown,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: "A component that replaces `SwitchButton` on smaller screens."
            }
        }
    },
    tags: ['autodocs'],
    argTypes: {
        options: {
            description: "A list that populates the dropdown.",
            table: {
                type: {
                    summary: "SessionData[]"
                }
            }
        },
        selected: {
            control: { type: 'select' },
            options: Object.values(Mode),
            description: "A value based on clicking the button.",
            table: {
                type: {
                    summary: Object.values(Modes).join(' | ')
                },
                defaultValue: {
                    summary: Mode.FOCUS
                }
            },
        },
        onSelect: {
            description: "Is called when one of the options is clicked.",
            table: {
                type: {
                    summary: "(mode: SessionData) => void"
                }
            }
        },
        disabled: {
            description: "If `true`, shows the component in grayscale and disables interactions like `hover` and `onSelect`.",
            type: "boolean",
            table: {
                defaultValue: {
                    summary: "false"
                }
            }
        }
    },
    args: {
        options,
        selected: DefaultMode,
        onSelect: fn(),
        disabled: false
    },
    render: (args) => {
        const [{ selected }, updateArgs] = useArgs();

        const handleChange = (mode: SessionData) => {
            updateArgs({ selected: mode });
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
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;


export const Default: Story = {};

export const Selected: Story = {args: {selected: Mode.LONG_REST}};

export const Disabled: Story = {
    args: {
        disabled: true
    },
    play: async ({ canvas }) => {
        const focusButton = canvas.getByRole('button', { name: "focus" })
        await expect(focusButton).toHaveAttribute('disabled');
    }
};