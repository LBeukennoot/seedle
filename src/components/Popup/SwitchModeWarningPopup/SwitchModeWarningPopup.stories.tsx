import type { Meta, StoryObj } from "@storybook/react-vite";
import { Popup } from "../Popup";
import { SwitchModeWarningPopup } from "./SwitchModeWarningPopup";
import { fn } from "storybook/test";

const meta = {
    component: SwitchModeWarningPopup,
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
    decorators: [
        (Story) => (
            <Popup> <Story /> </Popup>
        )
    ],
    argTypes: {
        ignore: {
            table: {
                type: {
                    summary: "() => void"
                }
            }
        },
        cancel: {
            table: {
                type: {
                    summary: "() => void"
                }
            }
        },
    },
    args: {
        ignore: fn(),
        cancel: fn(),
    }
} satisfies Meta<typeof SwitchModeWarningPopup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {}