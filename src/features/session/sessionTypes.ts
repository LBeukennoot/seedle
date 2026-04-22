export enum Mode {
    FOCUS = 'focus',
    REST = 'rest',
    LONG_REST = 'long_rest'
}


export type SessionData = {
    time: number
    min: number
    max: number
}

export type SessionDataMap = Record<Mode, SessionData>