import React, { useState, useEffect } from "react";
import LandingSlide1 from "../../components/LandingSlides/LandingSlide1";
import LandingSlide2 from "../../components/LandingSlides/LandingSlide2";
import LandingSlide3 from "../../components/LandingSlides/LandingSlide3";

const LandingCarousel = ({
  slides = [<LandingSlide1 />, <LandingSlide2 />, <LandingSlide3 />],
  autoSlide = false,
  autoSlideInterval = 8000,
}) => {
  const [curr, setCurr] = useState(0);

  const prev = () =>
    setCurr((curr) => (curr === 0 ? slides.length - 1 : curr - 1));
  const next = () =>
    setCurr((curr) => (curr === slides.length - 1 ? 0 : curr + 1));

  const goToSlide = (index) => {
    setCurr(index);
  };

  useEffect(() => {
    if (!autoSlide) return;
    const slideInterval = setInterval(next, autoSlideInterval);
    return () => clearInterval(slideInterval);
  }, []);

  return (
    <div>
      <div className="overflow-hidden relative">
        <div
          className="w-screen h-fit transition-transform ease-out duration-500"
          style={{
            display: "flex",
            transform: `translateX(-${curr * 100}%)`,
          }}
        >
          {slides.map((slide, index) => (
            <div
              key={index}
              style={{
                flex: "0 0 100%",
                height: "100%",
              }}
            >
              {slide}
            </div>
          ))}
        </div>
        

        <div className="absolute bottom-2 right-0 left-0 mt-5">
          <div className="flex items-center justify-center gap-2">
            {slides.map((_, i) => (
              <div
                key={i}
                className={`transition-all w-3 h-3 rounded-full bg-codecolor cursor-pointer ${
                  curr === i ? "w-8" : "bg-opacity-50"
                }`}
                style={{ backgroundColor: curr === i ? "#codecolor" : "" }}
                onClick={() => goToSlide(i)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingCarousel;