export enum Mode {
    FOCUS = 'focus',
    REST = 'rest',
    LONG_REST = 'long_rest'
}

export const Modes: sessionTimeType = {
    focus: {
        id: Mode.FOCUS,
        name: 'focus',
        time: 25,
        min: 19,
        max: 91
    },
    rest: {
        id: Mode.REST,
        name: "rest",
        time: 5,
        min: -1,
        max: 20
    },
    long_rest: {
        id: Mode.LONG_REST,
        name: "long rest",
        time: 15,
        min: 9,
        max: 61
    }
}

export type sessionTimeType = {
    [key: string]: {
        id: Mode
        name: string
        time: number
        min: number
        max: number
    }
}

export default function isSessionTimeType(obj: any): boolean {

    if (!obj) return false

    let output = true
    Object.keys(obj).map((key: any) => {
        if (
            typeof obj[key].id === "string" &&
            typeof obj[key].name === "string" &&
            typeof obj[key].time === "number" &&
            typeof obj[key].min === "number" &&
            typeof obj[key].max === "number"
        ) return true

        return false
    }).map(bool => bool === false ? output = false : null )
    return output
}