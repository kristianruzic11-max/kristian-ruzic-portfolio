import { type ReactNode } from "react";
import { useInView } from "../hooks/useInView";
import { useReducedMotion } from "../hooks/useReducedMotion";

type RevealProps = {
  children: ReactNode;
  as?: keyof JSX.IntrinsicElements;
  delay?: number;
  className?: string;
  /** "up" (default) fades in while rising; "none" only fades opacity. */
  variant?: "up" | "none" | "scale";
};

/**
 * Wraps content so it gently reveals as it scrolls into the viewport.
 * Respects prefers-reduced-motion by rendering content fully visible,
 * with no transform/opacity animation.
 */
export function Reveal({
  children,
  as: Tag = "div",
  delay = 0,
  className = "",
  variant = "up",
}: RevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const reducedMotion = useReducedMotion();
  const Component = Tag as unknown as "div";

  if (reducedMotion) {
    return <Component className={className}>{children}</Component>;
  }

  const base = "transition-all will-change-transform";
  const durationEasing = "duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)]";

  const hiddenState =
    variant === "none"
      ? "opacity-0"
      : variant === "scale"
      ? "opacity-0 scale-[0.96]"
      : "opacity-0 translate-y-6";

  const shownState = "opacity-100 translate-y-0 scale-100";

  return (
    <Component
      ref={ref}
      className={`${base} ${durationEasing} ${
        inView ? shownState : hiddenState
      } ${className}`}
      style={{ transitionDelay: inView ? `${delay}ms` : "0ms" }}
    >
      {children}
    </Component>
  );
}
