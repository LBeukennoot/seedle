import type { Meta, StoryObj } from "@storybook/react-vite";
import { PlantElement } from ".";
import { Plants } from "./types";

const meta = {
    component: PlantElement,
    parameters: {
        layout: "centered",
        backgrounds: {
            options: {
                green: { name: "Green", value: "#a6c48a" }
            }
        },
        initialGlobals: {
            backgrounds: { value: 'green' },
        },
        docs: {
            description: {
                component: "Element that shows plants."
            }
        }
    },


    tags: ['autodocs'],
    argTypes: {
        stage: {
            description: "The 'age' or growth of the plant.",
            control: {
                type: "number",
                min: 1,
                max: 4,
                step: 1
            },
            table: {
                defaultValue: {
                    summary: "1"
                }
            }
        },
        plant: {
            description: "Type of plant that is visible.",
            control: {
                type: "select",
            },
            table: {
                type: {
                    summary: Object.values(Plants).join(' | ')
                }
            },
            options: Object.values(Plants)
        },
        size: {
            description: "The width/height of the plant.",
            table: {
                defaultValue: {
                    summary: "200"
                }
            },
            control: {
                type: "number",
            },
        }
    }
} satisfies Meta<typeof PlantElement>;

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        stage: 4,
        plant: Plants.CHIRARY,
        size: 200
    }
}

export const Chamomile: Story = {
    args: {
        stage: 4,
        plant: Plants.CHAMOMILE
    }
}