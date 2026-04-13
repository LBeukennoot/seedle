import { useContext } from "react";
import { DebugContext } from "./DebugContext";

export const useDebug = () => {
  const ctx = useContext(DebugContext);
  if (!ctx) throw new Error("useDebug must be used inside DebugProvider");
  return ctx;
};
