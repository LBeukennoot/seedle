interface ModeProviderProps {
    children: string | JSX.Element | JSX.Element[]
}

export interface ModeContextType {
    mode: Mode
    setMode: Function
}