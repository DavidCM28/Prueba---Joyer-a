"use client";

import { ArrowDown, ArrowUp } from "@phosphor-icons/react";
import { useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import { useState } from "react";

export default function ScrollJewel() {
  const { scrollY, scrollYProgress } = useScroll();
  const reduceMotion = useReducedMotion();
  const [progress, setProgress] = useState(0);
  const [canReturn, setCanReturn] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", value => setProgress(Math.round(value * 100)));
  useMotionValueEvent(scrollY, "change", value => setCanReturn(value > 120));

  function navigate() {
    const behavior = reduceMotion ? "instant" : "smooth";
    if (canReturn) {
      window.scrollTo({ top: 0, behavior });
    } else {
      document.getElementById("piezas")?.scrollIntoView({ behavior });
    }
  }

  return <button className="scroll-jewel" type="button" onClick={navigate}
    aria-label={canReturn ? "Volver arriba" : "Desplazarse para ver las piezas"}
    title={canReturn ? "Volver arriba" : "Ver piezas"}>
    <svg className="scroll-jewel-chain" width="44" height="78" viewBox="0 0 44 78" fill="none" aria-hidden="true">
      {Array.from({ length: 7 }, (_, index) => <rect key={index}
        x={index % 2 ? 18 : 15} y={index * 9 + 2} width={index % 2 ? 8 : 14} height="17" rx="7"
        className={progress >= (index + 1) / 7 * 100 ? "is-filled" : undefined} />)}
    </svg>
    <span className="scroll-jewel-pendant" aria-hidden="true">
      <svg className="scroll-jewel-gem" width="54" height="54" viewBox="0 0 54 54" fill="none">
        <path d="M16 5H38L50 21L27 49L4 21Z" />
        <path className="scroll-jewel-facets" d="M4 21H50M16 5L12 21L27 49L42 21L38 5M16 5L27 21L38 5" />
      </svg>
    </span>
    <span className="scroll-jewel-arrow" aria-hidden="true">{canReturn ? <ArrowUp size={18} weight="bold" /> : <ArrowDown size={18} weight="bold" />}</span>
    <span className="scroll-jewel-label" aria-hidden="true">{canReturn ? "SUBIR" : "EXPLORA"}</span>
    <span className="scroll-jewel-progress" aria-hidden="true">{progress}%</span>
  </button>;
}
