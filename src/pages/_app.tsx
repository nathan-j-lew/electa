import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { MousePositionContext } from "@/context/useMousePosition/useMousePosition";
import { useState, useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", updateMousePosition);
    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, []);

  return (
    <MousePositionContext value={mousePosition}>
      <Component {...pageProps} />
    </MousePositionContext>
  );
}
