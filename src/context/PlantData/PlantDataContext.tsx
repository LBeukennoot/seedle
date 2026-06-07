import type { PlantDataContextType } from "./types";
import { createAppContext } from "../createAppContext";

export const { Context: PlantDataContext, useAppContext: usePlantData } =
    createAppContext<PlantDataContextType>();