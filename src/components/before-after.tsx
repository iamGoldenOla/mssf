import { useCallback, useRef, useState, useEffect } from "react";

export function BeforeAfter({
  beforeSrc,
  afterSrc,
  beforeLabel = "Before",
  afterLabel = "After",
  caption,
}: {
  beforeSrc: string;
  afterSrc: string;
  beforeLabel?: string;
  afterLabel?: string;
  caption?: string;
}) {
  const [pos, setPos] = useState(30);
  const [transitionActive, setTransitionActive] = useState(true);
  const wrapRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const demoPlayed = useRef(false);

  useEffect(() => {
    if (!wrapRef.current || demoPlayed.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !demoPlayed.current) {
          demoPlayed.current = true;
          // Step 1: Slide to 70%
          setTimeout(() => {
            setPos(70);
            // Step 2: Settle to 50%
            setTimeout(() => {
              setPos(50);
              // Step 3: Turn off transition after demo settles so manual drag is instant
              setTimeout(() => {
                setTransitionActive(false);
              }, 1200);
            }, 1000);
          }, 400);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(wrapRef.current);
    return () => observer.disconnect();
  }, []);

  const move = useCallback((clientX: number) => {
    if (!wrapRef.current) return;
    setTransitionActive(false); // Turn off transition on drag
    const rect = wrapRef.current.getBoundingClientRect();
    const p = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(0, Math.min(100, p)));
  }, []);

  return (
    <div
      ref={wrapRef}
      className="relative aspect-[4/3] w-full overflow-hidden rounded-sm ring-1 ring-black/10 shadow-2xl select-none"
      onMouseMove={(e) => dragging.current && move(e.clientX)}
      onMouseUp={() => (dragging.current = false)}
      onMouseLeave={() => (dragging.current = false)}
      onTouchMove={(e) => move(e.touches[0].clientX)}
      onTouchEnd={() => (dragging.current = false)}
    >
      <img src={beforeSrc} alt={beforeLabel} className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute left-4 top-4 rounded-sm bg-charcoal/70 px-3 py-1 text-[10px] font-mono uppercase tracking-widest text-offwhite">
        {beforeLabel}
      </div>
      <div
        className="absolute inset-y-0 left-0 overflow-hidden"
        style={{ 
          width: `${pos}%`,
          transition: transitionActive ? "width 1.2s cubic-bezier(0.16, 1, 0.3, 1)" : "none"
        }}
      >
        <img
          src={afterSrc}
          alt={afterLabel}
          className="absolute inset-y-0 left-0 h-full object-cover"
          style={{ width: `${wrapRef.current?.clientWidth ?? 0}px` }}
        />
        <div className="absolute right-4 top-4 rounded-sm bg-gold px-3 py-1 text-[10px] font-mono uppercase tracking-widest text-charcoal">
          {afterLabel}
        </div>
      </div>
      <div
        className="absolute inset-y-0 z-10 w-px bg-offwhite shadow-[0_0_15px_rgba(255,255,255,0.6)]"
        style={{ 
          left: `${pos}%`,
          transition: transitionActive ? "left 1.2s cubic-bezier(0.16, 1, 0.3, 1)" : "none"
        }}
      >
        <button
          type="button"
          onMouseDown={() => {
            dragging.current = true;
            setTransitionActive(false);
          }}
          onTouchStart={() => {
            dragging.current = true;
            setTransitionActive(false);
          }}
          className="absolute left-1/2 top-1/2 grid size-10 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize place-items-center rounded-full bg-offwhite shadow-lg ring-1 ring-charcoal/10 hover:scale-105 transition-transform"
          aria-label="Drag to compare"
        >
          <span className="text-charcoal font-bold">⇔</span>
        </button>
      </div>
      {caption && (
        <div className="absolute bottom-4 left-4 rounded-sm bg-green px-3 py-1.5 text-[10px] font-mono uppercase tracking-widest text-offwhite">
          {caption}
        </div>
      )}
    </div>
  );
}
