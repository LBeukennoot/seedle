import { Button } from "../../components/Button";
import { ArrowDownIcon } from "../../components/Icons";

export const PlantsScreen = () => {
  return (
    <div className="overflow-y-auto max-h-full pt-10 rounded-b-[2.3rem] md:rounded-b-[1.4rem] text-blue font-lexend">
      <h1 className="text-3xl mb-3">plants</h1>

      <div className="flex gap-5 overflow-x-auto overflow-y-clip pb-2">
        <div>
          <div className="bg-blue text-white text-center w-35 h-40 rounded-3xl p-5 flex flex-col justify-center">
            <div>plants</div>
            <div className="text-8xl">0</div>
          </div>
          <Button label="add_plants" className="w-full mt-2" onClick={() => {}}>
            <div className="flex whitespace-nowrap items-center gap-2 w-full">
                <div className="text-base">Add plants</div>
                <ArrowDownIcon className={"stroke-white -rotate-90"}></ArrowDownIcon>
            </div>
          </Button>
        </div>
        <div>
          <div className="bg-blue text-white whitespace-nowrap text-center w-35 h-40 rounded-3xl p-5 flex flex-col justify-center">
            <div>growth points</div>
            <div className="text-8xl">23</div>
          </div>
        </div>
        <div>
          <div className="bg-blue text-white text-center w-35 h-40 rounded-3xl p-5 flex flex-col justify-center">
            <div>experience</div>
            <div className="text-8xl">19</div>
          </div>
        </div>
      </div>

      <h1 className="text-3xl mb-3 mt-5">tiers</h1>
      <div className="relative grid grid-cols-3 gap-y-5 max-w-xs">
        {[0, 1, 2, 3, 4].map((x: number) => {
          return <div className={'w-20 z-10 h-20 bg-purple-500 rounded-full ' + (x >= 3 ? 'ml-[50%]' : '')}></div>;
        })}
        <div className="absolute z-0 border-35 border-l-0 rounded-r-full border-light-green w-70 min-h-34 ml-18 my-5"></div>
      </div>
    </div>
  );
};
