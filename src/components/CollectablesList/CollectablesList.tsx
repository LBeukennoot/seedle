import { useEffect, useRef } from 'react';
import { PlantSpecies } from '../Plant/types';
import { BentLineIcon } from '../Icons/BentLineIcon';
import { EnvelopeClosedIcon } from '../Icons/EnvelopeClosedIcon';
import { EnvelopeOpenIcon } from '../Icons/EnvelopeOpenIcon';
import { StarIcon } from '../Icons/StarIcon';

export const CollectablesList = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Updated collectables array with the new format
  const collectables = [
    { id: 1, plant: PlantSpecies.CHIRARY, plantLevel: 'fill-light-red stroke-red', unlocked: 1 },
    { id: 2, plant: PlantSpecies.CHIRARY, plantLevel: 'fill-light-blue stroke-blue', unlocked: 1 },
    { id: 3, plant: PlantSpecies.CHIRARY, plantLevel: 'fill-light-pink stroke-dark-pink', unlocked: 1 },
    { id: 4, plant: PlantSpecies.CHIRARY, plantLevel: 'fill-purple stroke-blue', unlocked: 1 },
    { id: 5, plant: PlantSpecies.CHAMOMILE, plantLevel: 'fill-yellow stroke-orange', unlocked: 1 },
    { id: 6, plant: PlantSpecies.LAVENDER, plantLevel: 'fill-light-red stroke-red', unlocked: 0 },
    { id: 7, plant: PlantSpecies.FIREWEED, plantLevel: 'fill-light-blue stroke-blue', unlocked: 0 },
    { id: 8, plant: PlantSpecies.CHIRARY, plantLevel: 'fill-light-pink stroke-dark-pink', unlocked: 0 },
    { id: 9, plant: PlantSpecies.CHIRARY, plantLevel: 'fill-purple stroke-blue', unlocked: 0 }
  ];

  // Example: Scroll to the item with the specified id
  const scrollToItem = (id: number) => {
    if (containerRef.current) {
      const items = containerRef.current.children;
      const itemIndex = collectables.findIndex((item) => item.id === id);
      if (itemIndex !== -1 && items[itemIndex]) {
        items[itemIndex].scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  useEffect(() => {
    scrollToItem(5); // Scroll to the item with id 5
  }, []);

  return (
    <div className="flex flex-col items-center w-full my-20 gap-10" ref={containerRef}>
      {collectables.map((collectable) => {
        const unlockedItems = collectables.filter((item) => item.unlocked === 1);
        const isLastUnlockedItem =
          unlockedItems.findIndex((item) => item.id === collectable.id) === unlockedItems.length - 1;
        const isEven = collectable.id % 2 === 0;

        return (
          <div key={collectable.id} id={`item-${collectable.id}`} className={'flex flex-col relative'}>
            <div
              className={`w-30 h-30 ${collectable.plantLevel} ${isEven ? 'ml-10' : '-ml-10'} ${collectable.unlocked ? '' : 'grayscale-100'}`}>
              {collectable.unlocked ? (
                <>
                  <EnvelopeOpenIcon size={130} className={`${collectable.plantLevel}`} />
                </>
              ) : (
                <>
                  <EnvelopeClosedIcon size={125} className={`${collectable.plantLevel}`} />
                </>
              )}
            </div>
            {/* <div
              className={`bg-linen w-30 h-30 rounded-full p-5 border-8 ${collectable.plantLevel} ${isEven ? 'ml-10' : '-ml-10'} ${collectable.unlocked ? '' : 'grayscale-100'}`}>
              <Plant name={collectable.plant} stage={4} className="w-16 h-16" />
            </div> */}

            {isLastUnlockedItem && 
            <div className={`w-35 h-35 absolute top-0 left-0 flex flex-col ${isEven ? 'ml-10' : '-ml-10'}`}>
                <StarIcon size={40} className='fill-orange' />
                <StarIcon size={40} className='fill-dark-pink self-end mt-5' />
                <StarIcon size={40} className='fill-light-pink' />
            </div>
            }

            {collectable.id === collectables[collectables.length - 1].id ? (
              <></>
            ) : (
              <BentLineIcon
                size={130}
                className={`-mt-5 -mb-18 -z-10 ${collectable.unlocked && !isLastUnlockedItem ? 'stroke-green' : 'stroke-brown'} ${isEven ? 'ml-4' : '-scale-x-100 -ml-4'}`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};
