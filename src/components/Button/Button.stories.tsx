import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn } from 'storybook/test';
import { Button } from './index';
import { NextIcon, PauseIcon, StartIcon } from '../Icons';

const meta = {
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: "Clickable object that can hold text or an `Icon`."
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    onClick: {
      description: "Triggered by clicking on the element. Not called when `disabled=true`.",
      table: {
        type: {
          summary: "() => void"
        }
      }
    },
    className: {
      description: "Classes based on TailwindCSS."
    },
    disabled: {
      type: 'boolean',
      description: "If `true`, shows the component in grayscale and disables interactions like `hover` and `onClick`.",
      table: {
        defaultValue: {
          summary: "false"
        }
      }
    },
    children: {
      control: 'select',
      options: ['StartIcon', 'NextIcon', 'PauseIcon'],
      mapping: {
        StartIcon: <StartIcon className='fill-white' />,
        NextIcon: <NextIcon className='fill-white' />,
        PauseIcon: <PauseIcon className='fill-white' />,
      },
      description: "The content of the button.",
      table: {
        type: {
          summary: "string | JSX.Element | JSX.Element[]"
        }
      }
    },
    label: {
      description: "Used for accessibility. The suffix is `_button`.",
    }
  },
  args: {
    onClick: fn(),
    className: "",
    disabled: false,
    label: "",
  },
  play: async ({ canvas, userEvent }) => {
    const button = canvas.getByRole('button')
    await userEvent.click(button);
    await expect(button).toBeEnabled();
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;


export const Icon: Story = {
  args: {
    children: <StartIcon className='fill-white' />,
    label: "start"
  }
};

export const Text: Story = {
  args: {
    children: "button",
    label: "button"
  },
  argTypes: {
    children: {
      control: 'text'
    }
  }
};

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