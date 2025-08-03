import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface offer {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  cta: string;
}

interface carouselProps {
  offers: offer[];
}

const carousel = ({ offers }: carouselProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % offers.length);
  };
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % offers.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + offers.length) % offers.length);
  };
  return (
    <div className="relative  h-48 md:h-96 overflow-hidden">
      <div
        className="flex transition-transform duration-500 ease-in-out h-full"
        style={{ transform: `translateX(-${currentSlide * 100}% )` }}
      >
        {offers.map((offer) => (
          <div
            key={offer.id}
            className="w-full  flex-shrink-0  relative"
            style={{
              backgroundImage: `url(${offer.image})`,
              backgroundSize: `cover`,
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 flex justify-center items-center">
              <div
                className="text-center text-white  px-4"
                style={{ textShadow: "2px 2px 6px #000" }}
              >
                <h2 className="text-4xl md:text-6xl font-bold mb-4">
                  {offer.title}
                </h2>
                <p className="text-xl md:text-2xl mb-8">{offer.subtitle}</p>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg shadow-2xl font-semibold transition-colors">
                  {offer.cta}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white  bg-opacity-80 hover:bg-opacity-100 p-2 rounded-full transition-all"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white  bg-opacity-80 hover:bg-opacity-100 p-2 rounded-full transition-all"
      >
        <ChevronRight size={24} />
      </button>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {offers.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`${
              index === currentSlide ? `w-9` : `w-3`
            } transition-all h-0.75 bg-white rounded-full overflow-hidden  cursor-pointer shadow-2xl `}
          >
            {index === currentSlide && (
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 5, ease: "linear" }}
                className="h-full rounded- bg-gray-800 "
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default carousel;
