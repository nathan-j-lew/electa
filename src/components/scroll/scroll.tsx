import {
  // animate,
  motion,
  MotionValue,
  useAnimate,
  useMotionValue,
  useMotionValueEvent,
  useSpring,
  useTransform,
} from "motion/react";
import {
  Fragment,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { MousePositionContext } from "@/context/MousePosition/MousePosition";

export const ScrollIndicator = ({
  scrollYProgress,
}: {
  scrollYProgress: MotionValue;
}) => {
  const [dialPos, setDialPos] = useState({ x: 0, y: 0 });

  const [scope, animate] = useAnimate();
  const scale = useMotionValue(1);
  const y = useMotionValue("0%");

  // const ref = useRef<SVGSVGElement>(null);
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1.01]);
  const mousePosition = useContext(MousePositionContext);

  const updateDialPosition = () => {
    if (scope.current) {
      setDialPos({
        x:
          scope.current.getBoundingClientRect().left +
          (scale.get() * scope.current.clientWidth) / 2,
        y:
          scope.current.getBoundingClientRect().top +
          (scale.get() * scope.current.clientHeight) / 2,
      });
    }
  };
  useEffect(() => {
    console.log(scope.current);
    updateDialPosition();
  }, [scope.current]);

  useMotionValueEvent(scale, "change", () => {
    updateDialPosition();
  });
  useMotionValueEvent(scale, "animationComplete", () => {
    updateDialPosition();
  });

  useEffect(() => {
    window.addEventListener("resize", updateDialPosition);
    return () => {
      window.removeEventListener("resize", updateDialPosition);
    };
  });

  const dot = useMemo(() => {
    const trunc = (num: number) => Math.trunc(num * 1000) / 1000;

    const vec1 = {
      x: (mousePosition.clicked.x ?? 0) - dialPos.x,
      y: (mousePosition.clicked.y ?? 0) - dialPos.y,
    };
    const vec2 = {
      x: mousePosition.position.x - dialPos.x,
      y: mousePosition.position.y - dialPos.y,
    };
    const numerator = trunc(vec1.x * vec2.x + vec1.y * vec2.y);
    const denominator = trunc(
      Math.hypot(vec1.x, vec1.y) * Math.hypot(vec2.x, vec2.y)
    );
    const dotProduct = trunc(numerator / denominator);
    console.log(Math.hypot(vec1.x, vec1.y), Math.hypot(vec2.x, vec2.y));
    return {
      dot: dotProduct,
      angle: Math.acos(dotProduct),
    };
  }, [mousePosition.clicked, mousePosition.position, dialPos]);

  return (
    <Fragment>
      <div className="fixed top-0 left-0 p-4">
        <div>{`${mousePosition.position.x}, ${mousePosition.position.y}`}</div>
      </div>
      <div className="fixed top-0 right-0 p-4">
        <p>Dial position: {`${dialPos.x}, ${dialPos.y}`}</p>
        <p>{`${mousePosition.clicked.x}, ${mousePosition.clicked.y}`}</p>
        <p>
          D:{" "}
          {mousePosition.clicked.x !== null &&
            mousePosition.position.x - mousePosition.clicked.x}
          ,{" "}
          {mousePosition.clicked.y !== null &&
            mousePosition.position.y - mousePosition.clicked.y}
        </p>
        <p>
          R1:{" "}
          {mousePosition.clicked.x !== null &&
            mousePosition.clicked.x - dialPos.x}
          ,{" "}
          {mousePosition.clicked.y !== null &&
            mousePosition.clicked.y - dialPos.y}
          ,{" "}
          {mousePosition.clicked.x !== null &&
            mousePosition.clicked.y !== null &&
            Math.hypot(
              mousePosition.clicked.x - dialPos.x,
              mousePosition.clicked.y - dialPos.y
            )}
        </p>
        <p>
          R2:{" "}
          {mousePosition.clicked.x !== null &&
            mousePosition.position.x - dialPos.x}
          ,{" "}
          {mousePosition.clicked.y !== null &&
            mousePosition.position.y - dialPos.y}
          ,{" "}
          {mousePosition.clicked.x !== null &&
            mousePosition.clicked.y !== null &&
            Math.hypot(
              mousePosition.position.x - dialPos.x,
              mousePosition.position.y - dialPos.y
            )}
        </p>
        <p>{dot.dot}</p>
        <p>{dot.angle}</p>
      </div>
      <div className="fixed bottom-0 inset-x-0 flex justify-center mb-4">
        <motion.svg
          className="size-12"
          viewBox={"0 0 64 64"}
          id="scroll-bounds"
          style={{
            scale,
            y,
          }}
          onHoverStart={() => {
            animate(
              scope.current,
              { scale: 4, y: "-150%" },
              { duration: 0.1, ease: "easeOut" }
            );
          }}
          onHoverEnd={() => {
            animate(
              scope.current,
              { scale: 1, y: "0%" },
              { duration: 0.1, ease: "easeOut" }
            );
          }}
          ref={scope}
        >
          <motion.circle
            cx="32"
            cy="32"
            r="32"
            style={{
              fill: "var(--foreground)",
              opacity: 0.1,
            }}
          />
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
          <motion.circle
            cx="32"
            cy="32"
            r="30"
            style={{
              pathLength: dot ? dot.angle : 0,
              fill: "none",
              stroke: "red",
              strokeWidth: 4,
            }}
          />
          <motion.circle
            cx="32"
            cy="32"
            r="2"
            style={{
              fill: "blue",
            }}
          />
        </motion.svg>
      </div>
    </Fragment>
  );
};
