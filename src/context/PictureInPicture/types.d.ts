export type PictureInPictureProviderProps = {
    children: string | JSX.Element | JSX.Element[]
}

export type PictureInPictureContextType = {
    isPip: boolean,
    pipWindow: Window | null,
    togglePip: () => Promise<void>,
    closePip: () => void,
}