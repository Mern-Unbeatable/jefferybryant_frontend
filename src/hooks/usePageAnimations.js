import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const REVEAL_SELECTOR = [
  "h1",
  "h2",
  "h3",
  "p",
  "a",
  "button",
  "form",
  "table",
  "li",
  "img:not(.absolute)",
  ".grid:not(.container) > *",
].join(", ");

// Only the outermost match animates, so nested text inside a card moves with its card.
const getRevealTargets = (scope) => {
  const matches = new Set(
    [...scope.querySelectorAll("section")].flatMap((section) => [
      ...section.querySelectorAll(REVEAL_SELECTOR),
    ])
  );

  return [...matches].filter((el) => {
    for (let parent = el.parentElement; parent && parent !== scope; parent = parent.parentElement) {
      if (matches.has(parent)) return false;
    }
    return true;
  });
};

export const usePageAnimations = (scope, pathname) => {
  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const heroImage = scope.current.querySelector("section img.absolute");
        if (heroImage) {
          gsap.from(heroImage, { scale: 1.08, duration: 1.6, ease: "power2.out" });
        }

        const targets = getRevealTargets(scope.current);
        gsap.set(targets, { autoAlpha: 0, y: 28, transition: "none" });

        ScrollTrigger.batch(targets, {
          start: "top 92%",
          once: true,
          onEnter: (batch) =>
            gsap.to(batch, {
              autoAlpha: 1,
              y: 0,
              duration: 0.8,
              ease: "power3.out",
              stagger: 0.08,
              overwrite: true,
              clearProps: "opacity,visibility,transform,transition",
            }),
        });
      });
    },
    { scope, dependencies: [pathname], revertOnUpdate: true }
  );
};
