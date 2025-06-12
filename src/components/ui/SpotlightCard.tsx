import React, { useRef, useState, ReactNode, MouseEvent, FocusEvent } from "react";

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  spotlightColor?: string;
}

const SpotlightCard: React.FC<SpotlightCardProps> = ({
  children,
  className = "", 
  spotlightColor = "rgba(159, 90, 253, 0.4)",
}) => {
  const divRef = useRef<HTMLDivElement | null>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>): void => {
    if (!divRef.current || isFocused) return;

    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocus = (e: FocusEvent<HTMLDivElement | HTMLInputElement>): void => {
    if (!divRef.current) return;

    setIsFocused(true);
    const rect = divRef.current.getBoundingClientRect();
    const elementRect = (e.target as HTMLElement).getBoundingClientRect();

    setPosition({
      x: elementRect.left - rect.left + elementRect.width / 2,
      y: elementRect.top - rect.top + elementRect.height / 2,
    });
    setOpacity(0.6);
  };

  const handleBlur = (): void => {
    setIsFocused(false);
    setOpacity(0);
  };

  const handleMouseEnter = (): void => {
    if (!isFocused) setOpacity(0.6);
  };

  const handleMouseLeave = (): void => {
    if (!isFocused) setOpacity(0);
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative rounded-3xl border border-neutral-800 bg-transparent backdrop-blur-sm overflow-hidden p-8 ${className}`}
      tabIndex={-1} // To make the div focusable if needed
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 ease-in-out"
        style={{
          opacity,
          background: `radial-gradient(circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 80%)`,
        }}
      />
      {children}
    </div>
  );
};

export default SpotlightCard;
