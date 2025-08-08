import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { MousePositionContext } from "@/context/MousePosition/MousePosition";
import { useState, useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [clicks, setClicks] = useState<{ x: number; y: number }[]>([]);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", updateMousePosition);
    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      setClicks((prevClicks) => [
        ...prevClicks,
        { x: e.clientX, y: e.clientY },
      ]);
    };
    window.addEventListener("mousedown", handleClick);
    return () => {
      window.removeEventListener("mousedown", handleClick);
    };
  }, []);

  return (
    <MousePositionContext value={{ position: mousePosition, clicks: clicks }}>
      <Component {...pageProps} />
    </MousePositionContext>
  );
}
