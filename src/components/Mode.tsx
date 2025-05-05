export enum Mode {
    FOCUS = 'focus',
    REST = 'rest',
    LONG_REST = 'long rest'
}

export const ModeDurations: Record<Mode, number> = {
    [Mode.FOCUS]: 25,
    [Mode.REST]: 5,
    [Mode.LONG_REST]: 120
}