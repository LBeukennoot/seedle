import { type ComponentType, type JSX } from 'react'
// import { TimerScreen } from '../screens/TimerScreen'
import { GardenIcon, SettingsIcon, TimerIcon, type IconProps } from '../components/Icons'
// import { SettingsScreen } from '../screens/SettingsScreen'
// import { ChangelogScreen } from '../screens/ChangelogScreen'
import { Screen } from './Screen'
// import { PlantsScreen } from '../screens/PlantsScreen'
import { JourneyScreen } from '../screens/Journey/JourneyScreen'
import { StatisticsScreen } from '../screens/Statistics/StatisticsScreen'
import { SettingsScreen } from '../screens/SettingsScreen'
import { StatisticsIcon } from '../components/Icons/StatisticsIcon'


export const DefaultScreen: Screen = Screen.JOURNEY

export const ScreenRegistry: Record<Screen, {
    screen: ComponentType
    icon: ({ className }: IconProps) => JSX.Element,
    background: string
}> = {
    [Screen.JOURNEY]: {
        screen: JourneyScreen,
        icon: GardenIcon,
        background: "bg-yellow"
    },
    [Screen.STATISTICS]: {
        screen: StatisticsScreen,
        icon: StatisticsIcon, //TODO
        background: "bg-purple"
    },
    [Screen.SETTINGS]: {
        screen: SettingsScreen,
        icon: SettingsIcon,
        background: "bg-dark-pink"
    },
    // [Screen.TIMER]: {
    //     screen: TimerScreen,
    //     icon: TimerIcon
    // },
    // [Screen.SETTINGS]: {
    //     screen: SettingsScreen,
    //     icon: SettingsIcon
    // },
    // [Screen.CHANGELOG]: {
    //     screen: ChangelogScreen,
    //     icon: ChangelogIcon
    // },
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
        icon: ({ className }: IconProps) => JSX.Element,
        background: string
    }
}

