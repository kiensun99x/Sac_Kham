import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { mockLookbooks, mockInstagramImages } from '../data/mockData';

function InstagramIcon({ size = 20, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export default function LookbookSection({ onNavigate }) {
  const handleClick = (e, link) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(link);
    }
  };

  return (
    <section className="lookbook-section">
      <div className="container">
        <h2 className="head-title-style">LOOKBOOK BỘ SƯU TẬP</h2>
        
        {/* Lookbook 3 Cards */}
        <div className="lookbook-grid">
          {mockLookbooks.map((item) => (
            <div key={item.id} className="lookbook-card">
              <div className="lookbook-media">
                <img
                  src={item.image}
                  alt={item.title}
                  className="lookbook-img"
                  loading="lazy"
                />
                <div className="lookbook-badge">{item.tag}</div>
              </div>
              <div className="lookbook-info">
                <h3 className="lookbook-title">{item.title}</h3>
                <a
                  href={item.link}
                  onClick={(e) => handleClick(e, item.link)}
                  className="lookbook-action-link"
                >
                  <span>Xem Chi Tiết</span>
                  <ArrowUpRight size={16} />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Instagram Gallery Feed */}
        <div className="insta-feed-container">
          <div className="insta-heading">
            <InstagramIcon size={20} className="insta-icon" />
            <span>THEO DÕI @BLUSAIGON TRÊN INSTAGRAM</span>
          </div>
          <div className="insta-grid">
            {mockInstagramImages.map((src, index) => (
              <a
                key={index}
                href="https://www.instagram.com/blusaigon/"
                target="_blank"
                rel="noreferrer"
                className="insta-item"
              >
                <img src={src} alt={`Instagram ${index + 1}`} loading="lazy" />
                <div className="insta-overlay">
                  <InstagramIcon size={24} />
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
