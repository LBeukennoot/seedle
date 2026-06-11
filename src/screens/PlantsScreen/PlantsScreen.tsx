import { Button } from '../../components/Button';
import { ArrowDownIcon } from '../../components/Icons';
import { usePlantData } from '../../context/PlantData';
import { useUserData } from '../../context/UserData';
import { Tiers } from '../../context/UserData/types';

export const PlantsScreen = () => {
  const { userData, getExperienceTier } = useUserData();
  const { plants } = usePlantData();
  const plantsAmount = plants.filter((p) => p.x !== undefined).length;
  const unplantedPlants = plants.length !== plantsAmount;

  // const colorTheme = Object.entries(Tiers).find(([key, value]) => {if (key === getExperienceTier(userData.experience) && return value})

  // console.log(colorTheme)

  return (
    <div className="overflow-y-auto max-h-full pt-10 rounded-b-[2.3rem] md:rounded-b-[1.4rem] text-blue font-lexend">
      <h1 className="text-3xl mb-3">plants</h1>

      <div className="flex gap-5 overflow-x-auto overflow-y-clip pb-2">
        <div>
          <div 
          className="bg-blue text-white text-center w-35 h-40 rounded-3xl p-5 flex flex-col justify-center"
          // style={{backgroundColor: colorTheme}}
          >
            <div>plants</div>
            <div className="text-8xl">{plantsAmount}</div>
          </div>
          {unplantedPlants && (
            <Button label="add_plants" className="w-full mt-2" onClick={() => {}}>
              <div className="flex whitespace-nowrap items-center justify-center gap-1 w-full">
                <div className="text-base">plant plants</div>
                <ArrowDownIcon className={'stroke-white -rotate-90'}></ArrowDownIcon>
              </div>
            </Button>
          )}
        </div>
        <div>
          <div className="bg-blue text-white whitespace-nowrap text-center w-35 h-40 rounded-3xl p-5 flex flex-col justify-center">
            <div>growth points</div>
            <div className="text-8xl">{userData.growthPoints}</div>
          </div>
          {userData.growthPoints > 0 && (
            <Button label="add_plants" className="w-full mt-2" onClick={() => {}}>
              <div className="flex whitespace-nowrap items-center justify-center gap-1 w-full">
                <div className="text-base">grow plants</div>
                <ArrowDownIcon className={'stroke-white -rotate-90'}></ArrowDownIcon>
              </div>
            </Button>
          )}
        </div>
        <div>
          <div className="bg-blue text-white text-center w-35 h-40 rounded-3xl p-5 flex flex-col justify-center">
            <div>experience</div>
            <div className="text-8xl">{userData.experience}</div>
          </div>
        </div>
      </div>

      <h1 className="text-3xl mb-3 mt-5">tiers</h1>
      <div className="relative grid grid-cols-3 gap-y-5 max-w-xs">
        {Object.entries(Object.entries(Tiers)).map(([index, [key, value]]) => {
          return (
            <div 
            key={key} 
            className={'w-20 z-10 h-20 rounded-full ' + (parseInt(index) >= 3 ? 'ml-[50%]' : '')}
            style={{backgroundColor: value.color}}
            ></div>
          );
        })}
        <div className="absolute z-0 border-35 border-l-0 rounded-r-full border-light-green w-70 min-h-34 ml-18 my-5"></div>
      </div>
    </div>
  );
};
