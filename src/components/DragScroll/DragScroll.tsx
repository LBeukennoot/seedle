import { motion, useMotionValue, useScroll, useSpring, useTransform } from "motion/react";
import { useRef, useState, useEffect } from "react";

export const DragScroll = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [containerHeight, setContainerHeight] = useState(0);
  const [contentHeight, setContentHeight] = useState(0);

  // Motion values for drag and scroll
  const y = useMotionValue(0);

  // Calculate scroll limits
  const maxScroll = Math.max(0, contentHeight - containerHeight);

  // Physics-based spring animation for momentum
  const scrollY = useSpring(y, {
    stiffness: 300,
    damping: 30,
    restDelta: 0.5,
  });

  // Update container and content heights
  useEffect(() => {
    if (containerRef.current) {
      setContainerHeight(containerRef.current.offsetHeight);
    }
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, []);

  // Sync scroll position with native scroll
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = scrollY.get();
    }
  }, [scrollY]);

  return (
    <motion.div
      ref={containerRef}
      style={{
        height: "100%",
        overflow: "hidden",
        position: "relative",
        touchAction: "pan-y",
      }}
    >
      {/* Scrollable content */}
      <motion.div
        ref={contentRef}
        drag="y"
        dragConstraints={{
          top: 0,
          bottom: maxScroll > 0 ? -maxScroll : 0,
        }}
        dragElastic={0.1}
        dragMomentum={true}
        style={{
          y,
          height: "fit-content",
          willChange: "transform",
        }}
        onDragEnd={(e, info) => {
          // Optional: Add additional momentum based on velocity
          if (info.velocity.y !== 0) {
            scrollY.set(
              Math.min(
                Math.max(y.get() + info.velocity.y * 50, -maxScroll),
                0
              )
            );
          }
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}



