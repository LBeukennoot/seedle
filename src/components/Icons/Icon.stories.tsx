import type { Meta, StoryObj } from '@storybook/react-vite';
import { StartIcon, PauseIcon, ArrowDownIcon, NextIcon, SettingsIcon, TimerIcon, ChangelogIcon, GardenIcon } from './index'
import { Icon } from './Icon';



const meta = {
    title: "components/Icons",
    parameters: { layout: 'centered' },
    tags: ['autodocs'],
    args: {
        size: 25,
        className: "fill-blue",
    },
} satisfies Meta<typeof Icon>;

export default meta;

export const Start: StoryObj = { render: (args) => <StartIcon {...args} /> }
export const Pause: StoryObj = { render: (args) => <PauseIcon {...args} /> }
export const Next: StoryObj = { render: (args) => <NextIcon {...args} /> }
export const Settings: StoryObj = { render: (args) => <SettingsIcon {...args} /> }
export const Timer: StoryObj = { render: (args) => <TimerIcon {...args} /> }
export const Changelog: StoryObj = { render: (args) => <ChangelogIcon {...args} /> }
export const Garden: StoryObj = { render: (args) => <GardenIcon {...args} /> }
export const ArrowDown: StoryObj = { render: (args) => <ArrowDownIcon {...args} />, args: { className: 'fill-transparent stroke-blue' } }