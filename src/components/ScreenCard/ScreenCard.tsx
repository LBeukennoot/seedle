import { useNavigation } from '../../context/Navigation';
import type { Screen } from '../../navigation/Screen';
import { TabList } from '../TabList';
import type { ScreenCardProps } from './types';

export const ScreenCard = ({ children, ...props }: ScreenCardProps) => {
  const { currentScreen, setCurrentScreen } = useNavigation();

  // const getScreenHeight = (currentScreen: Screen) => {
  //   switch (currentScreen) {
  //       case "timer":
  //           return "h-35"
            
  //       case "settings":
  //           return "h-120"
            
  //       case "plants":
  //           return "h-150"
    
  //       default:
  //           return "h-120"
  //   }
  // }

  return children;
};
