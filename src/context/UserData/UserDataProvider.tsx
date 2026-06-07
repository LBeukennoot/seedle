import type { UserDataContextType, UserDataProviderProps } from "./types";
import { UserDataContext } from "./UserDataContext";

export const UserDataProvider = ({ children }: UserDataProviderProps) => {

    //TODO saving props like growthPoints (points to grow plants), xp (points after fully growing plants, unlock new levels)  
    //TODO save data immediately, even before user actions

    // common, rare, unique, blessed, divine

    // chirary: common
    // chamomile: rare
    // fireweed: divine
    // lavender: rare

    const value: UserDataContextType = {
        // time,
        // getDisplayTime,
        // start,
        // pause,
        // isTimerRunning
    };

    return (
        <UserDataContext.Provider value={value}>
            {children}
        </UserDataContext.Provider>
    );
};
