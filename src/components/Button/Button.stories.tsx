import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn } from 'storybook/test';
import { Button } from './index';
import { NextIcon, PauseIcon, StartIcon } from '../Icons';

const meta = {
  component: Button,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    disabled: {
      type: 'boolean'
    },
    children: {
      control: 'select',
      options: ['StartIcon', 'NextIcon', 'PauseIcon'],
      mapping: {
        StartIcon: <StartIcon className='fill-white' />,
        NextIcon: <NextIcon className='fill-white' />,
        PauseIcon: <PauseIcon className='fill-white' />,
      }
    }
  },
  args: {
    onClick: fn(),
    className: "",
    disabled: false
  },
  play: async ({ canvas, userEvent }) => {
    const button = canvas.getByRole('button')
    await userEvent.click(button);
    await expect(button).toBeEnabled();
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Icon: Story = { args: { children: <StartIcon className='fill-white' />, label: "start" } };
export const Text: Story = { args: { children: "button", label: "button" } };
export const Disabled: Story = {
  args: {
    children: <NextIcon className='fill-white' />,
    disabled: true, 
    label: "next"
  },
  play: async ({ canvas, userEvent }) => {
    const button = canvas.getByRole('button')
    await userEvent.click(button);
    await expect(button).toBeDisabled();
  },
};