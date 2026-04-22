import type { Mode, SessionData } from "../../features/session/sessionModes"

export type SwitchButtonProps = {
    options: string[]
    selected: Mode
    onSelect: (mode: SessionData) => void
}

export type SwitchButtonElementProps = {
    options: SessionDataMap
    length: number
    selectedButton: number
    setSelectedButton: Function
    onSelect: (mode: SessionData) => void
}

export type SwitchButtonElementButtonType = {
    name: string
}