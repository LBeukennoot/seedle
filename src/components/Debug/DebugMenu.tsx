import { Accordion, AccordionDetails, AccordionSummary, Button, MenuItem, Select } from '@mui/material';
import { Plants, type Plant } from '../PlantElement/types';
import { ArrowDownIcon } from '../Icons';
import { useURLParams } from '../../utils/URLParams';
import { usePlantData } from '../../context/PlantData';
import { useUserData } from '../../context/UserData';
import { useState } from 'react';

export const DebugMenu = () => {
  const { plants, createPlant, editPlant, removeAllPlants, removePlant, savePlants } = usePlantData();
  const { userData, setEditState, addGrowthPoints, removeGrowthPoints, addExperience, removeExperience } = useUserData();
  const { getParam } = useURLParams();
  const selectedPlantID = getParam('plant');

  const [newPlants, setNewPlants] = useState({
    amount: 1,
    name: Plants.CHIRARY
  });

  const selectedPlant = plants.find((plant: Plant) => plant.id === selectedPlantID);

  const checkNewStageValue = (value: number, min: number, max: number): boolean => {
    return value >= min && value <= max;
  };

  //TODO add editability for userData
  //TODO add button to remove plant location (make it plantable)
  return (
    <div className="absolute top-0 right-0 bg-black rounded-lg border border-white p-2 m-2 text-white flex flex-col w-50 z-50">
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
              value={newPlants.name ? newPlants.name : undefined}
              onChange={(e) => console.log({ ...newPlants, name: e.target.value })}>
              {Object.values(Plants).map((value: string) => {
                return <MenuItem value={value}>{value}</MenuItem>;
              })}
            </Select>
            <Button
              className="bg-white! w-full"
              onClick={() => {
                Array(newPlants.amount)
                  .fill(undefined)
                  .map(() => {
                    createPlant({ name: newPlants.name, size: 1 });
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
      <Accordion className="border border-white">
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
      </Accordion>

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
            <Select
              className="bg-white w-full"
              value={selectedPlant.name}
              onChange={(e) => editPlant({ ...selectedPlant, name: e.target.value })}>
              {Object.values(Plants).map((value: string) => {
                return <MenuItem value={value}>{value}</MenuItem>;
              })}
            </Select>
            <Button
              className="bg-white! w-full"
              onClick={() => {
                editPlant({ ...selectedPlant, x: undefined, y: undefined });
                setEditState('PLANT');
              }}>
              Move plant
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
