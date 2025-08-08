import { motion, MotionValue, useTransform } from "motion/react";
import { Fragment, useContext } from "react";
import { MousePositionContext } from "@/context/MousePosition/MousePosition";

export const ScrollIndicator = ({
  scrollYProgress,
}: {
  scrollYProgress: MotionValue;
}) => {
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1.01]);
  const mousePosition = useContext(MousePositionContext);
  return (
    <Fragment>
      <div className="fixed top-0 left-0 p-4">
        <div>{`${mousePosition.position.x}, ${mousePosition.position.y}`}</div>
      </div>
      <div className="fixed top-0 right-0 p-4">
        {mousePosition.clicks.map((click, index) => (
          <div key={index} className="text-sm">
            {`Click ${index + 1}: ${click.x}, ${click.y}`}
          </div>
        ))}
      </div>
      <div className="fixed bottom-0 inset-x-0 flex justify-center mb-4">
        <motion.svg
          className="size-12 bg-background"
          viewBox={"0 0 64 64"}
          whileTap={{ scale: 4, y: "-150%" }}
          whileHover={{ scale: 4, y: "-150%" }}
        >
          <motion.circle
            cx="32"
            cy="32"
            r="16"
            style={{
              pathLength: pathLength,
              fill: "none",
              stroke: "var(--foreground)",
              strokeWidth: 32,
            }}
          />
        </motion.svg>
      </div>
    </Fragment>
  );
};
