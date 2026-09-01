import { useState } from "react";
import { useUserData } from "../../context/UserData";
import type { PlantData, PlantProps } from "./types";
import { Plant } from "./Plant";

export const PlantInGarden = ({ plant, className, x, y, onClick }: PlantProps) => {
  const { editState } = useUserData();
  const [isHovering, setIsHovering] = useState(false);

  const nextStage = (plant: PlantData) => {
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
      <div className="absolute w-20 h-20 " style={{ animationDelay: `${(x * 1.5 + y) / 20}s` }}>
        <Plant
          name={plant.name}
          stage={isHovering && editState === 'GROW' ? nextStage(plant) : plant.stage}
          className={'w-full h-full'}
        />
      </div>
    </div>
  );
};