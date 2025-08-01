import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const images = [
  "/carousel/slide1.webp",
  "/carousel/slide2.webp",
  "/carousel/slide3.webp",
  "/carousel/slide4.webp",
  "/carousel/slide5.webp",
];

export default function ShrinkingCarousel() {
  const [scrollX, setScrollX] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setScrollX((prev) => prev - 1);
    }, 16); // 60fps
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute  z-10 overflow-hidden pointer-events-none">
      {/* Gradient fade edges */}
      <div className="absolute left-0 top-0 h-full w-32 bg-gradient-to-r from-gray-100 to-transparent z-20" />
      <div className="absolute right-0 top-0 h-full w-32 bg-gradient-to-l from-gray-100 to-transparent z-20" />

      <motion.div
        className="flex gap-4"
        style={{
          x: scrollX,
          width: "max-content",
        }}
      >
        {[...images, ...images].map((src, index) => (
          <motion.img
            key={index}
            src={src}
            alt={`carousel-${index}`}
            className="w-60 h-40 sm:w-72 sm:h-48 object-cover rounded-xl"
            style={{
              scale: getScale(scrollX + index * 300),
              transition: "transform 0.3s",
            }}
            loading="lazy"
          />
        ))}
      </motion.div>
    </div>
  );
}

// 🧠 Shrink only when image crosses center
function getScale(x: number) {
  const screenCenter = window.innerWidth / 2;
  const imageCenter = x + 150; // assuming image is ~300px wide
  const distance = Math.abs(screenCenter - imageCenter);

  if (distance < 100) return 0.85;
  if (distance < 200) return 0.9;
  return 1;
}
