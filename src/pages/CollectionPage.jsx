import React, { useState, useMemo } from 'react';
import { Filter, ChevronRight, X, ShoppingBag, Eye, SlidersHorizontal } from 'lucide-react';
import { mockProducts } from '../data/mockData';

export default function CollectionPage({ collectionSlug, onNavigate, onAddToCart }) {
  const [selectedPriceRange, setSelectedPriceRange] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [sortBy, setSortBy] = useState('created-desc');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const formatVND = (num) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(num);
  };

  // Determine Title based on collection slug
  const collectionTitle = useMemo(() => {
    switch (collectionSlug) {
      case 'but-ngoc-trai':
        return 'Bút Ngọc Trai';
      case 'but-go':
        return 'Bút Gỗ & Đặc Biệt';
      case 'trang-suc':
        return 'Trang Sức Thủ Công';
      case 'qua-tang-nam':
        return 'Quà Tặng Nam';
      case 'qua-tang-nu':
        return 'Quà Tặng Nữ';
      case 'qua-tang-doanh-nghiep':
        return 'Quà Tặng Doanh Nghiệp';
      default:
        return 'Tất Cả Bộ Sưu Tập';
    }
  }, [collectionSlug]);

  // Filter products
  const filteredProducts = useMemo(() => {
    return mockProducts.filter((product) => {
      // Slug match
      if (collectionSlug === 'but-ngoc-trai' && product.collectionSlug !== 'but-ngoc-trai') return false;
      if (collectionSlug === 'trang-suc' && product.collectionSlug !== 'trang-suc') return false;

      // Price filter
      if (selectedPriceRange === 'under-2m' && product.price >= 2000000) return false;
      if (selectedPriceRange === '2m-5m' && (product.price < 2000000 || product.price > 5000000)) return false;
      if (selectedPriceRange === 'over-5m' && product.price <= 5000000) return false;

      // Type filter
      if (selectedType !== 'all' && product.type !== selectedType) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'alpha-asc') return a.name.localeCompare(b.name);
      if (sortBy === 'alpha-desc') return b.name.localeCompare(a.name);
      return b.id - a.id;
    });
  }, [collectionSlug, selectedPriceRange, selectedType, sortBy]);

  const resetFilters = () => {
    setSelectedPriceRange('all');
    setSelectedType('all');
  };

  const handleProductClick = (e, slug) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(`/product/${slug}`);
    }
  };

  return (
    <div className="collection-page-view">
      {/* Breadcrumb Bar */}
      <div className="breadcrumb-bar">
        <div className="container">
          <ul className="breadcrumb-list">
            <li>
              <a href="/" onClick={(e) => { e.preventDefault(); onNavigate('/'); }}>Trang chủ</a>
              <ChevronRight size={14} className="crumb-arrow" />
            </li>
            <li>
              <a href="/collections/all" onClick={(e) => { e.preventDefault(); onNavigate('/collections/all'); }}>Danh mục</a>
              <ChevronRight size={14} className="crumb-arrow" />
            </li>
            <li className="active">
              <span>{collectionTitle}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="container collection-main-layout">
        {/* Top Header of Collection */}
        <div className="collection-header-row">
          <div>
            <h1 className="collection-main-title head-title-style" style={{ textAlign: 'left', margin: 0 }}>
              {collectionTitle}
            </h1>
            <p className="collection-items-count">Hiển thị {filteredProducts.length} sản phẩm</p>
          </div>

          <div className="collection-actions-bar">
            {/* Sort Select */}
            <div className="sort-box">
              <label htmlFor="collection-sort" className="sort-label">Sắp xếp:</label>
              <select
                id="collection-sort"
                className="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="created-desc">Hàng mới nhất</option>
                <option value="price-asc">Giá: Thấp đến Cao</option>
                <option value="price-desc">Giá: Cao đến Thấp</option>
                <option value="alpha-asc">Tên: A &rarr; Z</option>
                <option value="alpha-desc">Tên: Z &rarr; A</option>
              </select>
            </div>

            {/* Mobile Filter Button */}
            <button
              className="mobile-filter-trigger"
              onClick={() => setMobileFilterOpen(true)}
            >
              <SlidersHorizontal size={16} />
              <span>Bộ lọc</span>
            </button>
          </div>
        </div>

        {/* Layout Grid: Sidebar + Product Cards */}
        <div className="collection-body-grid">
          {/* Desktop Filter Sidebar */}
          <aside className={`filter-sidebar ${mobileFilterOpen ? 'mobile-open' : ''}`}>
            <div className="filter-sidebar-inner">
              <div className="filter-header-mobile">
                <span className="filter-title-bold">BỘ LỌC TÌM KIẾM</span>
                <button
                  className="filter-close-btn"
                  onClick={() => setMobileFilterOpen(false)}
                >
                  <X size={20} />
                </button>
              </div>

              {/* Price Filter Group */}
              <div className="filter-group">
                <h4 className="filter-group-heading">MỨC GIÁ</h4>
                <div className="filter-options-list">
                  <label className="filter-radio-item">
                    <input
                      type="radio"
                      name="price-filter"
                      checked={selectedPriceRange === 'all'}
                      onChange={() => setSelectedPriceRange('all')}
                    />
                    <span className="radio-text">Tất cả mức giá</span>
                  </label>
                  <label className="filter-radio-item">
                    <input
                      type="radio"
                      name="price-filter"
                      checked={selectedPriceRange === 'under-2m'}
                      onChange={() => setSelectedPriceRange('under-2m')}
                    />
                    <span className="radio-text">Dưới 2.000.000₫</span>
                  </label>
                  <label className="filter-radio-item">
                    <input
                      type="radio"
                      name="price-filter"
                      checked={selectedPriceRange === '2m-5m'}
                      onChange={() => setSelectedPriceRange('2m-5m')}
                    />
                    <span className="radio-text">2.000.000₫ - 5.000.000₫</span>
                  </label>
                  <label className="filter-radio-item">
                    <input
                      type="radio"
                      name="price-filter"
                      checked={selectedPriceRange === 'over-5m'}
                      onChange={() => setSelectedPriceRange('over-5m')}
                    />
                    <span className="radio-text">Trên 5.000.000₫</span>
                  </label>
                </div>
              </div>

              {/* Product Type Group */}
              <div className="filter-group">
                <h4 className="filter-group-heading">DÒNG SẢN PHẨM</h4>
                <div className="filter-options-list">
                  <label className="filter-radio-item">
                    <input
                      type="radio"
                      name="type-filter"
                      checked={selectedType === 'all'}
                      onChange={() => setSelectedType('all')}
                    />
                    <span className="radio-text">Tất cả loại</span>
                  </label>
                  <label className="filter-radio-item">
                    <input
                      type="radio"
                      name="type-filter"
                      checked={selectedType === 'Bút Bi'}
                      onChange={() => setSelectedType('Bút Bi')}
                    />
                    <span className="radio-text">Bút Bi Khảm Trai</span>
                  </label>
                  <label className="filter-radio-item">
                    <input
                      type="radio"
                      name="type-filter"
                      checked={selectedType === 'Bút Dạ Bi'}
                      onChange={() => setSelectedType('Bút Dạ Bi')}
                    />
                    <span className="radio-text">Bút Dạ Bi Cao Cấp</span>
                  </label>
                  <label className="filter-radio-item">
                    <input
                      type="radio"
                      name="type-filter"
                      checked={selectedType === 'Bút Máy'}
                      onChange={() => setSelectedType('Bút Máy')}
                    />
                    <span className="radio-text">Bút Máy Kim Hoàn</span>
                  </label>
                  <label className="filter-radio-item">
                    <input
                      type="radio"
                      name="type-filter"
                      checked={selectedType === 'Kẹp Cà Vạt'}
                      onChange={() => setSelectedType('Kẹp Cà Vạt')}
                    />
                    <span className="radio-text">Kẹp Cà Vạt</span>
                  </label>
                </div>
              </div>

              {(selectedPriceRange !== 'all' || selectedType !== 'all') && (
                <button className="reset-filter-btn" onClick={resetFilters}>
                  Xóa tất cả bộ lọc
                </button>
              )}
            </div>
          </aside>

          {/* Product Cards Grid */}
          <main className="collection-products-area">
            {filteredProducts.length === 0 ? (
              <div className="no-products-found">
                <p>Không có sản phẩm nào phù hợp với bộ lọc hiện tại.</p>
                <button className="btn-luxury-outline" onClick={resetFilters}>
                  Đặt lại bộ lọc
                </button>
              </div>
            ) : (
              <div className="collection-grid">
                {filteredProducts.map((product) => (
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
                        >
                          <ShoppingBag size={18} />
                          <span>Thêm Giỏ</span>
                        </button>
                        <button
                          className="card-action-btn secondary"
                          onClick={(e) => handleProductClick(e, product.slug)}
                          title="Xem chi tiết"
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
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
