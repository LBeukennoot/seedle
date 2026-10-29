import { useEffect, useReducer } from 'react';
import LocalStorage from '../../utils/LocalStorage';
import { useDebug } from '../Debug';
import {
  COLS,
  ROWS,
  type PlantAction,
  type PlantCreationTemplate,
  type PlantDataContextType,
  type PlantDataProviderProps
} from './types';
import { PlantDataContext } from './PlantDataContext';
import { type PlantData } from '../../components/Plant/types';
import { getRelativePathStage } from '../../plants/plantHelpers';
import { useUserData } from '../UserData';

const localStorage = new LocalStorage();

const generateGridPositions = (cols: number, rows: number) => {
  const positions = [];

  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      positions.push({
        x: (x * 10) / cols,
        y: (y * 10) / rows
      });
    }
  }

  return positions;
};

const getFreePositions = (plants: PlantData[], cols: number, rows: number) => {
  const all = generateGridPositions(cols, rows);

  return all.filter((pos) => !plants.some((p) => p.position.x === pos.x && p.position.y === pos.y));
};

/* -----------------------------
   REDUCER
------------------------------ */

const plantReducer = (state: PlantData[], action: PlantAction): PlantData[] => {
  const now = Date.now();

  switch (action.type) {
    case 'ADD_PLANTS': {
      return [...state, ...action.plants];
    }
    // case 'CREATE':
    //   return [...state, action.plant];

    // case 'BATCH_CREATE': {
    //   // Extract amount and keep the typed plant template intact
    //   const { amount, ...plantTemplate } = action.plant;

    //   // 1. Calculate free positions from the current reducer state
    //   const freePositions = getFreePositions(state, COLS, ROWS);

    //   // 2. Shuffle available positions (Fisher-Yates / random sort)
    //   const shuffled = [...freePositions].sort(() => Math.random() - 0.5);

    //   // 3. Take only up to the available slots
    //   const countToAdd = Math.min(amount, shuffled.length);
    //   const newBatch: PlantData[] = [];

    //   for (let i = 0; i < countToAdd; i++) {
    //     newBatch.push({
    //       // Spread the template data (plant, palette, path, stage)
    //       ...plantTemplate,
    //       // Overwrite/assign unique instance data
    //       id: crypto.randomUUID(),
    //       position: shuffled[i],
    //       size: 1,
    //       mirrored: Math.random() > 0.5,
    //       createdAt: Date.now(),
    //       grownAt: null
    //     } as PlantData);
    //   }

    //   // Return existing plants plus the newly generated batch
    //   return [...state, ...newBatch];
    // }

    case 'EDIT':
      return state.map((plant) => {
        if (plant.id === action.data.id) {
          return {
            ...plant,
            ...action.data
          };
        }

        return plant;
      });

    case 'REMOVEALL':
      return [];

    case 'REMOVE':
      return state.filter((p) => p.id !== action.id);

    case 'TICKALL':
      return state.map((plant) => {
        const nextStage = getRelativePathStage(plant.stage, plant.path, 1);

        if (nextStage) {
          const finalStage = plant.path[plant.path.length - 1][0];
          const isFullyGrown = nextStage === finalStage;

          return {
            ...plant,
            stage: nextStage,
            grownAt: isFullyGrown ? now : plant.grownAt
          } as PlantData;
        }

        return plant;
      });

    default:
      return state;
  }
};

/* -----------------------------
   PROVIDER
------------------------------ */

