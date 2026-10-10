import { Popup } from '../components/Popup/Popup';
import { Garden } from '../components/Garden/Garden';
import { useNavigation } from '../context/Navigation';
import { DebugMenu } from '../components/Debug/DebugMenu';
import { useDebug } from '../context/Debug';
import { WateringCan } from '../components/WateringCan';
import { GardenIcon } from '../components/Icons';
import { Book } from '../components/Book/Book';
import { CollectablesList } from '../components/CollectablesList/CollectablesList';
import { GridPaper } from '../components/GridPaper/GridPaper';

/**
 * @author      LBeukennoot for Seedle
 * @created     20-04-2026
 */
export default function Navigation() {
  const { popup } = useNavigation();
  const { debugSettings } = useDebug();

  return (
    <div className="relative min-h-screen bg-linear-to-b from-[#A4BD6D] to-light-green overflow-hidden">
      <div className="absolute w-full h-full flex justify-center align-center bg-[url('/src/navigation/seedlings.svg')] bg-fit bg-center bg-repeat"></div>
      {popup && <Popup> {popup} </Popup>}

      <div className="grid grid-rows-[1fr_16rem] h-screen">
        <Garden />
      </div>

      <div className="absolute bottom-0 mb-4 w-full flex justify-center">
        <WateringCan />
      </div>

      <div className="absolute top-0 right-0 m-5 p-3.5 bg-linen rounded-full shadow-2xl hover:shadow-none hover:scale-95 cursor-pointer">
        <GardenIcon className="fill-light-green" size={35} />
      </div>

      <Book>
        <div className="flex flex-col h-full">
          <GridPaper id={"journey"} offset={-45} className={"z-10"}>
            <h1 className="text-4xl font-bold text-green">Journey</h1>
            <h1 className="text-4xl font-normal text-green">5/9</h1>
          </GridPaper>

          <div
            className="grow max-h-6/8 -my-10 max-w-5/6 self-center bg-light-green w-full overflow-y-scroll isolate"
            style={{ clipPath: 'inset(0)' }}>
            {' '}
            {/* clipPath is added because overflow-y-scroll doesnt work on its own. */}
            <CollectablesList />
          </div>

          <GridPaper id={"next"} offset={0} className={"z-10 flex"}>
            <h1 className="text-4xl font-bold text-green">Next</h1>
            <h1 className="text-4xl font-normal text-green">Chicory</h1>
          </GridPaper>
        </div>
      </Book>

      {debugSettings.debug && <DebugMenu />}
    </div>
  );
}
