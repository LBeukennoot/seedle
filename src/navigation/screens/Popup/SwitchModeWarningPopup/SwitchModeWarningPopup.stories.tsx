import type { Meta, StoryObj } from "@storybook/react-vite";
import { Popup } from "../Popup";
import { SwitchModeWarningPopup } from "./SwitchModeWarningPopup";
import { fn } from "storybook/test";

const meta = {
    component: SwitchModeWarningPopup,
    parameters: {
        layout: "fullscreen"
    },
    decorators: [
        (Story) => (
            <Popup> <Story /> </Popup>
        )
    ],
    args: {
        ignore: fn(),
        cancel: fn(),
    }
} satisfies Meta<typeof SwitchModeWarningPopup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {}