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
  const ref = useRef(null);
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
      <main className="flex flex-col items-center" ref={ref}>
        <section className="fixed inset-x-0 top-0 h-svh">
          <div className="px-8 flex flex-col items-center justify-center gap-4 size-full">
            <h2 className="text-xl font-bold text-center w-full text-foreground bg-blend-difference">
              {data[currentItem].title}
            </h2>
            <Link href={data[currentItem].slug}>
              <motion.span
                className="block aspect-square size-[80vmin] max-w-[40rem] bg-blend-difference"
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
        </section>
        {data.map((item, i) => (
          <section
            key={`section--${i}`}
            className="w-full h-lvh min-h-[36rem]"
            id={item.slug}
          />
        ))}
      </main>
    </div>
  );
}

export async function getStaticProps() {
  const data = getSortedSpreadsData();
  return {
    props: { data },
  };
}
