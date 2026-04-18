import type { JSX } from "react";

export enum Plants {
    CHIRARY = 'CHIRARY',
    CHAMOMILE = 'CHAMOMILE',
}

export type Plant = {
    id: string;
    gardenId: string;
    x: number;   // 0–1
    y: number;   // 0–1
    size: number; // 0–1F
    name: Plants
    stage: number
    maxStage: number
    createdAt: number
    grownAt?: number | null
    maxAge: number //in days
    mirrored: boolean

    // constructor({ id, gardenId, x, y, size, name }: Plant) {
    //     this.id = id
    //     this.gardenId = gardenId
    //     this.x = x
    //     this.y = y
    //     this.size = size
    //     this.name = name
    //     this.stage = 1
    // }

    // grow() {
    //     if (this.stage < 4) {
    //         this.stage += 1
    //     }
    // }
}

export type PlantProps = {
    stage: number,
    plant: Plants,
    size: number,
}

export type IndividualPlantProps = {
    stage: number;
    size: number;
}

export type Stage = {
    [key: number]: JSX.Element
}