import { Accordion, AccordionDetails, AccordionSummary, Button, MenuItem, Select } from '@mui/material';
import { ArrowDownIcon } from '../Icons';
import { useURLParams } from '../../utils/URLParams';
import { usePlantData } from '../../context/PlantData';
import { useState } from 'react';
import { type PlantData } from '../Plant/types';
// import { useFPS } from '../../utils/useFPS';
import {
  availablePlants,
  getFirstStageKey,
  getRelativePathStage,
  randomPalette,
  randomPath
} from '../../plants/plantHelpers';
import type { PlantSpecies } from '../../plants/generated/types';
import type { PlantCreationTemplate } from '../../context/PlantData/types';
import { useUserData } from '../../context/UserData';
import { initialUserStatistics } from '../../context/UserData/constants';

export const DebugMenu = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { plants, createPlant, editPlant, growAllPlants, removeAllPlants, removePlant, savePlants } = usePlantData();
  const { setUserStatistics, saveUserData } = useUserData();
  const { getParam } = useURLParams();
  const selectedPlantID = getParam('plant');
  // const fps = useFPS();

  const [newPlants, setNewPlants] = useState<{ amount: number; name: PlantSpecies }>({
    amount: 1,
    name: availablePlants[0].key as keyof typeof plants as PlantSpecies
  });

  const selectedPlant: PlantData = plants.find((plant: PlantData) => plant.id === selectedPlantID);

  return (
    <div className="absolute bottom-0 left-0 min-h-50 flex items-end z-50">
      {open && (
        <div className="bg-black rounded-t-lg rounded-bl-lg border border-white p-2 ml-2 mb-2 text-white flex flex-col w-50 z-20">
          <Accordion className="border-b border-white">
            <AccordionSummary className="bg-black! text-white!" expandIcon={<ArrowDownIcon className="stroke-white" />}>
              UserData
            </AccordionSummary>

            <AccordionDetails className="bg-black! text-white!">
              
              <Button
              className='bg-white! w-full'
              onClick={() => setUserStatistics(initialUserStatistics)}
              >
                Reset UserStatistics
              </Button>
              
              <Button
              className='bg-white! w-full'
              onClick={() => saveUserData()}
              >
                Save UserStatistics
              </Button>

            </AccordionDetails>
          </Accordion>

          <Accordion className="border-b border-white">
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
                    const selectedPlant = e.target.value as keyof typeof plants as PlantSpecies;
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
                    const palette = randomPalette(newPlants.name);
                    const path = randomPath(newPlants.name);
                    const firstStage = getFirstStageKey(newPlants.name);

                    createPlant(
                      {
                        plant: newPlants.name,
                        palette: palette,
                        path: path,
                        stage: firstStage
                      } as PlantCreationTemplate,
                      newPlants.amount
                    );
                  }}>
                  Add plant
                </Button>
              </div>

              <Button className="bg-white! w-full" onClick={() => growAllPlants()}>
                Grow all plants
              </Button>

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
          <Accordion className="">
            <AccordionSummary
              className="bg-black! text-white!"
              expandIcon={selectedPlant && <ArrowDownIcon className="stroke-white" />}>
              {selectedPlant ? `Selected flower: ${selectedPlant.plant}` : 'Click a plant to edit'}
            </AccordionSummary>
            {selectedPlant && (
              <div className="bg-black">
                <div className="w-full flex">
                  <Button
                    className="bg-white!"
                    onClick={() => {
                      const nextStage = getRelativePathStage(selectedPlant.stage, selectedPlant.path, -1);

                      if (nextStage) {
                        editPlant({
                          ...selectedPlant,
                          stage: nextStage
                        } as PlantData);
                      }
                    }}>
                    -
                  </Button>
                  <div className="w-full text-white text-xl text-center">{selectedPlant.stage}</div>
                  <Button
                    className="bg-white!"
                    onClick={() => {
                      const nextStage = getRelativePathStage(selectedPlant.stage, selectedPlant.path, 1);

                      if (nextStage) {
                        editPlant({
                          ...selectedPlant,
                          stage: nextStage
                        } as PlantData);
                      }
                    }}>
                    +
                  </Button>
                </div>
                <Select
                  className="bg-white w-full"
                  value={selectedPlant.plant}
                  onChange={(e) => {
                    const newSelectedPlant = e.target.value as keyof typeof plants as PlantSpecies;
                    const path = randomPath(newSelectedPlant);
                    const firstStage = getFirstStageKey(newSelectedPlant);
                    editPlant({ ...selectedPlant, plant: newSelectedPlant, stage: firstStage, path } as PlantData);
                  }}>
                  {availablePlants.map((plant) => (
                    <MenuItem key={plant.key} value={plant.key}>
                      {plant.label}
                    </MenuItem>
                  ))}
                </Select>
                <Button className="bg-white! w-full" onClick={() => removePlant(selectedPlant.id)}>
                  Delete plant
                </Button>
              </div>
            )}
          </Accordion>
        </div>
      )}
      <div
        onClick={() => setOpen(!open)}
        className="bg-black border-y border-r border-white text-white rounded-r-lg px-2 py-3 mb-2 -ml-0.5 flex items-center cursor-pointer z-20">
        {open ? '<' : '>'}
      </div>
    </div>
  );
};
