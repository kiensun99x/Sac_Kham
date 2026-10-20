import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { mockProducts } from '../data/mockData';

export default function SearchModal({ isOpen, onClose, onNavigate }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const filteredProducts = query.trim()
    ? mockProducts.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.collection.toLowerCase().includes(query.toLowerCase()) ||
          p.type.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const popularTags = [
    'Bút Ngọc Trai',
    'Trường Hải',
    'Minh Sa',
    'Khuê Văn',
    'Kẹp Cà Vạt',
    'Aura Box',
  ];

  const formatVND = (num) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(num);
  };

  const handleSelectProduct = (slug) => {
    onClose();
    if (onNavigate) {
      onNavigate(`/product/${slug}`);
    }
  };

  return (
    <div className="search-modal-overlay" onClick={onClose}>
      <div className="search-modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="search-modal-header">
          <div className="search-input-wrapper">
            <Search size={22} className="search-field-icon" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Tìm kiếm bút ký, quà tặng khảm trai, kẹp cà vạt..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="search-modal-input"
            />
            {query && (
              <button
                className="clear-search-btn"
                onClick={() => setQuery('')}
                aria-label="Xóa tìm kiếm"
              >
                <X size={18} />
              </button>
            )}
          </div>
          <button className="search-modal-close" onClick={onClose} aria-label="Đóng tìm kiếm">
            <X size={24} />
          </button>
        </div>

        {/* Popular Tags */}
        <div className="popular-tags-box">
          <span className="tags-label">Gợi ý tìm kiếm:</span>
          <div className="tags-list">
            {popularTags.map((tag) => (
              <button
                key={tag}
                className="search-tag-chip"
                onClick={() => setQuery(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Results Area */}
        <div className="search-results-area">
          {query.trim() === '' ? (
            <div className="search-hint">
              <p>Nhập từ khóa để khám phá bộ sưu tập tặng phẩm thủ công tinh xảo của BLUS.</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="no-results-state">
              <p>Không tìm thấy sản phẩm phù hợp với từ khóa "<strong>{query}</strong>".</p>
              <span className="no-results-tip">Vui lòng thử tìm kiếm với các từ khóa khác như "bút bi", "bút ngọc trai", "kẹp cà vạt".</span>
            </div>
          ) : (
            <div className="search-results-grid">
              <div className="results-count-bar">
                Tìm thấy {filteredProducts.length} sản phẩm phù hợp:
              </div>
              <div className="results-cards-list">
                {filteredProducts.map((p) => (
                  <div
                    key={p.id}
                    className="search-result-card"
                    onClick={() => handleSelectProduct(p.slug)}
                  >
                    <img src={p.primaryImage} alt={p.name} className="result-card-thumb" />
                    <div className="result-card-info">
                      <span className="result-card-collection">{p.collection}</span>
                      <h4 className="result-card-title">{p.name}</h4>
                      <div className="result-card-price">{formatVND(p.price)}</div>
                    </div>
                    <ArrowRight size={18} className="result-arrow-icon" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
