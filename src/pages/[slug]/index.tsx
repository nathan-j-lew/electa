import Image from "next/image";
import { Libre_Bodoni } from "next/font/google";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { getSpreadData, getSpreadSlugs } from "@/lib/spreads";

const libreBodoni = Libre_Bodoni({
  variable: "--font-libre-bodoni",
  subsets: ["latin"],
});

export default function Page({
  spreadData,
}: {
  spreadData: {
    title: string;
    hex: string;
    slug: string;
  };
}) {
  console.log("spreadData", spreadData.title);
  return (
    <div className={`${libreBodoni.className} font-sans`}>
      <motion.main className="flex flex-col items-center relative">
        <motion.div
          className="fixed inset-x-0 h-svh -z-1"
          layout
          layoutId="background"
          style={{
            backgroundColor: spreadData.hex,
          }}
        />
        <motion.div
          className="w-full flex items-center justify-center "
          layoutId="title"
          layout="position"
        >
          <motion.h2
            className="text-xl font-bold text-center text-foreground"
            // layoutId="title-text"
            // layout="position"
          >
            {spreadData.title}
          </motion.h2>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed top-8 left-8 z-10 text-foreground text-sm bg-background"
        >
          <Link href="/" className="mix-blend-difference">
            Back to home
          </Link>
        </motion.div>
      </motion.main>
    </div>
  );
}

export async function getStaticPaths() {
  const paths = getSpreadSlugs();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  const spreadData = getSpreadData(params.slug);
  return {
    props: {
      spreadData,
    },
  };
}
