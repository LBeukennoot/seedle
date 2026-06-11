import { useEffect, useReducer } from 'react';
import LocalStorage from '../../utils/LocalStorage';
import { type Plant } from '../../components/PlantElement/types';
import { getRandomGardenAndPosition } from '../../navigation/Navigation';
import { useDebug } from '../Debug';
import type { PlantDataContextType, PlantDataProviderProps } from './types';
import { PlantDataContext } from './PlantDataContext';

const localStorage = new LocalStorage();

/* -----------------------------
   TYPES
------------------------------ */

type PlantAction =
  | { type: 'CREATE'; plant: Plant }
  | { type: 'EDIT'; data: Plant }
  | { type: 'REMOVEALL' }
  | { type: 'REMOVE'; id: string | number }
  | { type: 'TICK'; id: string };

/* -----------------------------
   REDUCER
------------------------------ */

const plantReducer = (state: Plant[], action: PlantAction): Plant[] => {
  const now = Date.now();

  switch (action.type) {
    case 'CREATE':
      return [...state, action.plant];

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

    case 'TICK':
      return state
        .filter((p) => {
          // const isOld = p.createdAt < now - 30 * 1000 // 30 seconds
          const isOld = p.createdAt < now - p.maxAge * 24 * 60 * 60 * 1000; // 4 days (or maxAge)
          // const selectedPlant = p.id === action.id;

          const isFullyGrown = p.stage === p.maxStage;

          // ❗ remove ONLY if BOTH conditions are true
          return !(isOld && isFullyGrown);
        })
        .map((p) => {
          if (p.id === action.id && p.stage < p.maxStage) {
            const newStage = p.stage + 1;

            return {
              ...p,
              stage: newStage,
              grownAt: newStage === p.maxStage ? now : p.grownAt
            };
          }

          return p;
        });

    default:
      return state;
  }
};

/* -----------------------------
   LOCAL STORAGE HOOK
------------------------------ */

// function useLocalStorageState<T>(key: string, initial: T) {
//     const [state, setState] = useState<T>(() => {
//         const stored = localStorage.getValue(key)
//         return (stored as T) ?? initial
//     })

//     useEffect(() => {
//         localStorage.setValue(key, state)
//     }, [key, state])

//     return [state, setState] as const
// }

/* -----------------------------
   PROVIDER
------------------------------ */

