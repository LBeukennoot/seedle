import { useNavigation } from '../../context/Navigation';
import type { Screen } from '../../navigation/Screen';
import { ArrowDownIcon } from '../Icons';
import { TabList } from '../TabList';
import type { ScreenCardProps } from './types';

export const ScreenCard = ({ children, ...props }: ScreenCardProps) => {
  const { currentScreen, setCurrentScreen } = useNavigation();

  const getScreenHeight = (currentScreen: Screen) => {
    switch (currentScreen) {
        case "timer":
            return "h-35"
            
        case "settings":
            return "h-120"
    
        default:
            return "h-120"
    }
  }

  return (
    // <div {...props} className={"bg-white z-20 mx-auto max-w-xl rounded-[3.5rem] max-h-[30rem] transition-all w-full p-10 md:min-h-[15rem] md:min-w-[30rem]"}>
    <div {...props} className={'z-20 transition-all w-full h-full'}>
      <div className="relative w-full flex justify-center">
        <div className='-z-10 absolute -top-16'>
            <TabList currentScreen={currentScreen} setCurrentScreen={setCurrentScreen} />
        </div>
        {/* <TabList /> */}
        {/* <div className="absolute z-0 w-3.5 h-3.5 border-r-8 border-b-8 mr-13 mt-5 border-white rounded-br-full"></div>
        <div className="absolute z-0 w-3.5 h-3.5 border-l-8 border-b-8 -mr-13 mt-5 border-white rounded-bl-full"></div>
        <div
          className={'bg-white -mb-0.5 px-5 pt-2 h-7 rounded-t-full overflow-hidden hover:cursor-pointer'}
          onClick={() => setPanelExpanded(!panelExpanded)}>
          <ArrowDownIcon className={'stroke-dark-blue ' + (panelExpanded ? 'rotate-180' : '')} />
        </div> */}
      </div>
      <div className={"bg-white mx-auto max-w-xl rounded-[3.5rem] max-h-120 px-10 py-2 transition-all duration-300 ease-in-out " + (getScreenHeight(currentScreen))}>
        {/* <div className="max-h-[25rem]"> */}
        {children}
        {/* <div className=""></div> */}
        {/* </div> */}
      </div>
    </div>
  );
};
