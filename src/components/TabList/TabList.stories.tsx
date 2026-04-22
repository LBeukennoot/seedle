import type { Meta, StoryObj } from '@storybook/react-vite';
import { TabList } from './index';
import { DebugProvider } from '../../context/Debug';
import { NavigationProvider } from '../../context/Navigation';
import type { TabListProps } from './types';
import { DefaultScreen, ScreenRegistry } from '../../navigation/ScreenRegistry';
import { fn } from 'storybook/test';
import { useArgs } from 'storybook/internal/preview-api';
import { Screen } from '../../navigation/Screen';

const meta = {
    component: TabList,
    parameters: {
        layout: 'centered',
        backgrounds: {
            options: {
                light: {
                    name: "Light", value: "#a6c48a"
                }
            }
        }
    },
    globals: {
        // 👇 Set the initial background color
        backgrounds: { value: 'light' },
    },
    tags: ['autodocs'],

    argTypes: {
        currentScreen: {
            control: {
                type: "select",

            },
            options: Object.keys(ScreenRegistry),
            table: {
                type: {
                    summary: "Screen"
                },
                defaultValue: {
                    summary: Screen.TIMER
                }
            }
        },
        setCurrentScreen: {
            table: {
                type: {
                    summary: "(screen: Screen) => void"
                }
            }
        }
    },
    args: {
        // onClick: fn(),
        currentScreen: DefaultScreen,
        setCurrentScreen: fn()
    },
    render: (props: TabListProps) => {
        const [{ }, updateArgs] = useArgs();

        const handleChange = (screen: Screen) => {
            updateArgs({ currentScreen: screen });
            props.setCurrentScreen(screen);
        };

        return (
            <DebugProvider>
                <NavigationProvider>
                    <TabList {...props} setCurrentScreen={handleChange} />
                </NavigationProvider>
            </DebugProvider>
        );
    }
} satisfies Meta<typeof TabList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: {} };
// export const Pause: Story = { args: { children: <PauseIcon className='fill-white' />, onClick: undefined, className: "" } };
// export const Next: Story = { args: { children: <NextIcon className='fill-white' />, onClick: undefined, className: "" } };