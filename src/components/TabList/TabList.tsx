import { ScreenRegistry, type ScreensType } from '../../navigation/ScreenRegistry';
import { Screen } from '../../navigation/Screen';
import type { TabProps } from './types';
// import { useUserData } from '../../context/UserData';
// import { usePlantData } from '../../context/PlantData';
// import { useSettings } from '../../context/Settings';
import { useNavigation } from '../../context/Navigation';
import { PauseIcon } from '../Icons';
import { CrossIcon } from '../Icons/CrossIcon';

const Tab = ({ screens }: TabProps) => {
  // const { userData } = useUserData();
  // const { plantables } = usePlantData();
  // const { sessionSettings } = useSettings();
  const { currentScreen, setCurrentScreen } = useNavigation();

  // console.log(plantables && plantables.length)

  return (Object.entries(screens) as [string, ScreensType][]).map(([key, screen]: [string, ScreensType]) => {
    return (
      <div
        className={screen.background}
        // className={"pt-4 pb-25 px-3 md:py-3 md:pl-4 md:pr-20 rounded-full md:rounded-r-none md:rounded-l-full border-6 transition-colors duration-150 border-b-0 md:border-b-6 " + (currentScreen.toString() === key ? "bg-white border-white " : "bg-blue cursor-pointer border-blue hover:bg-light-blue ")}
        onClick={() => setCurrentScreen(key as Screen)}
        key={key}>
        <screen.icon //TODO
          className={'fill-white'}
        />
        {/*
          TODO move to notification provider
          TODO remove notification if tab has been opened
          */}
        {/* {key === Screen.PLANTS && (userData.growthPoints > 1 || (plantables && plantables.length > 0)) && (
          <div className="absolute w-3 h-3 bg-[#FF8B72] rounded-full -top-0.5 -right-0.5"></div>
        )} */}
      </div>
    );
  });
};

export const TabList = () => {
  const { toggleMenuOpen } = useNavigation();

  return (
    <div
      className={
        'absolute bottom-190 -ml-5 -mb-5 [&>div]:rounded-t-xl px-10 w-full grid grid-cols-9 h-14 gap-3 items-bottom [&>div]:col-span-2 [&>div]:flex [&>div]:justify-center [&>div]:items-center [&>div]:shadow-xl [&>div]:hover:mt-1.5 [&>div]:active:mt-2.5 [&>div]:active:shadow-lg [&>div]:cursor-pointer'
      }>
      <Tab screens={ScreenRegistry} />
      <div onClick={() => toggleMenuOpen()} className="bg-red01 col-start-9! col-end-10!"><CrossIcon className='stroke-white'/></div>
    </div>
  );
};
