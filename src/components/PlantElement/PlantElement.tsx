import { useState } from 'react';
import type { PlantProps } from '.';
import { Chamomile } from './Chamomile/Chamomile';
import { Chirary } from './Chirary/Chirary';
import { Fireweed } from './Fireweed/Fireweed';
import { Lavender } from './Lavender/Lavender';
import { Plants, type Plant } from './types';
import { useUserData } from '../../context/UserData';

const Element = ({ name, stage, className }: { name: Plants; stage: number; className: string }) => {
  //TODO generate element automatically based on a json file or smth
  switch (name) {
    case Plants.CHIRARY:
      return <Chirary stage={stage} className={className} />;
    case Plants.CHAMOMILE:
      return <Chamomile stage={stage} className={className} />;
    case Plants.FIREWEED:
      return <Fireweed stage={stage} className={className} />;
    case Plants.LAVENDER:
      return <Lavender stage={stage} className={className} />;
  }
};

export const PlantElement = ({ plant, className, x, y, onClick }: PlantProps) => {
  const { editState } = useUserData();
  const [isHovering, setIsHovering] = useState(false);

  const nextStage = (plant: Plant) => {
    const newStage = plant.stage + 1;
    if (newStage <= plant.maxStage) {
      return newStage;
    } else {
      return plant.maxStage;
    }
  };
  //TODO add info card on hover

  return (
    <div
      key={`${x},${y}`}
      className={className}
      style={{ transform: plant && plant.mirrored ? 'scaleX(-1)' : '' }}
      onClick={onClick}
      onMouseEnter={() => {
        setIsHovering(true);
      }}
      onMouseLeave={() => {
        setIsHovering(false);
      }}>
      <div className="absolute w-20 h-20 animate-plantmove" style={{ animationDelay: `${(x * 1.5 + y) / 20}s` }}>
        <Element
          name={plant.name}
          stage={isHovering && editState === 'GROW' ? nextStage(plant) : plant.stage}
          className={'w-full h-full'}
        />
      </div>
    </div>
  );
};
