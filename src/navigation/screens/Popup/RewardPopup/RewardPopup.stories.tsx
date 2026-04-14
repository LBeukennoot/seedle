import type { Meta, StoryObj } from "@storybook/react-vite";
import { RewardPopup } from "./RewardPopup";
import { Popup } from "../Popup";
import { fn } from "storybook/test";

const meta = {
    component: RewardPopup,
    parameters: {
        layout: "fullscreen"
    },
    decorators: [
        (Story) => (
            <Popup> <Story /> </Popup>
        )
    ],
    args: {
        title: "session complete!",
        claim: fn()
    }
} satisfies Meta<typeof RewardPopup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {}