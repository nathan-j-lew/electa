import Image from "next/image";
import { Libre_Bodoni } from "next/font/google";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { getSortedSpreadsData } from "@/lib/spreads";

const libreBodoni = Libre_Bodoni({
  variable: "--font-libre-bodoni",
  subsets: ["latin"],
});

export default function Home({
  data,
}: {
  data: { title: string; hex: string; slug: string }[];
}) {
  const { scrollYProgress } = useScroll();
  const [currentItem, setCurrentItem] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // console.log("latest", latest);
    const index = Math.floor(latest * data.length);
    setCurrentItem(index >= data.length ? data.length - 1 : index);
  });
  console.log("data", data);

  return (
    <div className={`${libreBodoni.className} font-sans`}>
      <motion.main className="flex flex-col items-center relative">
        <motion.section
          className="fixed inset-x-0 top-0 h-svh"
          layoutRoot
          layout
        >
          <div className="px-8 flex flex-col items-center justify-center gap-4 size-full">
            <motion.div
              className="w-full flex items-center justify-center"
              layoutId="title"
              layout="position"
            >
              <motion.h2 className="text-xl font-bold text-center text-foreground ">
                {data[currentItem].title}
              </motion.h2>
            </motion.div>
            <Link
              href={data[currentItem].slug}
              onClick={() => {
                window.scroll(0, 0);
              }}
            >
              <motion.span
                className="block aspect-square size-[80vmin] max-w-[40rem] max-h-[40rem] bg-blend-difference"
                style={{ backgroundColor: data[currentItem].hex }}
                layoutId="test"
              />
            </Link>
            <div className="h-4 border border-foreground w-[80vmin] flex relative max-w-[40rem]">
              {data.map((_, j) => (
                <Link
                  key={`item-${j}`}
                  className={`flex-1 border border-foreground relative`}
                  href={`#${data[j].slug}`}
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
        </motion.section>
        {data.map((item, i) => (
          <section
            key={`section--${i}`}
            className="w-full h-lvh min-h-[36rem]"
            id={item.slug}
          />
        ))}
      </motion.main>
    </div>
  );
}

export async function getStaticProps() {
  const data = getSortedSpreadsData();
  return {
    props: { data },
  };
}
