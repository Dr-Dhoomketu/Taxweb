"use client"

import { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";

export function CustomCursor() {
  const prefersReducedMotion = useReducedMotion();
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const checkTouch = () => {
      setIsTouch(window.matchMedia("(pointer: coarse)").matches);
    };
    checkTouch();
    window.addEventListener("resize", checkTouch);

    const onMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = target.closest("a, button, input, select, textarea, [role='button'], [tabindex]");
      setIsHovering(!!isInteractive);
    };

    if (!isTouch) {
      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseover", onMouseOver);
    }

    return () => {
      window.removeEventListener("resize", checkTouch);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", onMouseOver);
    };
  }, [prefersReducedMotion, isTouch]);

  if (isTouch || prefersReducedMotion) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 w-3 h-3 rounded-full pointer-events-none z-[100] mix-blend-multiply"
      animate={{
        x: mousePos.x - 6,
        y: mousePos.y - 6,
        scale: isHovering ? 2 : 1,
        backgroundColor: isHovering ? "hsl(var(--secondary))" : "hsl(var(--primary))",
        opacity: isHovering ? 0.3 : 0.15
      }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 28,
        mass: 0.5
      }}
    />
  );
}
