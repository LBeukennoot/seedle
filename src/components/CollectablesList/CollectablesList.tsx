import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform } from 'motion/react';
import { PlantSpecies } from '../Plant/types';
import { EnvelopeOpenIcon } from '../Icons/EnvelopeOpenIcon';
import { EnvelopeClosedIcon } from '../Icons/EnvelopeClosedIcon';
import { StarIcon } from '../Icons/StarIcon';
import { BentLineIcon } from '../Icons/BentLineIcon';

export const CollectablesList = () => {
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const y = useMotionValue(0);
  const [dragConstraints, setDragConstraints] = useState({ top: 0, bottom: 0 });

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

  // Calculate top boundary so you can't drag past the bottom of the content
  useEffect(() => {
    const calculateBounds = () => {
      if (containerRef.current && contentRef.current) {
        const containerHeight = containerRef.current.offsetHeight;
        const contentHeight = contentRef.current.scrollHeight;

        const maxScroll = containerHeight - contentHeight;
        setDragConstraints({ top: maxScroll < 0 ? maxScroll : 0, bottom: 0 });
      }
    };

    calculateBounds();
    window.addEventListener('resize', calculateBounds);
    return () => window.removeEventListener('resize', calculateBounds);
  }, []);

  const yClamped = useTransform(y, (latest) => {
    return Math.max(dragConstraints.top, Math.min(dragConstraints.bottom, latest));
  });

  // Handle wheel scrolling
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const deltaY = e.deltaY;
    y.set(y.get() - deltaY);
  };

  return (
    <div ref={containerRef} className="h-full w-full overflow-hidden cursor-grab select-none" onWheel={handleWheel}>
      <motion.div
        ref={contentRef}
        // onScroll={handleScroll}
        drag="y"
        // onWheel={handleWheel}
        // onDrag={handleDrag}
        dragConstraints={dragConstraints}
        dragElastic={0.1} // Bouncy rubber-band effect when pulled past limits
        dragMomentum={true} // Enables momentum physics (flick to scroll)
        whileTap={{ cursor: 'grabbing' }}
        style={{ y: yClamped }}
        className="flex flex-col items-center py-20 gap-10 h-full w-full">
        {collectables.map((collectable) => {
          const unlockedItems = collectables.filter((item) => item.unlocked === 1);
          const isLastUnlockedItem =
            unlockedItems.findIndex((item) => item.id === collectable.id) === unlockedItems.length - 1;
          const isEven = collectable.id % 2 === 0;

          return (
            <div key={collectable.id} id={`item-${collectable.id}`} className={'flex flex-col relative z-10'}>
              <div className={`w-30 h-30 ${collectable.plantLevel} ${isEven ? 'ml-10' : '-ml-10'}`}>
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

              {isLastUnlockedItem && (
                <div className={`w-35 h-35 absolute top-0 left-0 flex flex-col ${isEven ? 'ml-10' : '-ml-10'}`}>
                  <StarIcon size={40} className="fill-orange" />
                  <StarIcon size={40} className="fill-dark-pink self-end mt-5" />
                  <StarIcon size={40} className="fill-light-pink" />
                </div>
              )}

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
      </motion.div>
    </div>
  );
};
