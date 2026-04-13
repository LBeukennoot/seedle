import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { SessionBar } from './SessionBar';
import SettingsProvider from '../../providers/SettingsProvider';
import DevProvider from '../../providers/DevProvider';
import SessionProvider from '../../providers/SessionProvider';
import NavigationProvider from '../../providers/NavigationProvider';
import ModeProvider from '../../providers/ModeProvider';

const meta = {
  component: SessionBar,
  parameters: { layout: 'centered' },
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
        <SettingsProvider>
          <ModeProvider>
            <SessionProvider>
              <SessionBar />
            </SessionProvider>
          </ModeProvider>
        </SettingsProvider>
      </NavigationProvider>
    </DevProvider>
  )
} satisfies Meta<typeof SessionBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: {} };
// export const Pause: Story = { args: { children: <PauseIcon className='fill-white' />, onClick: undefined, className: "" } };