import React from 'react';
import { mockCorporateBanner } from '../data/mockData';

export default function CorporateBanner({ onNavigate }) {
  const handleClick = (e, link) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(link);
    }
  };

  return (
    <section className="corporate-banner-section">
      <div className="container">
        <div className="corporate-banner-box">
          <a
            href={mockCorporateBanner.link}
            onClick={(e) => handleClick(e, mockCorporateBanner.link)}
            className="corporate-banner-link"
          >
            <img
              src={mockCorporateBanner.image}
              alt={mockCorporateBanner.title}
              className="corporate-banner-img"
              loading="lazy"
            />
          </a>
          <div className="corporate-banner-overlay">
            <h3 className="corporate-title">{mockCorporateBanner.title}</h3>
            <p className="corporate-sub">{mockCorporateBanner.subtitle}</p>
            <a
              href={mockCorporateBanner.link}
              onClick={(e) => handleClick(e, mockCorporateBanner.link)}
              className="btn-luxury-style"
            >
              Xem Chi Tiết
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
