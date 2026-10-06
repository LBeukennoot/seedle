import { useEffect, useRef } from 'react';
import { Plant } from '../Plant/Plant';
import { PlantSpecies } from '../Plant/types';

export const CollectablesList = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Updated collectables array with the new format
  const collectables = [
    { id: 1, plant: PlantSpecies.CHIRARY, plantLevel: "border-purple", unlocked: 1 },
    { id: 2, plant: PlantSpecies.CHIRARY, plantLevel: "border-champagne", unlocked: 1 },
    { id: 3, plant: PlantSpecies.CHIRARY, plantLevel: "border-light-pink", unlocked: 1 },
    { id: 4, plant: PlantSpecies.CHIRARY, plantLevel: "border-purple", unlocked: 1 },
    { id: 5, plant: PlantSpecies.CHAMOMILE, plantLevel: "border-dark-pink", unlocked: 1 },
    { id: 6, plant: PlantSpecies.LAVENDER, plantLevel: "border-yellow", unlocked: 0 },
    { id: 7, plant: PlantSpecies.FIREWEED, plantLevel: "border-purple", unlocked: 0 },
    { id: 8, plant: PlantSpecies.CHIRARY, plantLevel: "border-light-red", unlocked: 0 },
    { id: 9, plant: PlantSpecies.CHIRARY, plantLevel: "border-red", unlocked: 0 },
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
        return (
          <div key={collectable.id} id={`item-${collectable.id}`} className={'flex flex-col'}>
            <div
              className={
                `bg-linen rounded-full p-5 border-8 ${collectable.plantLevel} ${collectable.id % 2 === 0 ? 'ml-10' : '-ml-10'} ${collectable.unlocked ? "" : "grayscale-100"}`
              }
            >
              <Plant name={collectable.plant} stage={4} className="w-16 h-16" />
            </div>
            {collectable.id === collectables[collectables.length - 1].id ? (
              <></>
            ) : (
              <div
                className={`w-4 bg-green h-20 -z-10 -mt-2 -mb-12 ${collectable.unlocked ? "" : "grayscale-100"} ${
                  collectable.id % 2 === 0 ? 'rotate-15 ml-17' : '-rotate-15 ml-7'
                }`}
              ></div>
            )}
          </div>
        );
      })}
    </div>
  );
};
