import type { Meta, StoryObj } from '@storybook/react-vite';
import { INITIAL_VIEWPORTS } from 'storybook/viewport';
import { DebugProvider } from '../../context/Debug';
import { NavigationProvider } from '../../context/Navigation';
import { SettingsProvider } from '../../context/Settings';
import { ModeProvider } from '../../context/Mode';
import { SessionProvider } from '../../context/Session';
import { TimerProvider } from '../../context/Timer';
import { TimerScreen } from './TimerScreen';
import { UserDataProvider } from '../../context/UserData';

const meta = {
    component: TimerScreen,
    parameters: {
        viewport: {
            options: INITIAL_VIEWPORTS
        },
        docs: {
            description: {
                component: "A `Screen` that shows the actual timer. The user can switch `Mode`s and start a `session`."
            }
        }
    },
    tags: ['autodocs'],
    render: () => (
        <DebugProvider>
            <NavigationProvider>
                <SettingsProvider>
                    <ModeProvider>
                        <SessionProvider>
                            <UserDataProvider>
                                <TimerProvider>
                                    <TimerScreen />
                                </TimerProvider>
                            </UserDataProvider>
                        </SessionProvider>
                    </ModeProvider>
                </SettingsProvider>
            </NavigationProvider>
        </DebugProvider>
    )
} satisfies Meta<typeof TimerScreen>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: {} };