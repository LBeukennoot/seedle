import type { Meta, StoryObj } from '@storybook/react-vite';
import { TabList } from './index';
import NavigationProvider from '../../providers/NavigationProvider';
import DevProvider from '../../providers/DevProvider';

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
    // argTypes: {
    //   backgroundColor: { control: 'color' },
    // },
    args: {
        // onClick: fn(),
    },
    render: () => (
        <DevProvider>
            <NavigationProvider>
                <TabList />
            </NavigationProvider>
        </DevProvider>
    )
} satisfies Meta<typeof TabList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: {} };
// export const Pause: Story = { args: { children: <PauseIcon className='fill-white' />, onClick: undefined, className: "" } };
// export const Next: Story = { args: { children: <NextIcon className='fill-white' />, onClick: undefined, className: "" } };