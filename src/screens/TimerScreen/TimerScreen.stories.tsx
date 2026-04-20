import type { Meta, StoryObj } from '@storybook/react-vite';
import { TimerScreen } from './index';
import DevProvider from '../../../providers/DevProvider';
import NavigationProvider from '../../../providers/NavigationProvider';
import SettingsProvider from '../../../providers/SettingsProvider';
import ModeProvider from '../../../providers/ModeProvider';
import SessionProvider from '../../../providers/SessionProvider';
import TimerProvider from '../../../providers/TimerProvider';
import { INITIAL_VIEWPORTS } from 'storybook/viewport';

const meta = {
    component: TimerScreen,
    parameters: {
        viewport: {
            options: INITIAL_VIEWPORTS
        }
    },
    tags: ['autodocs'],
    render: () => (
        <DevProvider>
            <NavigationProvider>
                <SettingsProvider>
                    <ModeProvider>
                        <SessionProvider>
                            <TimerProvider>
                                <TimerScreen />
                            </TimerProvider>
                        </SessionProvider>
                    </ModeProvider>
                </SettingsProvider>
            </NavigationProvider>
        </DevProvider>
    )
} satisfies Meta<typeof TimerScreen>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: {} };