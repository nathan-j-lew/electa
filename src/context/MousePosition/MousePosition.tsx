import { createContext } from "react";

interface MouseInfo {
  position: { x: number; y: number };
  clicks: { x: number; y: number }[];
}

export const MousePositionContext = createContext<MouseInfo>({
  position: { x: 0, y: 0 },
  clicks: [],
});
