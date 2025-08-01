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

export default function Page() {
  return (
    <div className={`${libreBodoni.className} font-sans`}>
      <main className="flex flex-col items-center">
        <h2 className="text-xl font-bold">A hidden page</h2>
      </main>
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
