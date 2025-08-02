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
          className="fixed inset-x-0 top-0 h-svh -z-1 origin-top"
          layoutRoot
          layout
        >
          <motion.div
            layoutId="test"
            className="size-full"
            style={{ backgroundColor: spreadData.hex }}
          />
        </motion.div>
        <motion.div
          className="w-full flex items-center justify-center"
          layoutId="title"
          layout="position"
        >
          <motion.h2 className="text-xl text-center font-bold">
            {spreadData.title}
          </motion.h2>
        </motion.div>
        <Link href="/" className="mix-blend-difference">
          Back to home
        </Link>
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
