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
    // <motion.svg className="fixed top-0 left-0 size-8" viewBox={"0 0 100 100"}>
    //   <motion.circle
    //     cx="50"
    //     cy="50"
    //     r="30"
    //     className="fill-none stroke-foreground stroke-50"
    //     style={{ pathLength: scrollYProgress }}
    //   />
    // </motion.svg>
    <motion.div
      className="fixed top-0 left-0 size-8 rounded-full rotate-90"
      style={{
        // background: "conic-gradient(black 0deg 180deg, transparent 270deg)",
        background: conic,
      }}
    />
  );
};
