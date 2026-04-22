import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { Toggle } from './index';
import { useArgs } from 'storybook/internal/preview-api';

const meta = {
    component: Toggle,
    parameters: { layout: 'centered' },
    tags: ['autodocs'],
    argTypes: {
        setValue: {
            table: {
                type: {
                    summary: "(value: boolean) => void"
                }
            }
        },
        disabled: {
            table: {
                defaultValue: {
                    summary: "false"
                }
            }
        }
    },
    args: {
        setValue: fn(),
        checked: false,
        disabled: false
    },
    render: (args) => {
        const [{ checked }, updateArgs] = useArgs();

        const handleChange = (checked: boolean) => {
            updateArgs({ checked }); // 🔥 update Storybook state
            args.setValue(checked);            // still log action
        };

        return (
            <Toggle
                {...args}
                checked={checked}
                setValue={handleChange}
            />
        );
    },
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: {} };
export const Disabled: Story = { args: { disabled: true } };