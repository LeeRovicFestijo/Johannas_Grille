import React, { useState } from 'react';
import './Carousel.css';

const Carousel = () => {
  const images = [
    "https://via.placeholder.com/600x400?text=Image+1",
    "https://via.placeholder.com/600x400?text=Image+2",
    "https://via.placeholder.com/600x400?text=Image+3"
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="carousel-container">
      <div className="carousel">
        <button className="prev" onClick={prevSlide}>❮</button>
        <img src={images[currentIndex]} alt="Carousel" />
        <button className="next" onClick={nextSlide}>❯</button>
      </div>
    </div>
  );
};

export default Carousel;