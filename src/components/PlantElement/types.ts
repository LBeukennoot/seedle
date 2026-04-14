import type { JSX } from "react";

export enum Plants {
    CHIRARY = 'CHIRARY'
}

export class Plant {
    name: Plants
    stage: number

    constructor({ name }: any) {
        this.name = name
        this.stage = 1
    }

    grow() {
        if(this.stage < 4) {
            this.stage += 1
        }
    }
}

export type PlantProps = {
    stage: number,
    plant: Plants
}

export type IndividualPlantProps = {
    stage: number;
    size: number;
}

export type Stage = {
    [key: number]: JSX.Element
}