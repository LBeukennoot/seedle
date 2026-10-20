import type { PictureInPictureContextType } from "./types";
import { createAppContext } from "../createAppContext";

export const { Context: PictureInPictureContext, useAppContext: usePictureInPicture } =
    createAppContext<PictureInPictureContextType>();