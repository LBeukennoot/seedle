import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { ChangelogScreen } from './index';

const meta = {
    component: ChangelogScreen,
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
} satisfies Meta<typeof ChangelogScreen>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: {} };