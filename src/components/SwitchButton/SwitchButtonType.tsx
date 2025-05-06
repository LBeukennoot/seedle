export type SwitchButtonType = {
    buttons: any[]
    width?: number
    selected: string
    onChange: Function
}

export type SwitchButtonElementType = {
    buttons: any
    width: number
    length: number
    selectedButton: number
    setSelectedButton: Function
    onChange: Function
}

export type SwitchButtonElementButtonType = {
    name: string
}