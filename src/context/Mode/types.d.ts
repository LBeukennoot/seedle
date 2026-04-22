interface ModeProviderProps {
    children: string | JSX.Element | JSX.Element[]
}

export type ModeContextType = {
    mode: Mode
    setMode: Function
}