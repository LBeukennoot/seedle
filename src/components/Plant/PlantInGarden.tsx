import type { PlantProps } from './types';
import { Plant } from './Plant';
import { plantPalettes } from '../../plants/generated';

export const PlantInGarden = ({ plant, className, x, y, onClick }: PlantProps) => {
  //TODO: add info card on hover

  const colors = (plantPalettes as Record<string, Record<string, any>>)[plant.plant]?.[plant.palette];
  console.log(plant.stage)

  return (
    <div
      key={`${x},${y}`}
      className={className}
      style={{ transform: plant && plant.mirrored ? 'scaleX(-1)' : '' }}
      onClick={onClick}>
      <div 
      className="absolute w-20 h-20" 
      // style={{ animationDelay: `${(x * 1.5 + y) / 20}s` }}
      >
        <Plant
          name={plant.plant}
          stage={plant.stage}
          className={'absolute w-30 h-30 z-40'}
          colors={colors}
          // colors={{ petals: 'var(--color-white)', stamen: 'var(--color-yellow)', stem: 'var(--color-green)' }}
        />
        {/* <Plant
          name={plant}
          stage={'4'}
          className={'w-full h-full'}
          colors={{ petals: 'var(--color-white)', stamen: 'var(--color-yellow)', stem: 'var(--color-green)' }}
        /> */}
      </div>
    </div>
  );
};
