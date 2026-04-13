export type SliderProps = {
    min: number
    max: number
    safeZone: {
        min: number,
        max: number
    }
    invert: boolean
    value: number
    setValue: Function
    name: string
    disabled?: boolean
}