import React from 'react';
import { MapPin, Clock, Phone } from 'lucide-react';
import { mockStoreBanner } from '../data/mockData';

export default function StoreBanner({ onNavigate }) {
  const handleClick = (e) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate('/contact');
    }
  };

  return (
    <section className="store-banner-section">
      <div className="container">
        <div className="store-banner-box">
          <img
            src={mockStoreBanner.bgImage}
            alt="BLUSAIGON Flagship"
            className="store-banner-bg"
            loading="lazy"
          />
          <div className="store-banner-overlay">
            <span className="store-sub">{mockStoreBanner.subtitle}</span>
            <h2 className="store-title head-title-style" style={{ color: '#ffffff' }}>
              {mockStoreBanner.title}
            </h2>
            <p className="store-desc">{mockStoreBanner.description}</p>
            
            <div className="store-meta">
              <div className="store-meta-item">
                <MapPin size={18} className="meta-icon" />
                <span>{mockStoreBanner.address}</span>
              </div>
              <div className="store-meta-item">
                <Clock size={18} className="meta-icon" />
                <span>{mockStoreBanner.hours}</span>
              </div>
              <div className="store-meta-item">
                <Phone size={18} className="meta-icon" />
                <span>Hotline: 0944 801 771</span>
              </div>
            </div>

            <a
              href="/contact"
              onClick={handleClick}
              className="btn-luxury-style btn-store-cta"
            >
              GHÉ THĂM KHÔNG GIAN TRẢI NGHIỆM
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
