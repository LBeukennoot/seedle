import type { Meta, StoryObj } from '@storybook/react-vite';
import { Timer } from './Timer';
import { Modes } from '../../features/session/sessionModes';

const meta = {
  component: Timer,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],

  argTypes: {
    time: {
      description: "Turns a string like `25:00` into an evenly spaced element. Must have two double digits seperated by `:`."
    }
  },
  args: {
    time: "00:00"
    // onClick: fn(),
  },
} satisfies Meta<typeof Timer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Focus: Story = { args: { time: `${Modes['focus'].time}:00` } };
export const Rest: Story = { args: { time: `0${Modes['rest'].time}:00` } };
export const Long_Rest: Story = { args: { time: `${Modes['long_rest'].time}:00` } };