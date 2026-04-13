import { useEffect, useState } from "react";
import { SettingsContext } from "./SettingsContext";
import LocalStorage from "../../utils/LocalStorage";
import { useDebug } from "../DebugProvider";

export const SettingsProvider = ({ children, backgroundAnimated: _backgroundAnimated }: { children: React.ReactNode, backgroundAnimated?: boolean | undefined }) => {
  const localStorage = new LocalStorage;
  const { backgroundAnimatedDebug } = useDebug();

  const getLocalStorageValue = () => {
    const localStorageValue = localStorage.getValue('backgroundAnimated')
    
    if (backgroundAnimatedDebug !== undefined) {
      return backgroundAnimatedDebug;
    }

    if (_backgroundAnimated !== undefined) {
      return _backgroundAnimated;
    } else if (localStorageValue) {
      return localStorageValue.trim() === 'true' ? true : false;
    } else {
      return true;
    }
  }

  const [backgroundAnimated, setBackgroundAnimated] = useState<boolean>(getLocalStorageValue());
  console.log(getLocalStorageValue())

  useEffect(() => {
    setBackgroundAnimated(getLocalStorageValue())
  }, [_backgroundAnimated, backgroundAnimatedDebug]);

  const value = {
    backgroundAnimated,
    switchBackground: () =>
      setBackgroundAnimated(
        (prev) => {
          const newValue = !prev;
          localStorage.setValue('backgroundAnimated', newValue);
          return newValue;
        }
      ),
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};
