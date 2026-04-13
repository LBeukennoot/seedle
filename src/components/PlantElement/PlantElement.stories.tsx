import type { Meta, StoryObj } from "@storybook/react-vite";
import { PlantElement } from ".";
import { Plant } from "./types";

const meta = {
    component: PlantElement,
    parameters: {
        layout: "centered"
    },
    argTypes: {
        stage: {
            control: {
                type: "number",
                min: 1,
                max: 4,
                step: 1
            }
        },
        plant: {
            control: {
                type: "select",
                
            },
            options: Object.values(Plant)
        }
    }
} satisfies Meta<typeof PlantElement>;

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        stage: 1,
        // plant: undefined
        plant: Plant.CHIRARY
    }
}