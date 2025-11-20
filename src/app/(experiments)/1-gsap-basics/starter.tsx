"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import { useRef } from "react";

gsap.registerPlugin(SplitText);

export default function Page() {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const split = SplitText.create(".title");

      gsap.from(split.chars, {
        autoAlpha: 0,
        y: 200,
        duration: 0.4,
        stagger: 0.03,
        ease: "power1",
      });
    },
    {
      scope: containerRef,
    }
  );


  return (
    <div className="bg-blue-300 text-black">
      <div
        ref={containerRef}
        className="bg-blue-300 text-black flex h-screen items-end justify-left overflow-hidden"
      >
        <h1 className="title font-black text-[20rem] leading-none pb-[0.1em] text-left">
          GSAP
          <br />
          tweens
        </h1>
      </div>
    </div>
  );
}
