export interface UserDataProviderProps {
    children: string | JSX.Element | JSX.Element[]
}

export type UserData = {
    rewards: []
    setRewards: Function
    createReward: Function
}