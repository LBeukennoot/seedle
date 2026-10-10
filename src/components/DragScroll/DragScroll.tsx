import React, { useRef, useState } from "react";

const DragScroll = ({ children }: { children: React.ReactNode }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setStartX(e.pageX - (scrollRef.current?.offsetLeft || 0));
    setStartY(e.pageY - (scrollRef.current?.offsetTop || 0));
    setScrollLeft(scrollRef.current?.scrollLeft || 0);
    setScrollTop(scrollRef.current?.scrollTop || 0);
    scrollRef.current?.style.setProperty("cursor", "grabbing", "important");
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
    scrollRef.current?.style.setProperty("cursor", "grab", "important");
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    scrollRef.current?.style.setProperty("cursor", "grab", "important");
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - (scrollRef.current.offsetLeft + startX);
    const y = e.pageY - (scrollRef.current.offsetTop + startY);
    scrollRef.current.scrollLeft = scrollLeft - x;
    scrollRef.current.scrollTop = scrollTop - y;
  };

  return (
    <div
      ref={scrollRef}
      className="overflow-auto cursor-grab active:cursor-grabbing"
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
    >
      {children}
    </div>
  );
};

export default DragScroll;
