import type { Meta, StoryObj } from '@storybook/react-vite';
import { SettingsScreen } from './index';
import { DebugProvider } from '../../context/Debug';
import { SettingsProvider } from '../../context/Settings';

const meta = {
    component: SettingsScreen,
    parameters:{
        docs: {
            description: {
                component: "A `Screen` that allows user to customise their experience"
            }
        }
    },
    tags: ['autodocs'],
    render: () => (
        <DebugProvider>
            <SettingsProvider>
                <SettingsScreen />
            </SettingsProvider>
        </DebugProvider>
    )
} satisfies Meta<typeof SettingsScreen>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};