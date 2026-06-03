import { Accordion, AccordionDetails, AccordionSummary, Button, MenuItem, Select } from '@mui/material';
import { useUserData } from '../../context/UserData';
import { Plants, type Plant } from '../PlantElement/types';
import { ArrowDownIcon } from '../Icons';
import { useURLParams } from '../../utils/URLParams';

export const DebugMenu = () => {
  const { plants, createPlant, editPlant, removeAllPlants, removePlant, savePlants, tickPlants } = useUserData();

  const { getParam } = useURLParams();
  const selectedPlantID = getParam('plant');

  const selectedPlant = plants.find((plant: Plant) => plant.id === selectedPlantID);

  const checkNewStageValue = (value: number, min: number, max: number): boolean => {
    return value >= min && value <= max;
  };

  return (
    <div className="absolute top-0 right-0 bg-black rounded-lg border border-white p-2 m-2 text-white flex flex-col w-50">
      <Accordion className='border border-white'>
        <AccordionSummary className="bg-black! text-white!" expandIcon={<ArrowDownIcon className="stroke-white" />}>
          {plants.length} Total Plants
        </AccordionSummary>

        <AccordionDetails className="bg-black! text-white!">
          <div className='mb-5'>
            <input step={1} min={1} className='bg-white text-black w-full' placeholder='amount' />
            <Select
              className="bg-white w-full"
              value="Add plant"
              onChange={(e) => createPlant({ size: 1, name: e.target.value, stage: 1, maxAge: 4 })}>
              <MenuItem value="Add plant">Add Plant</MenuItem>
              {Object.values(Plants).map((value: string) => {
                return <MenuItem value={value}>{value}</MenuItem>;
              })}
            </Select>
          </div>

          <Button className="bg-white! w-full" onClick={() => tickPlants()}>
            Grow plants
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

      <Accordion className='border border-white'>
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
                  editPlant(selectedPlant.id, { ...selectedPlant, stage: selectedPlant.stage - 1 })
                }>
                -
              </Button>
              <div className="w-full text-white text-xl text-center">{selectedPlant.stage}</div>
              <Button
                className="bg-white!"
                onClick={() =>
                  checkNewStageValue(selectedPlant.stage + 1, 1, selectedPlant.maxStage) &&
                  editPlant(selectedPlant.id, { ...selectedPlant, stage: selectedPlant.stage + 1 })
                }>
                +
              </Button>
            </div>
            <Select
              className="bg-white w-full"
              value={selectedPlant.name}
              onChange={(e) => editPlant(selectedPlant.id, { ...selectedPlant, name: e.target.value })}>
              {Object.values(Plants).map((value: string) => {
                return <MenuItem value={value}>{value}</MenuItem>;
              })}
            </Select>
            <Button className="bg-white! w-full" onClick={() => removePlant(selectedPlant.id)}>
              Delete plant
            </Button>
            {/* //TODO move plant (first insert system so users can manually place plants) */}
          </div>
        )}
      </Accordion>
    </div>
  );
};
