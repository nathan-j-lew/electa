import Image from "next/image";
import { Libre_Bodoni } from "next/font/google";
import { motion } from "motion/react";

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
  return (
    <div className={`${libreBodoni.className} font-sans`}>
      <main className="flex flex-col items-center ">
        {items.map((item, i) => (
          <section key={`section--${i}`} className="w-full h-lvh">
            <div className="px-8 flex flex-col items-center justify-center gap-4 size-full">
              <h2 className="text-xl font-bold">{item.title}</h2>
              <div
                className="aspect-square w-full max-w-[40rem]"
                style={{ backgroundColor: item.hex }}
              />
              <div className="h-4 border border-foreground w-full flex relative">
                {Array.from({ length: items.length }).map((_, j) => (
                  <div
                    key={`item-${j}`}
                    className={`flex-1 border border-foreground`}
                  />
                ))}
                <motion.div className={`bg-foreground absolute h-full w-1/5`} />
              </div>
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}
