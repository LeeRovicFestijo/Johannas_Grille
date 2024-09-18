import React, { useState, useEffect } from 'react';
import './Carousel.css';
import image1 from '../../../assets/Ribs.png';
import image2 from '../../../assets/Crispy.png';
import image3 from '../../../assets/Salmon.png';

const Carousel = ({ items, autoPlayInterval = 1000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const newIndex = currentIndex === 0 ? items.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const newIndex = currentIndex === items.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  // Auto-play feature using useEffect
  useEffect(() => {
    const autoPlay = setInterval(() => {
      nextSlide();
    }, autoPlayInterval);

    return () => clearInterval(autoPlay); // Cleanup the interval on component unmount
  }, [currentIndex, autoPlayInterval]);

  return (
    <div className="carousel-container">
      <button className="carousel-button prev" onClick={prevSlide}>
        &#10094;
      </button>

      <div
        className="carousel-slide"
        style={{
          width: `${items.length * 100}%`, // Dynamic width based on number of items
          transform: `translateX(${-currentIndex * (100 / items.length)}%)`, // Move based on index
        }}
      >
        {items.map((item, index) => (
          <img key={index} src={item.image} alt={item.title} />
        ))}
      </div>

      <button className="carousel-button next" onClick={nextSlide}>
        &#10095;
      </button>
    </div>
  );
};

// Usage example
const items = [
  {
    image: image1,
    title: "Slide 1",
    description: "This is the first slide"
  },
  {
    image: image2,
    title: "Slide 2",
    description: "This is the second slide"
  },
  {
    image: image3,
    title: "Slide 3",
    description: "This is the third slide"
  }
];

const App = () => {
  return (
    <div>
      <h1>React Carousel Example</h1>
      <Carousel items={items} autoPlayInterval={2000} />
    </div>
  );
};

export default App;