export const PlantDataProvider = ({ children }: PlantDataProviderProps) => {
  // const [nextId, setNextId] = useLocalStorageState<number>("nextId", 0)
  const { debugSettings } = useDebug();

  const [plants, dispatch] = useReducer(plantReducer, [], () => {
    const stored = localStorage.getValue<Plant[]>('plants');

    if (stored && stored.length > 0 && (stored[0] as Record<string, unknown>).gardenId) {
      const cleanedPlants = stored.map((p) => {
        // 1. Cast to Record so TS allows you to see 'gardenId'
        // 2. Use destructuring to pull gardenId out, and collect the 'rest'
        const { gardenId, ...rest } = p as Record<string, unknown>;

        // 3. Return the rest of the object cast back to your clean Plant type
        const random = getRandomGardenAndPosition(stored);

        return {
          ...rest
          // x: random.x,
          // y: random.y
        } as Plant;
      });

      return cleanedPlants;
    }

    return (stored as Plant[]) ?? [];
  });

  /* -----------------------------
       PERSISTENCE
    ------------------------------ */

  /* -----------------------------
       EVENT SYSTEM
    ------------------------------ */

  /* -----------------------------
       ACTIONS
    ------------------------------ */

  const createPlant = (data: Omit<Plant, 'id' | 'createdAt'>) => {
    const random = getRandomGardenAndPosition(plants);
    // TODO let users choose a location

    const plant: Plant = {
      id: crypto.randomUUID(),
      // gardenId: random.gardenId,
      x: random.x,
      y: random.y,
      size: data.size,
      name: data.name,
      stage: data.stage ?? 1,
      maxStage: data.maxStage ?? 4,
      createdAt: Date.now(),
      maxAge: data.maxAge,
      mirrored: Math.random() < 0.5
    };

    dispatch({ type: 'CREATE', plant });

    return plant;
  };

  const growPlant = (plantId: string) => {
    dispatch({ type: 'TICK', id: plantId });
  };

  const editPlant = (plantId: string, data: Plant) => {
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
  //   function handleEventListener(e) {
  //     console.log('[PlantDataProvider] plantClicked received');

  //     tickPlant(e.detail.plantId);
  //     // dispatch({ type: 'TICK' });
  //   }

  //   window.addEventListener('plantClicked', handleEventListener);

  //   return () => {
  //     window.removeEventListener('plantClicked', handleEventListener);
  //   };
  // }, []);

  const value: PlantDataContextType = {
    plants,
    setPlants: () => {
      console.log('[setPlants] not yet implemented');
    }, // optional: remove if not needed
    removeAllPlants: () => dispatch({ type: 'REMOVEALL' }),
    editPlant,
    createPlant,
    removePlant,
    savePlants,
    growPlant
  };

  return <PlantDataContext.Provider value={value}>{children}</PlantDataContext.Provider>;
};

// import { useEffect, useState } from "react"
// import { UserDataContext } from "./UserDataContext"
// import LocalStorage from "../../utils/LocalStorage"
// import type { UserData, UserDataProviderProps } from "./types"
// import { type Plant, Plants } from "../../components/PlantElement/types"
// import { getRandomGardenAndPosition } from "../../navigation/Navigation"
// const localStorage = new LocalStorage()

// function useLocalStorageState<T>(key: string, initial: T) {
//     //@ts-ignore
//     const [state, setState] = useState<T>(() => {
//         const stored = localStorage.getValue(key)
//         return (stored as T) ?? initial
//     })

//     useEffect(() => {
//         console.log('changed!')
//         localStorage.setValue(key, state)
//     }, [key, state])

//     return [state, setState] as const
// }

// export const UserDataProvider = ({ children }: UserDataProviderProps) => {

//     // const initialPlants = (): Plant[] => {
//     //     console.log('initial value')
//     //     const plants = localStorage.getValue('plants')
//     //     if (!plants) return []
//     //     // @ts-ignore
//     //     return plants
//     // }

//     const [plants, setPlants] = useLocalStorageState<Plant[]>('plants', [])
//     const [nextId, setNextId] = useLocalStorageState<number>('nextId', 0)

//     // useEffect(() => {
//     //     const localStoragePlants = localStorage.getValue('plants')
//     //     if (!localStoragePlants) return
//     //     console.log(localStoragePlants)
//     //     // @ts-ignore
//     //     setPlants(localStoragePlants)
//     // }, [])

//     // const growPlant = (plantId: number) => {
//     //     setPlants(prev =>
//     //         prev
//     //             .map(p => {
//     //                 if (p.id !== plantId) return p

//     //                 if (p.stage >= p.maxStage) return p

//     //                 const newStage = p.stage + 1

//     //                 return {
//     //                     ...p,
//     //                     stage: newStage,
//     //                     grownAt: newStage === p.maxStage ? Date.now() : p.grownAt
//     //                 }
//     //             })
//     //             .filter(p => p !== null)
//     //     )
//     // }

//     // const growPlant = (plant: Plant) => {
//     //     if (plant.stage < plant.maxStage) {
//     //         plant.stage = plant.stage + 1

//     //         if (plant.stage === plant.maxStage) {
//     //             plant.grownAt = new Date(Date.now()).getTime()
//     //         }

//     //         //checking if the plant is older than 4 days
//     //     } else if (plant.createdAt < new Date(Date.now() - 60 * 1000).getTime()) {
//     //         // } else if (plant.createdAt < new Date(Date.now() - plant.maxAge * 24 * 60 * 60 * 1000).getTime()) {
//     //         // console.log(`${plant.id} expired`)
//     //         removePlant(plant)
//     //     }

//     // }

//     // const updatePlant = ({
//     //     id,
//     //     updates,
//     // }: {
//     //     id: string | number
//     //     updates: Partial<Plant>
//     // }) => {
//     //     setPlants(prev =>
//     //         prev.map(plant =>
//     //             plant.id === id
//     //                 ? { ...plant, ...updates }
//     //                 : plant
//     //         )
//     //     )
//     // }

//     const removePlant = (id: string | number) => {
//         setPlants(prev =>
//             prev.filter(p => p.id !== id)
//         )
//     }

//     const createPlant = (data: Plant) => {
//         const random = getRandomGardenAndPosition(plants)
//         const createdAt = new Date(Date.now()).getTime()

//         setNextId(prev => {
//             console.log(prev, prev + 1)
//             return prev + 1
//         })
//         const id = nextId

//         const plant: Plant = {
//             id: id,
//             gardenId: random.gardenId,
//             x: random.x,
//             y: random.y,
//             size: data.size,
//             name: data.name,
//             stage: data.stage,
//             maxStage: 4,
//             // maxStage: data.maxStage,
//             createdAt: createdAt,
//             maxAge: data.maxAge,
//         }

//         // return { id, gardenId, x, y, size, name, stage }
//         return plant
//     }

//     useEffect(() => {
//         localStorage.setValue('plants', plants)
//         console.log(localStorage.getValue('plants'))
//     }, [plants])

//     useEffect(() => {
//         function handleEventListener() {
//             console.log("[UserDataProvider] sessionFocusComplete received")

//             setPlants(prev => {
//                 const now = Date.now()

//                 return prev
//                     .map(p => {
//                         // 🌱 grow
//                         if (p.stage < p.maxStage) {
//                             const newStage = p.stage + 1

//                             return {
//                                 ...p,
//                                 stage: newStage,
//                                 grownAt:
//                                     newStage === p.maxStage
//                                         ? now
//                                         : p.grownAt,
//                             }
//                         }

//                         return p
//                     })
//                     .filter(p => {
//                         const isOld = p.createdAt < now - 60 * 1000
//                         const isFullyGrown = p.stage === p.maxStage

//                         // ❗ remove ONLY if BOTH are true
//                         return !(isOld && isFullyGrown)
//                     })
//             })
//         }

//         window.addEventListener("sessionFocusComplete", handleEventListener)

//         return () => {
//             window.removeEventListener("sessionFocusComplete", handleEventListener)
//         }
//     }, [])

//     const value: UserData = {
//         plants,
//         setPlants,
//         createPlant,
//         // updatePlant
//     }

//     return (
//         <UserDataContext.Provider value={value}>
//             {children}
//         </UserDataContext.Provider>
//     )
// }
