import type { Meta, StoryObj } from "@storybook/react-vite";
import { Popup } from "./Popup";

const meta = {
    component: Popup,
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
    //         <Popup> <Story /> </Popup>
    //     )
    // ],
    args: {
        children: "children"
        // ignore: fn(),
        // cancel: fn(),
    }
} satisfies Meta<typeof Popup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {}