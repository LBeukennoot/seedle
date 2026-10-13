import { useState } from 'react';
import type { RewardPopupProps } from '.';
import { Button } from '../../Button';
import { Plant } from '../../Plant/Plant';
import { PlantInGarden } from '../../Plant/PlantInGarden';
import { PlantSpecies } from '../../Plant/types';
import { EnvelopeClosed } from './Envelope/EnvelopeClosed';
import { EnvelopeOpenBack } from './Envelope/EnvelopeOpenBack';
import { EnvelopeOpenFront } from './Envelope/EnvelopeOpenFront';
import { EnvelopeStamp } from './Envelope/EnvelopeStamp';
import { EnvelopeWiggle } from './Envelope/EnvelopeWiggle';
import { PlantCard } from './Envelope/PlantCard';
import { SeedBag } from './SeedBag';

export const RewardPopup = ({ reward, title = 'session complete!', claim }: RewardPopupProps) => {
  const [envelopeOpen, setEnvelopeOpen] = useState(false);

  const toggleEvelopeOpen = () => {
    setEnvelopeOpen(!envelopeOpen);
  };

  return (
    <div onClick={() => toggleEvelopeOpen()} className="relative w-full h-full flex justify-center items-center">
      {envelopeOpen && <EnvelopeClosed size={455} className="absolute" />}

      {!envelopeOpen && (
        <>
          <div className="relative w-full h-full flex justify-center items-center -mt-45">
            <EnvelopeOpenBack size={500} className="absolute" />
            <div className="absolute rotate-7">
              <div className="relative flex justify-center items-center">
                <PlantCard size={300} className="absolute" />
                <Plant name={PlantSpecies.CHAMOMILE} stage={4} className={'absolute w-30 h-30 z-40'} />
              </div>
            </div>
            <EnvelopeOpenFront size={455} className="absolute -mb-45" />
          </div>
        </>
      )}
      <EnvelopeStamp size={90} className="absolute ml-65 mt-35" />
      <EnvelopeWiggle size={150} className="absolute ml-35 mt-40" />
    </div>
  );
  // return (
  //     <div className="text-center">
  //         <h1 className="text-3xl">{title}</h1>

  //         <div className="relative my-5 flex items-center justify-center">
  //             <SeedBag size={200} />
  //             <div className="absolute max-w-3xs w-full h-full">
  //                 <div className="h-[27%] w-full flex items-center justify-center">
  //                     <p className="text-white text-xl">{reward.toLowerCase()}</p>
  //                 </div>
  //                 <div className="h-[73%] w-full pb-5 flex items-center justify-center">
  //                     <Plant name={reward} stage={4} className="w-full h-full" />
  //                 </div>
  //             </div>
  //         </div>

  //         <Button label={"claim reward"} onClick={() => claim()}>claim reward</Button>
  //     </div>
  // )
};
