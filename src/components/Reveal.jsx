import { motion } from "framer-motion";

function Reveal({
  children,
  delay = 0,
  y = 36,
  x = 0,
  scale = 1,
  blur = true,
  className = "",
  once = true,
  amount = 0.15,
}) {
  return (
    <motion.div
      className={className}
      initial={{
        opacity: 0,
        y,
        x,
        scale,
        filter: blur ? "blur(8px)" : "blur(0px)",
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        x: 0,
        scale: 1,
        filter: "blur(0px)",
      }}
      viewport={{ once, amount }}
      transition={{
        duration: 0.75,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

export default Reveal;