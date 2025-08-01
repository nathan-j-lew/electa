import Image from "next/image";
import { Libre_Bodoni } from "next/font/google";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";

const libreBodoni = Libre_Bodoni({
  variable: "--font-libre-bodoni",
  subsets: ["latin"],
});

const items = [
  {
    title: "Campo Grafico",
    hex: "#F4ECEA",
  },
  {
    title: "Lo Studio Boggeri",
    hex: "#D74C2F",
  },
  {
    title: "Max Huber",
    hex: "#D9AF01",
  },
  {
    title: "Bruno Munari",
    hex: "#6A6E71",
  },
  {
    title: "Hans Neuberg",
    hex: "#BC2729",
  },
];

export default function Home() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll();
  const [currentItem, setCurrentItem] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const index = Math.floor(latest * items.length);
    if (index >= items.length) return;
    setCurrentItem(index);
  });

  return (
    <div className={`${libreBodoni.className} font-sans`}>
      <main className="flex flex-col items-center" ref={ref}>
        <motion.div
          style={{ scale: scrollYProgress }}
          className="bg-blue-500 size-8 rounded-full fixed top-4 left-4 z-50"
        />
        <section className="fixed inset-0 h-lvh">
          <div className="px-8 flex flex-col items-center justify-center gap-4 size-full">
            <h2 className="text-xl font-bold text-center w-full text-white bg-blend-difference">
              {items[currentItem].title}
            </h2>
            <div
              className="aspect-square size-[80vmin] max-w-[40rem]  bg-blend-difference"
              style={{ backgroundColor: items[currentItem].hex }}
            />
            <div className="h-4 border border-foreground w-[80vmin] flex relative max-w-[40rem]">
              {Array.from({ length: items.length }).map((_, j) => (
                <div
                  key={`item-${j}`}
                  className={`flex-1 border border-foreground`}
                />
              ))}
              <motion.div
                className={`bg-foreground absolute h-full w-1/5`}
                style={{ x: currentItem * 100 + "%" }}
              />
            </div>
          </div>
        </section>
        {items.map((item, i) => (
          <section
            key={`section--${i}`}
            className="w-full h-lvh min-h-[36rem]"
            // style={{ backgroundColor: item.hex }}
          />
        ))}
      </main>
    </div>
  );
}
