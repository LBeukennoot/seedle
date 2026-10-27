import { Popup } from '../components/Popup/Popup';
import { Garden } from '../components/Garden/Garden';
import { useNavigation } from '../context/Navigation';
import { DebugMenu } from '../components/Debug/DebugMenu';
import { useDebug } from '../context/Debug';
import { WateringCan } from '../components/WateringCan';
import { GardenIcon } from '../components/Icons';
import { Book } from '../components/Book/Book';
// import { CollectablesList } from '../components/CollectablesList/CollectablesList';
// import { GridPaper } from '../components/GridPaper/GridPaper';
// import { TabList } from '../components/TabList';
// import { ScreenCard } from '../components/ScreenCard';
import { PictureInPictureProvider } from '../context/PictureInPicture/PictureInPictureProvider';
// import { usePictureInPicture } from '../context/PictureInPicture';
// import { ScreenRegistry } from './ScreenRegistry';

/**
 * @author      LBeukennoot for Seedle
 * @created     20-04-2026
 */
export default function Navigation() {
  const { popup, ScreenElement, menuOpen, toggleMenuOpen } = useNavigation();
  const { debugSettings } = useDebug();

  return (
    <div className="relative min-h-screen bg-linear-to-b from-[#A4BD6D] to-light-green overflow-hidden">
      <div className="absolute w-full h-full flex justify-center align-center bg-[url('/src/navigation/seedlings.svg')] bg-fit bg-center bg-repeat"></div>
      {popup && <Popup> {popup} </Popup>}

      <div className="grid grid-rows-[1fr_16rem] h-screen">
        <Garden />
      </div>


      <div className="absolute bottom-0 mb-4 w-full flex justify-center">

        <PictureInPictureProvider>
          <WateringCan />
        </PictureInPictureProvider>
      </div>

      <div
        onClick={() => toggleMenuOpen()}
        className="absolute top-0 right-0 m-5 p-3.5 bg-linen rounded-full shadow-2xl hover:shadow-lg hover:scale-95 active:shadow-none active:scale-90 cursor-pointer">
        <GardenIcon className="fill-light-green" size={35} />
      </div>

      {menuOpen && (
        <Book>
          <ScreenElement />
        </Book>
      )}

      {debugSettings.debug && <DebugMenu />}
    </div>
  );
}
