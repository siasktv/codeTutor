import React, { useState, useEffect } from "react";
import image1 from "../assets/1.svg";
import image2 from "../assets/2.svg";
import image3 from "../assets/3.svg";
import image4 from "../assets/4.svg";

const ImageSlider = () => {
  const images = [image1, image2, image3, image4];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      setIsAnimating(true);
    }, 5000);

    return () => {
      clearInterval(timer);
    };
  }, [images.length]);

  useEffect(() => {
    let timeout;

    if (isAnimating) {
      timeout = setTimeout(() => {
        setIsAnimating(false);
      }, 3000);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [isAnimating]);

  const handleTransitionEnd = () => {
    setIsAnimating(false);
  };

  return (
    <div className="image-slider relative">
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt="Slider"
          className={`absolute -bottom-600px left-0 transform transition-transform duration-1000 ease-in-out ${
            index === currentImageIndex && !isAnimating
              ? "translate-y-0 opacity-100"
              : index === currentImageIndex && isAnimating
              ? "translate-y-0 opacity-100 animate-bounce-bottom"
              : "translate-y-full opacity-0"
          }`}
          onTransitionEnd={handleTransitionEnd}
        />
      ))}
    </div>
  );
};

export default ImageSlider;