import { Mode, type SessionDataMap } from "./sessionTypes"

export const DefaultMode: Mode = Mode.FOCUS
export const Modes: SessionDataMap = {
    [Mode.FOCUS]: {
        time: 25,
        min: 19,
        max: 91
    },
    [Mode.REST]: {
        time: 5,
        min: -1,
        max: 20
    },
    [Mode.LONG_REST]: {
        time: 15,
        min: 9,
        max: 61
    }
}



export function isSessionTimeType(obj: any): obj is SessionDataMap {
    if (!obj || typeof obj !== "object") return false

    return Object.values(obj).every((item: any) =>
        // typeof item?.id === "string" &&
        // typeof item?.name === "string" &&
        typeof item?.time === "number" &&
        typeof item?.min === "number" &&
        typeof item?.max === "number"
    )
}