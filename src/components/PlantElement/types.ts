export enum Plant {
    CHIRARY = 'CHIRARY'
}

export type PlantProps = {
    stage: number,
    plant: Plant
}

export type IndividualPlantProps = {
    stage: number;
    size: number;
}

export type Stage = {
    [key]: JSX.Element
}