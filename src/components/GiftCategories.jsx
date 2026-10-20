import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { mockGiftCategories } from '../data/mockData';

export default function GiftCategories({ onNavigate }) {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.75;
      scrollRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const handleCategoryClick = (e, link) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(link);
    }
  };

  return (
    <section className="gift-categories-section">
      <div className="container">
        <h2 className="head-title-style">KHÁM PHÁ TẶNG PHẨM</h2>
        
        <div className="gift-carousel-wrapper">
          <button
            className="carousel-btn prev-btn"
            onClick={() => scroll('left')}
            aria-label="Cuộn trái"
          >
            <ChevronLeft size={22} />
          </button>

          <div className="gift-categories-list" ref={scrollRef}>
            {mockGiftCategories.map((item) => (
              <a
                key={item.id}
                href={item.link}
                onClick={(e) => handleCategoryClick(e, item.link)}
                className="gift-category-item"
              >
                <div className="gift-img-box">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="gift-img"
                    loading="lazy"
                  />
                </div>
                <h3 className="gift-name">{item.name}</h3>
              </a>
            ))}
          </div>

          <button
            className="carousel-btn next-btn"
            onClick={() => scroll('right')}
            aria-label="Cuộn phải"
          >
            <ChevronRight size={22} />
          </button>
        </div>
      </div>
    </section>
  );
}
