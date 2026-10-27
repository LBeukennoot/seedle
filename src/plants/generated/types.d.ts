export type PlantDefinition = {
    displayName: string;
    stages: Record<string, string>
    stagesTree: Record<string, string[]>
}

export type Plant<out T extends PlantColorSlots = PlantColorSlots> = Record<string, PlantStage<T>>

export type PlantStage<T extends PlantColorSlots = PlantColorSlots> = {
    stage: string;
    asset: {
        viewBox: string;
        render: (colors: T) => JSX.Element;
    }
}

export type PlantColorSlots = Record<string, string>