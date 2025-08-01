import { useAnimation, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface CarouselProps {
  images: string[];
  type: "continuous" | "step";
  className?: string;
}

const ResponsiveCarousel: React.FC<CarouselProps> = ({
  images,
  type,
  className,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const [imageWidth, setImageWidth] = useState(288);

  useEffect(() => {
    if (!containerRef.current) return;
    const firstImg = containerRef.current.querySelector("img");
    if (firstImg) {
      const gap = 16;
      setImageWidth((firstImg.clientWidth || 288) + gap);
    }
  }, [images]);

  useEffect(() => {
    if (images.length === 0 || imageWidth === 0) return;

    if (type === "continuous") {
      const totalWidth = images.length * imageWidth;

      controls.start({
        x: -totalWidth,
        transition: {
          duration: images.length * 3,
          ease: "linear",
          repeat: Infinity,
          repeatType: "loop",
          repeatDelay: 0,
        },
      });
    }

    if (type === "step") {
      let index = 0;
      controls.start({ x: 0 });
      const interval = setInterval(() => {
        index = (index + 1) % images.length;
        controls.start({
          x: -index * imageWidth,
          transition: { duration: 0.6, ease: "easeInOut" },
        });
      }, 3000);
      return () => {
        clearInterval(interval);
      };
    }
  }, [type, imageWidth, images.length]);
  const displayImages = [...images, ...images];

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden h-56 ${className}`}
    >
      <motion.div
        className="flex gap-4 absolute"
        animate={controls}
        initial={{ x: 0 }}
      >
        {displayImages.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`Carousel-${i}`}
            loading="lazy"
            className="w-48 h-36 md:w-72 md:h-56 object-cover rounded-lg "
          />
        ))}
      </motion.div>
    </div>
  );
};

export default ResponsiveCarousel;
