import { createContext, ReactNode, useContext, useState } from "react";

interface MousePosition {
  x: number;
  y: number;
}

export const MousePositionContext = createContext<MousePosition>({
  x: 0,
  y: 0,
});

// export const useMousePosition =
