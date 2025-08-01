import Image from "next/image";
import { Libre_Bodoni } from "next/font/google";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";

const libreBodoni = Libre_Bodoni({
  variable: "--font-libre-bodoni",
  subsets: ["latin"],
});

const items = [
  {
    title: "Campo Grafico",
    hex: "#F4ECEA",
    id: "campo",
  },
  {
    title: "Lo Studio Boggeri",
    hex: "#D74C2F",
    id: "boggeri",
  },
  {
    title: "Max Huber",
    hex: "#D9AF01",
    id: "huber",
  },
  {
    title: "Bruno Munari",
    hex: "#6A6E71",
    id: "munari",
  },
  {
    title: "Hans Neuberg",
    hex: "#BC2729",
    id: "neuberg",
  },
];

export default function Home() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll();
  const [currentItem, setCurrentItem] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // console.log("latest", latest);
    const index = Math.floor(latest * items.length);
    setCurrentItem(index >= items.length ? items.length - 1 : index);
  });

  return (
    <div className={`${libreBodoni.className} font-sans`}>
      <main className="flex flex-col items-center" ref={ref}>
        <section className="fixed inset-x-0 top-0 h-svh">
          <div className="px-8 flex flex-col items-center justify-center gap-4 size-full">
            <h2 className="text-xl font-bold text-center w-full text-foreground bg-blend-difference">
              {items[currentItem].title}
            </h2>
            <div
              className="aspect-square size-[80vmin] max-w-[40rem]  bg-blend-difference"
              style={{ backgroundColor: items[currentItem].hex }}
            />
            <div className="h-4 border border-foreground w-[80vmin] flex relative max-w-[40rem]">
              {items.map((_, j) => (
                <Link
                  key={`item-${j}`}
                  className={`flex-1 border border-foreground relative`}
                  href={`#${items[j].id}`}
                >
                  <span className="absolute h-12 w-full -translate-1/2 top-1/2 left-1/2 any-pointer-fine:hidden" />
                </Link>
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
            id={item.id}
          />
        ))}
      </main>
    </div>
  );
}
