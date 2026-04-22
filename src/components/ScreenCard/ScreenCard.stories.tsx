import type { Meta, StoryObj } from "@storybook/react-vite";
import { ScreenCard } from "./ScreenCard";

const meta = {
    component: ScreenCard,
    parameters: {
        layout: "fullscreen",
        backgrounds: {
            options: {
                green: { name: "Green", value: "#a6c48a" }
            }
        },
        initialGlobals: {
            backgrounds: { value: 'green' },
        },
    },
    // decorators: [
    //     (Story) => (
    //         <ScreenCard> <Story /> </ScreenCard>
    //     )
    // ],
    args: {
        children: "children"
        // ignore: fn(),
        // cancel: fn(),
    }
} satisfies Meta<typeof ScreenCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {}