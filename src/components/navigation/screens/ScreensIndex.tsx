import { JSX } from 'react'
import SettingsIcon from '../icons/SettingsIcon'
import TimerIcon from '../icons/TimerIcon'
import TimerScreen from './TimerScreen'
import SettingsScreen from './SettingsScreen'
import ChangelogIcon from '../icons/ChangelogIcon'
import ChangelogScreen from './ChangelogScreen'
import { IconType } from '../icons/IconType'

export { default as Timer } from './TimerScreen'
export { default as Settings } from './SettingsScreen'

export enum Screen {
    TIMER = 'timer',
    SETTINGS = 'settings',
    CHANGELOG = 'changelog'
}

export const DefaultScreen: Screen = Screen.TIMER
export const Screens: ScreensType = {
    timer: {
        id: Screen.TIMER,
        name: 'timer',
        screen: <TimerScreen />,
        icon: TimerIcon
    },
    settings: {
        id: Screen.SETTINGS,
        name: 'settings',
        screen: <SettingsScreen />,
        icon: SettingsIcon
    },
    changelog: {
        id: Screen.CHANGELOG,
        name: 'changelog',
        screen: <ChangelogScreen></ChangelogScreen>,
        icon: ChangelogIcon
    }
}

export type ScreensType = {
    [key: string]: {
        id: Screen
        name: string
        screen: JSX.Element
        icon: ({className}: IconType) => JSX.Element
    }
}

