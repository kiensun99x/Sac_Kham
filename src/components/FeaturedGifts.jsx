import React from 'react';
import { mockFeaturedCards } from '../data/mockData';

export default function FeaturedGifts({ onNavigate }) {
  const handleClick = (e, link) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(link);
    }
  };

  return (
    <section className="featured-gifts-section">
      <div className="container">
        <div className="featured-gifts-grid">
          {mockFeaturedCards.map((card) => (
            <div key={card.id} className="featured-gift-card">
              <a
                href={card.link}
                onClick={(e) => handleClick(e, card.link)}
                className="featured-gift-media"
              >
                <img
                  src={card.image}
                  alt={card.title}
                  className="featured-gift-img"
                  loading="lazy"
                />
              </a>
              <div className="featured-gift-info">
                <h3 className="featured-gift-title head-title-style">{card.title}</h3>
                <p className="featured-gift-sub">{card.subtitle}</p>
                <a
                  href={card.link}
                  onClick={(e) => handleClick(e, card.link)}
                  className="featured-gift-link"
                >
                  Xem thêm
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
