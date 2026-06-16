import { usePlantData } from '../../context/PlantData';
import { COLS, ROWS } from '../../context/PlantData/types';
import { PlantElement } from '../PlantElement';
import type { Plant } from '../PlantElement/types';

const _Plant = ({x, y, plant}: {x: number, y: number, plant: Plant}) => {
  return (
    <div
      key={`${x},${y}`}
      className="relative max-h-fit h-full flex justify-center"
      style={{ transform: plant.mirrored ? 'scaleX(-1)' : '' }}>
      <div className="absolute w-20 h-20 animate-plantmove" style={{ animationDelay: `${(x * 1.5 + y) / 20}s` }}>
        <PlantElement plant={plant.name} stage={plant.stage} className={'h-full w-full'} />
      </div>
    </div>
  );
};

export const Garden = () => {
  // const { userData, editState, removeGrowthPoints } = useUserData();
  const { plants } = usePlantData();
  // const { debugSettings } = useDebug();
  // const { getParam, setParam, appendParam } = useURLParams();
  // const selectedPlantID = getParam('plant');

  //TODO sort plants to make sure higher y-values are displayed on top
  // plants = plants.sort((p1, p2) => p1.y - p2.y);

  // Create a single row: [1, 2, 3]
  const createRow = () => Array.from({ length: COLS }, (_, i) => i - 1 + 1);

  const coordinateArray = Array.from({ length: ROWS }, createRow);


  return (
    // <div>
    <div className=" h-full grid grid-cols-10">
      {coordinateArray.map((arr, x) => {
        return arr.map((y) => {
          // console.log(x,y)

          const plant = plants.find((p) => p.x === x && p.y === y);

          //TODO make plant clickable
          //TODO make slot hoverable (only if in planting mode)
          //TODO make plant hoverable (only if in growing mode)
          return (
            <>
              {plant && (
                <_Plant x={x} y={y} plant={plant} />
              )}

              {!plant && (
                <>
                  <div key={`${x},${y}`} className="w-full h-full"></div>
                </>
              )}
            </>
          );
        });
      })}
      {/* {plants.map((plant: Plant) => (
        <div
          key={plant.id}
          className={
            'absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center animate-plantmove ' +
            (selectedPlantID === plant.id && debugSettings.debug ? 'border-2 border-white rounded-lg p-2' : '')
          }
          onClick={() => {
            if (userData.growthPoints > 0 && editState === 'GROW') {
              growPlant(plant.id);
              removeGrowthPoints(1)
            }
            // const customEvent = new CustomEvent('plantClicked', {detail: {plantId: plant.id}});
            // window.dispatchEvent(customEvent);

            if (debugSettings.debug) {
              // const urlParams = new URLParams()

              const param = getParam('plant');

              if (param) {
                setParam('plant', plant.id);
              } else {
                appendParam('plant', plant.id);
              }

              const url = new URL(window.location.href);
              url.searchParams.set('plant', plant.id);
              window.history.pushState({}, '', url.search);
            }
          }}
          style={{
            left: `${plant.x * 100}%`,
            top: `${plant.y * 75}%`,
            animationDelay: `${plant.x * 1.5 + plant.y}s`
          }}>
          {/* TODO naamkaartje laten zien op hover (incl animatie) */}
      {/* <div>
                        <svg width="36" height="109" viewBox="0 0 36 109" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5.28931e-06 12C5.8687e-06 5.37258 5.37259 -5.79387e-07 12 0L24 1.04907e-06C30.6274 1.62846e-06 36 5.37259 36 12L36 72.5027C36 75.4639 35.3424 78.3882 34.0748 81.0644L22.5187 105.461C20.7126 109.273 15.2873 109.273 13.4813 105.461L1.92524 81.0644C0.657575 78.3882 -2.58879e-07 75.4639 0 72.5027L5.28931e-06 12Z" fill="#DB9A89" />
                        </svg>

                    </div> */}
      {/* <div
            className="w-20 h-20 flex justify-center items-center"
            style={{ transform: plant.mirrored ? 'scaleX(-1)' : '' }}>
            <PlantElement stage={plant.stage} plant={plant.name} />
          </div>
        </div>
      ))} */}
    </div>
  );
};
