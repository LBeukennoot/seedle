export type SliderProps = {
    min: number
    max: number
    safeZone: {
        min: number,
        max: number
    }
    invert: boolean
    value: number
    setValue: (value: number) => void
    name: string
    disabled?: boolean
}