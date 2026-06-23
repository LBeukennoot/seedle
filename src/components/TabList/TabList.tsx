import { ScreenRegistry, type ScreensType } from '../../navigation/ScreenRegistry';
import { Screen } from '../../navigation/Screen';
import type { TabListProps, TabProps } from './types';
import { useUserData } from '../../context/UserData';
import { usePlantData } from '../../context/PlantData';

const Tab = ({ screens, currentScreen, setCurrentScreen }: TabProps) => {
  const { userData } = useUserData();
  const { plantables } = usePlantData();

    // console.log(plantables && plantables.length)

  return (Object.entries(screens) as [string, ScreensType][]).map(([key, screen]: [string, ScreensType]) => {
    return (
      <div
        className={
          'relative pt-4 pb-23 px-3 rounded-full border-6 transition-colors duration-150 border-b-0 ' +
          (currentScreen.toString() === key
            ? 'bg-white border-white '
            : 'bg-blue cursor-pointer border-blue hover:bg-light-blue ')
        }
        // className={"pt-4 pb-25 px-3 md:py-3 md:pl-4 md:pr-20 rounded-full md:rounded-r-none md:rounded-l-full border-6 transition-colors duration-150 border-b-0 md:border-b-6 " + (currentScreen.toString() === key ? "bg-white border-white " : "bg-blue cursor-pointer border-blue hover:bg-light-blue ")}
        onClick={() => setCurrentScreen(key as Screen)}
        key={key}>
        <screen.icon
          className={'transition-all duration-150 ' + (currentScreen.toString() === key ? 'fill-blue' : 'fill-white')}
        />
        {/*
          TODO move to notification provider
          TODO remove notification if tab has been opened
          */}
        {key === Screen.PLANTS && (userData.growthPoints > 1 || (plantables && plantables.length > 0)) && (
          <div className="absolute w-3 h-3 bg-[#FF8B72] rounded-full -top-0.5 -right-0.5"></div>
        )}
      </div>
    );
  });
};

export const TabList = ({ currentScreen, setCurrentScreen }: TabListProps) => {
  // const { currentScreen, setCurrentScreen } = useNavigation()

  return (
    <div className={'flex w-screen max-w-xl'}>
      <Tab screens={ScreenRegistry} currentScreen={currentScreen} setCurrentScreen={setCurrentScreen} />
    </div>
  );
};
