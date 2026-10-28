import { Accordion, AccordionDetails, AccordionSummary, Button, MenuItem, Select } from '@mui/material';
import { ArrowDownIcon } from '../Icons';
import { useURLParams } from '../../utils/URLParams';
import { usePlantData } from '../../context/PlantData';
import { useUserData } from '../../context/UserData';
import { useState } from 'react';
import { type PlantData } from '../Plant/types';
import { useFPS } from '../../utils/useFPS';
import { availablePlants } from '../../plants/plantHelpers';

export const DebugMenu = () => {
  const { plants, createPlant, editPlant, removeAllPlants, removePlant, savePlants } = usePlantData();
  // const { userData, setEditState, addGrowthPoints, removeGrowthPoints, addExperience, removeExperience } = useUserData();
  const { getParam } = useURLParams();
  const selectedPlantID = getParam('plant');
  const fps = useFPS();

  const [newPlants, setNewPlants] = useState({
    amount: 1,
    name: availablePlants[0].key as keyof typeof plants
  });

  const selectedPlant = plants.find((plant: PlantData) => plant.id === selectedPlantID);

  const checkNewStageValue = (value: number, min: number, max: number): boolean => {
    return value >= min && value <= max;
  };

  return (
    <div className="absolute bottom-0 left-0 bg-black rounded-lg border border-white p-2 m-2 text-white flex flex-col w-50 z-50">
      fps: {fps}
      <Accordion className="border border-white">
        <AccordionSummary className="bg-black! text-white!" expandIcon={<ArrowDownIcon className="stroke-white" />}>
          {plants.length} Total Plants
        </AccordionSummary>

        <AccordionDetails className="bg-black! text-white!">
          <div className="mb-5">
            <input
              type="number"
              step={1}
              min={1}
              className="bg-white text-black w-full"
              placeholder="amount"
              value={newPlants.amount}
              onChange={(e) => setNewPlants({ ...newPlants, amount: parseInt(e.target.value) })}
            />
            <Select
              className="bg-white w-full"
              value={newPlants.name || ''}
              onChange={(e) => {
                const selectedPlant = e.target.value as keyof typeof plants;
                setNewPlants({ ...newPlants, name: selectedPlant });
              }}>
              {availablePlants.map((plant) => (
                <MenuItem key={plant.key} value={plant.key}>
                  {plant.label}
                </MenuItem>
              ))}
            </Select>
            <Button
              className="bg-white! w-full"
              onClick={() => {
                Array(newPlants.amount)
                  .fill(undefined)
                  .map(() => {
                    createPlant({ plant: newPlants.name, palette: 'default', size: 1 });
                  });
              }}>
              Add plant
            </Button>
          </div>

          <Button className="bg-white! w-full" onClick={() => removeAllPlants()}>
            Clear plants
          </Button>

          <Button className="bg-white! w-full" onClick={() => console.log(plants)}>
            Export plants
          </Button>

          <Button className="bg-white! w-full" onClick={() => savePlants()}>
            Save plants
          </Button>
        </AccordionDetails>
      </Accordion>
      {/* <Accordion className="border border-white">
        <AccordionSummary className="bg-black! text-white!" expandIcon={<ArrowDownIcon className="stroke-white" />}>
          UserData
        </AccordionSummary>
        <AccordionDetails className="bg-black! text-white!">
          <p>GrowthPoints</p>
          <div className="w-full flex">
            <Button
              className="bg-white!"
              onClick={() =>
                removeGrowthPoints(1)
              }>
              -
            </Button>
            <div className="w-full text-white text-xl text-center">{userData.growthPoints}</div>
            <Button
              className="bg-white!"
              onClick={() =>
                addGrowthPoints(1)
              }>
              +
            </Button>
          </div>
          <p>Experience</p>
          <div className="w-full flex">
            <Button
              className="bg-white!"
              onClick={() =>
                removeExperience(1)
              }>
              -
            </Button>
            <div className="w-full text-white text-xl text-center">{userData.experience}</div>
            <Button
              className="bg-white!"
              onClick={() =>
                addExperience(1)
              }>
              +
            </Button>
          </div>
        </AccordionDetails>
      </Accordion> */}
      <Accordion className="border border-white">
        <AccordionSummary className="bg-black! text-white!" expandIcon={<ArrowDownIcon className="stroke-white" />}>
          {selectedPlant ? `Selected flower: ${selectedPlant.name}` : 'select'}
        </AccordionSummary>
        {selectedPlant && (
          <div className="bg-black">
            <div className="w-full flex">
              <Button
                className="bg-white!"
                onClick={() =>
                  checkNewStageValue(selectedPlant.stage - 1, 1, selectedPlant.maxStage) &&
                  editPlant({ ...selectedPlant, stage: selectedPlant.stage - 1 })
                }>
                -
              </Button>
              <div className="w-full text-white text-xl text-center">{selectedPlant.stage}</div>
              <Button
                className="bg-white!"
                onClick={() =>
                  checkNewStageValue(selectedPlant.stage + 1, 1, selectedPlant.maxStage) &&
                  editPlant({ ...selectedPlant, stage: selectedPlant.stage + 1 })
                }>
                +
              </Button>
            </div>
            {/* <Select
              className="bg-white w-full"
              value={selectedPlant.name}
              onChange={(e) => editPlant({ ...selectedPlant, name: e.target.value })}>
              {Object.values(PlantSpecies).map((value: string) => {
                return <MenuItem value={value}>{value}</MenuItem>;
              })}
            </Select> */}
            <Button
              className="bg-white! w-full"
              onClick={() => {
                editPlant({ ...selectedPlant, x: undefined, y: undefined });
              }}>
              Remove plant location
            </Button>
            <Button className="bg-white! w-full" onClick={() => removePlant(selectedPlant.id)}>
              Delete plant
            </Button>
          </div>
        )}
      </Accordion>
    </div>
  );
};
