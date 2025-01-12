import { createSignal, onMount, onCleanup } from "solid-js";
import type { Component } from "solid-js";

const CustomCursor: Component = () => {
  const [position, setPosition] = createSignal({ x: 0, y: 0 });
  const [isClicking, setIsClicking] = createSignal(false);

  // Debounced mouse move handler
  let moveTimeout: number;
  const handleMouseMove = (e: MouseEvent) => {
    if (moveTimeout) {
      cancelAnimationFrame(moveTimeout);
    }

    moveTimeout = requestAnimationFrame(() => {
      setPosition({ x: e.clientX, y: e.clientY });
    });
  };

  onMount(() => {
    // Only hide cursor on non-interactive elements

    let style: HTMLStyleElement;

    if (document.head.querySelector("style[" + "data-cursor" + "]")) {
      style = document.head.querySelector(
        "style[" + "data-cursor" + "]"
      ) as HTMLStyleElement;
    } else {
      style = document.createElement("style");
      style.setAttribute("data-cursor", "");
    }

    style.textContent = `
      * {
        cursor: none !important;
      }
    `;
    document.head.appendChild(style);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", () => setIsClicking(true));
    window.addEventListener("mouseup", () => setIsClicking(false));
  });

  onCleanup(() => {
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mousedown", () => setIsClicking(true));
    window.removeEventListener("mouseup", () => setIsClicking(false));
    if (moveTimeout) {
      cancelAnimationFrame(moveTimeout);
    }
  });

  return (
    <div
      class="absolute w-4 h-4 z-50 -mt-2 -ml-2 rounded-full bg-accent-1 mix-blend-difference transition-transform duration-100"
      style={{
        scale: isClicking() ? 0.8 : 1,
        top: `${position().y + 8}px`,
        left: `${position().x - 8}px`,
      }}
    />
  );
};

export { CustomCursor };
