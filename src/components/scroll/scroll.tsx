import {
  motion,
  MotionValue,
  useMotionTemplate,
  useTransform,
} from "motion/react";

export const ScrollIndicator = ({
  scrollYProgress,
}: {
  scrollYProgress: MotionValue;
}) => {
  const convertToDegrees = useTransform(() => scrollYProgress.get() * 360);
  const conic = useMotionTemplate`conic-gradient(black 0deg ${convertToDegrees}deg, transparent ${convertToDegrees}deg)`;
  return (
    <motion.svg className="fixed top-0 left-0 size-8" viewBox={"0 0 64 64"}>
      <motion.circle
        cx="32"
        cy="32"
        r="16"
        style={{
          pathLength: scrollYProgress,
          fill: "none",
          stroke: "var(--foreground)",
          strokeWidth: 32,
        }}
      />
    </motion.svg>
    // <motion.div
    //   className="fixed top-0 left-0 size-8 rounded-full rotate-90"
    //   style={{
    //     // background: "conic-gradient(black 0deg 180deg, transparent 270deg)",
    //     background: conic,
    //   }}
    // />
  );
};
