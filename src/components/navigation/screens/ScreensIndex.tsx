import { JSX } from 'react'
import SettingsIcon from '../icons/SettingsIcon'
import TimerIcon from '../icons/TimerIcon'
import FocusScreen from './FocusScreen'
import SettingsScreen from './SettingsScreen'
import ChangelogIcon from '../icons/ChangelogIcon'
import ChangelogScreen from './ChangelogScreen'

export { default as Focus } from './FocusScreen'
export { default as Settings } from './SettingsScreen'

export enum Screen {
    FOCUS = 'focus',
    SETTINGS = 'settings',
    CHANGELOG = 'changelog'
}

export const DefaultScreen: Screen = Screen.CHANGELOG
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
    },
    changelog: {
        id: Screen.CHANGELOG,
        name: 'changelog',
        screen: <ChangelogScreen></ChangelogScreen>,
        icon: <ChangelogIcon />
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

