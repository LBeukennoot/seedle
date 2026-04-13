import type { Mode, SessionData } from "../Modes"

export type SwitchButtonType = {
    options: SessionData[]
    selected: Mode
    onSelect: Function
}

export type SwitchButtonElementType = {
    options: any
    length: number
    selectedButton: number
    setSelectedButton: Function
    onSelect: Function
}

export type SwitchButtonElementButtonType = {
    name: string
}