import type { Meta, StoryObj } from '@storybook/react-vite';
import { ChangelogScreen } from './index';

const meta = {
    component: ChangelogScreen,
    parameters: {
        docs: {
            description: {
                component: "A `Screen` displays the changelog from `./changelog.md`. A button allows users to send feedback through the Github repository."
            }
        }
    },
    tags: ['autodocs'],
} satisfies Meta<typeof ChangelogScreen>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { };