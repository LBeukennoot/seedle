import type { Meta, StoryObj } from '@storybook/react-vite';
import { SessionBar } from './SessionBar';
import { fn } from 'storybook/test';
import { Modes } from '../../features/session/sessionModes';


const meta = {
  component: SessionBar,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  // argTypes: {
  //   backgroundColor: { control: 'color' },
  // },
  argTypes: {
    sessionCount: {
      control: {
        type: "number",
        min: 1,
        max: 4
      },
      table: {
        defaultValue: {
          summary: "4"
        }
      }
    },
    currentSession: {
      control: {
        min: 0,
        // max: (sessionCount * 2) + 1
      }
    },
    setCurrentSession: {
      table: {
        type: {
          summary: "(session: number) => void"
        }
      }
    },
    sessionTime: {
      table: {
        type: {
          summary: "SessionDataMap"
        }
      }
    }
  },
  args: {
    currentSession: 0,
    setCurrentSession: fn(),
    sessionCount: 4,
    sessionTime: Modes
  },
  decorators: [
    (Story, context) => {
      const { sessionCount } = context.args;
      const max = (sessionCount * 2) - 1;

      context.argTypes.currentSession.control = {
        type: 'number',
        min: 0,
        max,
      };

      return <Story />;
    },
  ],
} satisfies Meta<typeof SessionBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: {} };