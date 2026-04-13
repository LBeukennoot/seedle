import { type ComponentType, type JSX } from 'react'
import { SettingsScreen } from './SettingsScreen'
import { ChangelogScreen } from './ChangelogScreen'
import { TimerScreen } from './TimerScreen'
import { ChangelogIcon, SettingsIcon, TimerIcon } from '../../components/Icons'
import type { IconProps } from '../../components/Icons/type'


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
        screen: TimerScreen,
        icon: TimerIcon
    },
    settings: {
        id: Screen.SETTINGS,
        name: 'settings',
        screen: SettingsScreen,
        icon: SettingsIcon
    },
    changelog: {
        id: Screen.CHANGELOG,
        name: 'changelog',
        screen: ChangelogScreen,
        icon: ChangelogIcon
    }
}

export type ScreensType = {
    [key: string]: {
        id: Screen
        name: string
        screen: ComponentType
        icon: ({ className }: IconProps) => JSX.Element
    }
}

