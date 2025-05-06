// export enum Mode {
//     FOCUS = 'focus',
//     REST = 'rest',
//     LONG_REST = 'long_rest'
// }

export const Modes: sessionTimeType = {
    focus: {
        name: 'focus',
        time: 25,
        min: 19,
        max: 91
    },
    rest: {
        name: "rest",
        time: 5,
        min: -1,
        max: 20
    },
    long_rest: {
        name: "long rest",
        time: 15,
        min: 9,
        max: 61
    }
}

export type sessionTimeType = {
    [key: string]: {
        name: string,
        time: number,
        min: number,
        max: number
    }
} 

// export const ModeDurations: Record<Mode, number> = {
//     [Mode.FOCUS]: 25,
//     [Mode.REST]: 5,
//     [Mode.LONG_REST]: 120
// }