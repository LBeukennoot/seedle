import { Popup } from '../components/Popup/Popup';
import { Garden } from '../components/Garden/Garden';
import { useUserData } from '../context/UserData';
import { type Plant } from '../components/PlantElement/types';
import { ScreenCard } from '../components/ScreenCard/ScreenCard';
import { useNavigation } from '../context/Navigation';
import { DebugMenu } from '../components/Debug/DebugMenu';
import { useDebug } from '../context/Debug';

const COLS = 10;
const ROWS = 10;

const generateGridPositions = (cols: number, rows: number) => {
  const positions = [];

  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      positions.push({
        x: (x + 0.5) / cols,
        y: (y + 0.5) / rows
      });
    }
  }

  return positions;
};

const getFreePositions = (plants: Plant[], cols: number, rows: number) => {
  // const gardenPlants = plants.filter((p) => p.gardenId === gardenId);
  const all = generateGridPositions(cols, rows);

  return all.filter((pos) => !plants.some((p) => p.x === pos.x && p.y === pos.y));
};

// const GARDENS = ['A', 'B'];

export const getRandomGardenAndPosition = (plants: Plant[]) => {
  // shuffle gardens so we try randomly
  // const shuffledGardens = [...GARDENS].sort(() => Math.random() - 0.5);

  // for (const gardenId of shuffledGardens) {
  const free = getFreePositions(plants, COLS, ROWS);

  if (free.length > 0) {
    const pos = free[Math.floor(Math.random() * free.length)];
    return { ...pos };
  }
  // }

  throw new Error('All gardens are full 🌱');
};

/**
 * @author      LBeukennoot for Seedle
 * @created     20-04-2026
 */
export default function Navigation() {
  const { ScreenElement, popup } = useNavigation();
  const { plants } = useUserData();
  const {debugSettings} = useDebug()

  return (
    // <div className="min-h-screen grid grid-rows-[30vh_1fr_30vh] bg-light-green overflow-hidden">
    <div className="relative min-h-screen bg-light-green overflow-hidden">
      {popup && <Popup> {popup} </Popup>}

      <div className="h-[80vh]">
        <Garden plants={plants} />
      </div>
      <div className="absolute bottom-0 mb-4 w-full flex justify-center">
        {/* <div>arrow</div> */}
        <ScreenCard>
          <ScreenElement />
        </ScreenCard>
      </div>

      {debugSettings.debug && <DebugMenu />}
      {/* top garden */}
      {/* <div className="relative  h-full">
                <Garden
                    gardenId="A"
                    plants={plants}
                />
            </div> */}

      {/* screens */}
      {/* <div className="relative flex items-start inset-0 flex items-center justify-center">
                <div className="max-w-xl w-full">
                    <div className="absolute z-20 max-w-xl w-full mt-15 md:mt-0">
                        <ScreenCard>
                            <ScreenElement />
                        </ScreenCard>
                    </div>

                    <div className="w-20 h-20 absolute top-0 -z-0 md:-ml-15">
                        <TabList currentScreen={currentScreen} setCurrentScreen={setCurrentScreen} />
                    </div>
                </div>
            </div> */}

      {/* bottom garden */}
      {/* <div className="relative h-full">
                <Garden
                    gardenId="B"
                    plants={plants}
                />
            </div> */}
    </div>
  );
}
