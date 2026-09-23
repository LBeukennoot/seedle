import { Popup } from '../components/Popup/Popup';
import { Garden } from '../components/Garden/Garden';
import { useNavigation } from '../context/Navigation';
import { DebugMenu } from '../components/Debug/DebugMenu';
import { useDebug } from '../context/Debug';
import { WateringCan } from '../components/WateringCan';
import { Seedlings } from './Seedlings';
import { GardenIcon } from '../components/Icons';
import { Book } from '../components/Book/Book';

// const GARDENS = ['A', 'B'];

// export const getRandomGardenAndPosition = (plants: Plant[]) => {
//   // shuffle gardens so we try randomly
//   // const shuffledGardens = [...GARDENS].sort(() => Math.random() - 0.5);

//   // for (const gardenId of shuffledGardens) {
//   const free = getFreePositions(plants, COLS, ROWS);

//   if (free.length > 0) {
//     const pos = free[Math.floor(Math.random() * free.length)];
//     return { ...pos };
//   }
//   // }

//   throw new Error('All gardens are full 🌱');
// };

/**
 * @author      LBeukennoot for Seedle
 * @created     20-04-2026
 */
export default function Navigation() {
  const { popup } = useNavigation();
  // const { plantables } = usePlantData();
  // const { userData, editState, setEditState } = useUserData();
  const { debugSettings } = useDebug();

  return (
    <div className="relative min-h-screen bg-linear-to-b from-[#A4BD6D] to-light-green overflow-hidden">

      <div className="absolute w-full h-full flex justify-center align-center bg-[url('/src/navigation/seedlings.svg')] bg-fit bg-center bg-repeat">
      </div>
      {/* {editState !== 'OFF' && (
        <>
          <div className="absolute w-full h-full p-1">
            <div className="w-full h-full rounded-lg border-6 border-[#FF8B72]"></div>
          </div>
          <div className='absolute w-full flex justify-center my-3.5 z-50'>
            <div className='bg-[#FF8B72] px-4 py-2 rounded-full text-white font-lexend flex align-center gap-5'>
              <div className='py-1'>
                {editState === 'GROW' && (
                  <>{userData.growthPoints} grow points</>
                )}

                {editState === 'PLANT' && (
                  <>{plantables?.length} plants to plant</>
                )}
              </div>
              <div className='px-3 py-1 bg-white rounded-full text-[#FF8B72] hover:cursor-pointer' onClick={() => {
                setEditState('OFF')
              }}>
                {editState === 'GROW' && (
                  <>stop growing</>
                )}

                {editState === 'PLANT' && (
                  <>stop planting</>
                )}
              </div>
            </div>
          </div>
        </>
      )} */}
      {popup && <Popup> {popup} </Popup>}

      <div className="grid grid-rows-[1fr_16rem] h-screen">
        <Garden />
      </div>

      <div className="absolute bottom-0 mb-4 w-full flex justify-center">
        <WateringCan />
      </div>

      <div className="absolute top-0 right-0 m-5 p-3.5 bg-linen rounded-full shadow-2xl hover:shadow-none hover:scale-95 cursor-pointer">
        <GardenIcon className='fill-light-green' size={35} />
      </div>

      <Book>
        <div className="h-64 w-full bg-center shadow-xl bg-[linear-gradient(to_right,#b1c6e0ff_2px,transparent_2px),linear-gradient(to_bottom,#b1c6e0ff_2px,transparent_2px)] bg-[size:34px_34px]"></div>
      </Book>


      {debugSettings.debug && <DebugMenu />}
    </div>
  );
}