export const PlantDataProvider = ({ children }: PlantDataProviderProps) => {
  const { debugSettings } = useDebug();
  const { addPlant } = useUserData();

  const [plants, dispatch] = useReducer(plantReducer, [], () => {
    const stored = localStorage.getValue<PlantData[]>('plants');

    // updating old data where gardenId still exists, removing the element from data
    // if (stored && stored.length > 0 && (stored[0] as Record<string, unknown>).gardenId) {
    //   const cleanedPlants = stored.map((p) => {
    //     const { gardenId, ...rest } = p as Record<string, unknown>;
    //     console.log(`[PlantDataProvider] removing gardenId (${gardenId}) from plants`);

    //     return {
    //       ...rest
    //     } as PlantData;
    //   });

    //   return cleanedPlants;
    // }

    return (stored as PlantData[]) ?? [];
  });

  /* -----------------------------
       ACTIONS
    ------------------------------ */

  const createPlant = (plantData: PlantCreationTemplate, amount: number = 1): PlantData[] => {
    // 1. Check available spaces against current garden state
    const freePositions = getFreePositions(plants, COLS, ROWS);

    if (freePositions.length === 0) {
      console.warn('Garden is full!');
      return [];
    }

    // 2. Shuffle available coordinates (no duplicate placement)
    const shuffled = [...freePositions].sort(() => Math.random() - 0.5);

    // 3. Take only up to the available slots
    const countToAdd = Math.min(amount, shuffled.length);
    const createdBatch: PlantData[] = [];

    for (let i = 0; i < countToAdd; i++) {
      createdBatch.push({
        ...plantData,
        id: crypto.randomUUID(),
        position: shuffled[i],
        size: 0.05,
        mirrored: Math.random() < 0.5,
        createdAt: Date.now(),
        grownAt: null,
        stage: plantData.stage ?? '1'
      } as PlantData);
    }

    // 4. Update unlock progress with the exact count actually planted
    addPlant(createdBatch.length, (newlyUnlocked) => {
      console.log('🎉 Newly Unlocked:', newlyUnlocked);
    });

    // 5. Dispatch the batch atomically (works for 1 or 50)
    dispatch({ type: 'ADD_PLANTS', plants: createdBatch });

    return createdBatch;
  };

  // const createPlant = (data: Omit<PlantData, 'id' | 'createdAt' | 'x' | 'y' | 'maxAge' | 'maxStage' | 'mirrored'>) => {
  //   const freePositions = getFreePositions(plants, COLS, ROWS);

  //   if (freePositions.length === 0) {
  //     // Handle full garden / no spaces available
  //     console.log('Garden is full!');
  //     return;
  //   }

  //   const randomIndex = Math.floor(Math.random() * freePositions.length);
  //   const randomFreePosition = freePositions[randomIndex];

  //   const plant = {
  //     id: crypto.randomUUID(),
  //     position: { x: randomFreePosition.x, y: randomFreePosition.y },
  //     size: 0.05,
  //     mirrored: Math.random() < 0.5,
  //     createdAt: Date.now(),
  //     plant: data.plant,
  //     stage: data.stage ?? '1',
  //     path: data.path,
  //     palette: data.palette
  //   } as PlantData;

  //   addPlant(1, (newlyUnlocked) => {
  //     console.log(newlyUnlocked);
  //   });

  //   dispatch({ type: 'CREATE', plant });

  //   return plant;
  // };

  // const createPlants = (plant: PlantData & { amount: number }) => {
  //   dispatch({ type: 'BATCH_CREATE', plant });
  // };

  const growAllPlants = () => {
    dispatch({ type: 'TICKALL' });
  };

  const editPlant = (data: PlantData) => {
    dispatch({ type: 'EDIT', data });
  };

  const removePlant = (id: string | number) => {
    dispatch({ type: 'REMOVE', id });
  };

  const savePlants = (): void => {
    localStorage.setValue('plants', plants);
  };

  useEffect(() => {
    if (!debugSettings.debug) {
      savePlants();
    } else console.log("Debug is enabled, so plants won't be saved.");
  }, [plants, debugSettings]);

  // useEffect(() => {
  // }, [plants]);

  const value: PlantDataContextType = {
    plants,
    removeAllPlants: () => dispatch({ type: 'REMOVEALL' }),
    editPlant,
    createPlant,
    // createPlants,
    removePlant,
    savePlants,
    // growPlant,
    growAllPlants
    // plantables,
    // setPlantables
  };

  return <PlantDataContext.Provider value={value}>{children}</PlantDataContext.Provider>;
};
