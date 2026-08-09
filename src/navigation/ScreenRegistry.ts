import { type ComponentType, type JSX } from 'react'
import { TimerScreen } from '../screens/TimerScreen'
import { ChangelogIcon, GardenIcon, SettingsIcon, TimerIcon, type IconProps } from '../components/Icons'
import { SettingsScreen } from '../screens/SettingsScreen'
import { ChangelogScreen } from '../screens/ChangelogScreen'
import { Screen } from './Screen'
import { PlantsScreen } from '../screens/PlantsScreen'


export const DefaultScreen: Screen = Screen.TIMER

export const ScreenRegistry: Record<Screen, {
    screen: ComponentType
    icon: ({ className }: IconProps) => JSX.Element
}> = {
    [Screen.TIMER]: {
        screen: TimerScreen,
        icon: TimerIcon
    },
    [Screen.SETTINGS]: {
        screen: SettingsScreen,
        icon: SettingsIcon
    },
    [Screen.CHANGELOG]: {
        screen: ChangelogScreen,
        icon: ChangelogIcon
    },
    // [Screen.PLANTS]: {
    //     screen: PlantsScreen,
    //     icon: GardenIcon
    // }
}

export const isScreen = (value: string): value is Screen => {
  return Object.values(Screen).includes(value as Screen)
}

export type ScreensType = {
    [key: string]: {
        screen: ComponentType
        icon: ({ className }: IconProps) => JSX.Element
    }
}

