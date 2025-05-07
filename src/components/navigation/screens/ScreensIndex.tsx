import { JSX } from 'react'
import SettingsIcon from '../../SettingsIcon'
import TimerIcon from '../../TimerIcon'
import FocusScreen from './FocusScreen'
import SettingsScreen from './SettingsScreen'

export { default as Focus } from './FocusScreen'
export { default as Settings } from './SettingsScreen'

export enum Screen {
    FOCUS = 'focus',
    SETTINGS = 'settings'
}

export const DefaultScreen: Screen = Screen.FOCUS
export const Screens: ScreensType = {
    focus: {
        id: Screen.FOCUS,
        name: 'focus',
        screen: <FocusScreen />,
        icon: <TimerIcon />
    },
    settings: {
        id: Screen.SETTINGS,
        name: 'settings',
        screen: <SettingsScreen />,
        icon: <SettingsIcon />
    }
}

type ScreensType = {
    [key: string]: {
        id: Screen
        name: string
        screen: JSX.Element
        icon: JSX.Element
    }
}

