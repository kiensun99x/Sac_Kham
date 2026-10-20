import React from 'react';
import HeroSlider from '../components/HeroSlider';
import GiftCategories from '../components/GiftCategories';
import FeaturedGifts from '../components/FeaturedGifts';
import CorporateBanner from '../components/CorporateBanner';
import AboutSection from '../components/AboutSection';
import LookbookSection from '../components/LookbookSection';
import StoreBanner from '../components/StoreBanner';
import PoliciesSection from '../components/PoliciesSection';
import { mockProducts } from '../data/mockData';
import { ShoppingBag, Eye } from 'lucide-react';

export default function HomePage({ onNavigate, onAddToCart, onOpenEngrave }) {
  const formatVND = (num) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(num);
  };

  const featuredProducts = mockProducts.slice(0, 4);

  const handleProductClick = (e, slug) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(`/product/${slug}`);
    }
  };

  return (
    <div className="home-page-view">
      {/* 1. Hero Banner Slider */}
      <HeroSlider onNavigate={onNavigate} />

      {/* 2. Gift Categories Horizontal Carousel */}
      <GiftCategories onNavigate={onNavigate} />

      {/* 3. Featured Gifts: Quà Tặng Nam & Nữ */}
      <FeaturedGifts onNavigate={onNavigate} />

      {/* 4. Highlight Products: Bút Ký Thủ Công Nổi Bật */}
      <section className="featured-products-section">
        <div className="container">
          <h2 className="head-title-style">BÚT NGỌC TRAI NỔI BẬT</h2>
          <p className="section-subtitle">
            Mỗi chế tác là một dấu ấn thủ công độc bản từ nghệ thuật khảm trai Việt Nam
          </p>

          <div className="products-grid">
            {featuredProducts.map((product) => (
              <div key={product.id} className="product-card">
                <div className="product-media">
                  {product.badge && <span className="product-badge">{product.badge}</span>}
                  <a
                    href={`/product/${product.slug}`}
                    onClick={(e) => handleProductClick(e, product.slug)}
                    className="product-img-link"
                  >
                    <img
                      src={product.primaryImage}
                      alt={product.name}
                      className="product-img primary"
                      loading="lazy"
                    />
                    {product.secondaryImage && (
                      <img
                        src={product.secondaryImage}
                        alt={product.name}
                        className="product-img secondary"
                        loading="lazy"
                      />
                    )}
                  </a>

                  <div className="product-card-actions">
                    <button
                      className="card-action-btn"
                      onClick={() => onAddToCart(product)}
                      title="Thêm vào giỏ hàng"
                      aria-label="Thêm vào giỏ hàng"
                    >
                      <ShoppingBag size={18} />
                      <span>Thêm Giỏ Hàng</span>
                    </button>
                    <button
                      className="card-action-btn secondary"
                      onClick={(e) => handleProductClick(e, product.slug)}
                      title="Xem chi tiết"
                      aria-label="Xem chi tiết"
                    >
                      <Eye size={18} />
                    </button>
                  </div>
                </div>

                <div className="product-card-body">
                  <span className="product-vendor">BLUS</span>
                  <h3 className="product-card-title">
                    <a
                      href={`/product/${product.slug}`}
                      onClick={(e) => handleProductClick(e, product.slug)}
                    >
                      {product.name}
                    </a>
                  </h3>
                  <div className="product-price-box">
                    <span className="current-price">{formatVND(product.price)}</span>
                    {product.originalPrice && (
                      <span className="original-price">{formatVND(product.originalPrice)}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="view-all-products-wrapper">
            <button
              className="btn-luxury-outline"
              onClick={() => onNavigate('/collections/but-ngoc-trai')}
            >
              XEM TẤT CẢ BỘ SƯU TẬP &rarr;
            </button>
          </div>
        </div>
      </section>

      {/* 5. Corporate Gift Banner */}
      <CorporateBanner onNavigate={onNavigate} />

      {/* 6. Heritage Story: Về Chúng Tôi */}
      <AboutSection onNavigate={onNavigate} />

      {/* 7. Lookbook & Instagram */}
      <LookbookSection onNavigate={onNavigate} />

      {/* 8. Boutique Flagship Store Showcase */}
      <StoreBanner onNavigate={onNavigate} />

      {/* 9. Core Policies: 4 Cam kết dịch vụ */}
      <PoliciesSection onOpenEngrave={onOpenEngrave} />
    </div>
  );
}
