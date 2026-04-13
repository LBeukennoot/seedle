import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { SettingsScreen } from './index';
import SettingsProvider from '../../../providers/SettingsProvider';
import DevProvider from '../../../providers/DevProvider';

const meta = {
    component: SettingsScreen,
    parameters: {
        // layout: 'centered',
        // backgrounds: {
        //     options: {
        //         light: {
        //             name: "Light", value: "#a6c48a"
        //         }
        //     }
        // }
    },
    // globals: {
    //     // 👇 Set the initial background color
    //     backgrounds: { value: 'light' },
    // },
    tags: ['autodocs'],
    // argTypes: {
    //   backgroundColor: { control: 'color' },
    // },
    args: {
        // onClick: fn(),
    },
    render: () => (
        <DevProvider>
            <SettingsProvider>
                <SettingsScreen />
            </SettingsProvider>
        </DevProvider>
    )
} satisfies Meta<typeof SettingsScreen>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: {} };