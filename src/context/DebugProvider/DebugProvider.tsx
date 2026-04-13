import URLParams from "../../utils/URLParams";
import { DebugContext } from "./DebugContext";

export const DebugProvider = ({ children }: { children: React.ReactNode }) => {
  const urlParams = new URLParams

  // const getBooleanFromString = (string: string) => {
  //   return typeof urlParams.getParam('debug') === 'boolean' ? urlParams.getParam('debug') as boolean : false
  // }

  const value = {
    debugMode: typeof urlParams.getParam('debug') === 'boolean' ? urlParams.getParam('debug') as boolean : false,
    backgroundAnimatedDebug: typeof urlParams.getParam('bgAnimated') === 'boolean' ? urlParams.getParam('bgAnimated') === 'true' : undefined,
  };

  return (
    <DebugContext.Provider value={value}>
      {children}
    </DebugContext.Provider>
  );
};
