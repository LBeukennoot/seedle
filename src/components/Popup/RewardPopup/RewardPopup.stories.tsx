import type { Meta, StoryObj } from "@storybook/react-vite";
import { RewardPopup } from "./RewardPopup";
import { Popup } from "../Popup";
import { fn } from "storybook/test";
import { Plants } from "../../PlantElement/types";

const meta = {
    component: RewardPopup,
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
    // tags: ['autodocs'],
    decorators: [
        (Story) => (
            <Popup> <Story /> </Popup>
        )
    ],
    argTypes: {
        reward: {
            description: "Displays `Plant` as `Icon` inside the `Popup`.",
            control: "select",
            options: Object.values(Plants),
            table: {
                type: {
                    summary: Object.values(Plants).join(' | ')
                }
            }
        },
        claim: {
            table: {
                type: {
                    summary: "() => void"
                }
            },
            description: "Gets triggered when the button is pressed."
        },
        title: {
            description: "Text at the top of the `Popup`."
        }
    },
    args: {
        title: "session complete!",
        claim: fn(),
        reward: Plants.CHIRARY
    }
} satisfies Meta<typeof RewardPopup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: {} }