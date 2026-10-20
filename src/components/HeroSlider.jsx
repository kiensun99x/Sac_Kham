import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { mockHeroBanners } from '../data/mockData';

export default function HeroSlider({ onNavigate }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % mockHeroBanners.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % mockHeroBanners.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + mockHeroBanners.length) % mockHeroBanners.length);
  };

  const handleSlideClick = (e, link) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(link);
    }
  };

  return (
    <section className="hero-slider-section">
      <div className="hero-slider-container">
        {mockHeroBanners.map((slide, index) => (
          <div
            key={slide.id}
            className={`hero-slide ${index === currentIndex ? 'active' : ''}`}
          >
            <a
              href={slide.link}
              onClick={(e) => handleSlideClick(e, slide.link)}
              className="hero-slide-link"
            >
              <picture>
                <source media="(max-width: 768px)" srcSet={slide.mobileImage} />
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="hero-slide-img"
                  loading={index === 0 ? 'eager' : 'lazy'}
                />
              </picture>
            </a>
          </div>
        ))}

        {/* Navigation Arrows */}
        <button
          className="slider-arrow prev"
          onClick={prevSlide}
          aria-label="Slide trước"
        >
          <ChevronLeft size={28} />
        </button>
        <button
          className="slider-arrow next"
          onClick={nextSlide}
          aria-label="Slide tiếp theo"
        >
          <ChevronRight size={28} />
        </button>

        {/* Pagination Dots */}
        <div className="slider-dots">
          {mockHeroBanners.map((_, idx) => (
            <button
              key={idx}
              className={`slider-dot ${idx === currentIndex ? 'active' : ''}`}
              onClick={() => goToSlide(idx)}
              aria-label={`Đi tới slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
