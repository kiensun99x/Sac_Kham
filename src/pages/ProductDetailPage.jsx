import React, { useState } from 'react';
import {
  Star,
  ShieldCheck,
  Truck,
  Gift,
  Sparkles,
  Plus,
  Minus,
  ShoppingBag,
  ChevronRight,
  Check,
  RotateCcw,
} from 'lucide-react';
import { mockProducts } from '../data/mockData';

export default function ProductDetailPage({
  productSlug,
  onNavigate,
  onAddToCart,
  onOpenEngrave,
  customEngraving,
}) {
  const product = mockProducts.find((p) => p.slug === productSlug) || mockProducts[0];
  const [selectedImage, setSelectedImage] = useState(product.gallery?.[0] || product.primaryImage);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('desc');
  const [toastMessage, setToastMessage] = useState('');

  const formatVND = (num) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(num);
  };

  const handleAddToCart = () => {
    onAddToCart({
      ...product,
      quantity,
      engravedText: customEngraving?.text,
      engravedColor: customEngraving?.color,
    });
    setToastMessage('Đã thêm sản phẩm vào giỏ hàng!');
    setTimeout(() => setToastMessage(''), 3500);
  };

  const handleBuyNow = () => {
    onAddToCart({
      ...product,
      quantity,
      engravedText: customEngraving?.text,
      engravedColor: customEngraving?.color,
    });
    if (onNavigate) {
      onNavigate('/cart');
    }
  };

  const relatedProducts = mockProducts.filter((p) => p.id !== product.id).slice(0, 3);

  return (
    <div className="product-detail-view">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="product-toast">
          <Check size={18} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Breadcrumb */}
      <div className="breadcrumb-bar">
        <div className="container">
          <ul className="breadcrumb-list">
            <li>
              <a href="/" onClick={(e) => { e.preventDefault(); onNavigate('/'); }}>Trang chủ</a>
              <ChevronRight size={14} className="crumb-arrow" />
            </li>
            <li>
              <a href="/collections/all" onClick={(e) => { e.preventDefault(); onNavigate('/collections/all'); }}>
                {product.collection}
              </a>
              <ChevronRight size={14} className="crumb-arrow" />
            </li>
            <li className="active">
              <span>{product.name}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="container product-detail-container">
        <div className="product-main-grid">
          {/* Gallery Column */}
          <div className="product-gallery-column">
            <div className="product-main-image-frame">
              {product.badge && <span className="product-badge detail-badge">{product.badge}</span>}
              <img
                src={selectedImage}
                alt={product.name}
                className="product-detail-hero-img"
              />
            </div>

            {/* Thumbnails */}
            {product.gallery && product.gallery.length > 1 && (
              <div className="product-thumbnails-strip">
                {product.gallery.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    className={`thumb-btn ${selectedImage === imgUrl ? 'active' : ''}`}
                    onClick={() => setSelectedImage(imgUrl)}
                  >
                    <img src={imgUrl} alt={`${product.name} ${idx + 1}`} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details / Purchasing Column */}
          <div className="product-info-column">
            <span className="product-vendor-tag">THƯƠNG HIỆU: BLUS</span>
            <h1 className="product-title-heading">{product.name}</h1>

            {/* Rating */}
            <div className="product-rating-row">
              <div className="stars-group">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={15} className="star-filled" fill="#C5A880" color="#C5A880" />
                ))}
              </div>
              <span className="rating-text">
                5.0 ({product.reviewsCount || 28} đánh giá từ khách hàng)
              </span>
            </div>

            {/* Price Box */}
            <div className="product-price-section">
              <span className="product-current-price">{formatVND(product.price)}</span>
              {product.originalPrice && (
                <span className="product-original-price">{formatVND(product.originalPrice)}</span>
              )}
            </div>

            {/* Material summary highlight */}
            <div className="product-highlight-box">
              <strong>Chất liệu chính:</strong> {product.material}
            </div>

            {/* Custom Engraving Feature Box */}
            <div className="custom-engraving-card">
              <div className="engraving-header">
                <div className="engraving-title">
                  <Sparkles size={18} className="sparkle-gold" />
                  <span>Dịch Vụ Khắc Tên Laser Miễn Phí</span>
                </div>
                <button
                  type="button"
                  className="btn-open-engraving"
                  onClick={onOpenEngrave}
                >
                  {customEngraving?.text ? 'Thay Đổi Mẫu' : 'Tùy Chỉnh Nét Khắc'}
                </button>
              </div>

              {customEngraving?.text ? (
                <div className="applied-engraving-info">
                  <span className="applied-label">Mẫu khắc hiện tại:</span>
                  <span className="applied-text">"{customEngraving.text}"</span>
                  <span className="applied-color">({customEngraving.color})</span>
                </div>
              ) : (
                <p className="engraving-hint">
                  Khắc tên riêng, thông điệp kỷ niệm hoặc logo thương hiệu lên thân bút hoàn toàn miễn phí.
                </p>
              )}
            </div>

            {/* Quantity Selector & Add to Cart */}
            <div className="product-purchase-box">
              <div className="quantity-wrapper">
                <span className="quantity-label">Số lượng:</span>
                <div className="qty-picker">
                  <button
                    className="qty-picker-btn"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    <Minus size={14} />
                  </button>
                  <span className="qty-picker-val">{quantity}</span>
                  <button
                    className="qty-picker-btn"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>

              <div className="buttons-cta-group">
                <button
                  className="btn-luxury-style btn-add-cart"
                  onClick={handleAddToCart}
                >
                  <ShoppingBag size={18} />
                  <span>THÊM VÀO GIỎ HÀNG</span>
                </button>
                <button
                  className="btn-luxury-outline btn-buy-now"
                  onClick={handleBuyNow}
                >
                  MUA NGAY
                </button>
              </div>
            </div>

            {/* Value Props & Guarantee */}
            <div className="product-perks-list">
              <div className="perk-row">
                <Truck size={18} className="perk-icon" />
                <span>Miễn phí vận chuyển toàn quốc cho đơn hàng này</span>
              </div>
              <div className="perk-row">
                <Gift size={18} className="perk-icon" />
                <span>Tặng kèm hộp quà sang trọng & túi giấy cao cấp BLUS</span>
              </div>
              <div className="perk-row">
                <ShieldCheck size={18} className="perk-icon" />
                <span>Bảo hành chính hãng 24 tháng & Đánh bóng xà cừ trọn đời</span>
              </div>
              <div className="perk-row">
                <RotateCcw size={18} className="perk-icon" />
                <span>Đổi mới trong 7 ngày nếu có lỗi kỹ thuật từ nhà sản xuất</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabbed Content Sections: Description, Specs, Warranty */}
        <div className="product-tabs-section">
          <div className="tabs-nav-bar">
            <button
              className={`tab-nav-btn ${activeTab === 'desc' ? 'active' : ''}`}
              onClick={() => setActiveTab('desc')}
            >
              MÔ TẢ CHI TIẾT
            </button>
            <button
              className={`tab-nav-btn ${activeTab === 'specs' ? 'active' : ''}`}
              onClick={() => setActiveTab('specs')}
            >
              THÔNG SỐ KỸ THUẬT
            </button>
            <button
              className={`tab-nav-btn ${activeTab === 'warranty' ? 'active' : ''}`}
              onClick={() => setActiveTab('warranty')}
            >
              BẢO HÀNH & ĐỔI TRẢ
            </button>
          </div>

          <div className="tab-pane-content">
            {activeTab === 'desc' && (
              <div className="desc-pane">
                <div className="desc-text-flow">
                  {product.description?.split('\n\n').map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>
                <div className="desc-story-highlight">
                  <h4>NGHỆ THUẬT KHẢM XÀ CỪ ĐẠI DƯƠNG</h4>
                  <p>
                    Vỏ ốc và ngọc trai được khai thác tự nhiên với tuổi thọ nhiều năm dưới đáy biển sâu. Sau đó được các nghệ nhân kinh nghiệm của BLUSAIGON gọt mỏng từng lát xà cừ đạt độ dày chuẩn xác dưới 0.3mm và ghép tay hoàn toàn không dùng máy CNC hàng loạt. Chính vì vậy, mỗi sản phẩm khi cầm trên tay đều mang câu chuyện riêng biệt của người sở hữu.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'specs' && (
              <div className="specs-pane">
                <table className="specs-table">
                  <tbody>
                    {product.specs?.map((spec, i) => (
                      <tr key={i}>
                        <td className="spec-label">{spec.label}</td>
                        <td className="spec-value">{spec.value}</td>
                      </tr>
                    ))}
                    {product.size && (
                      <tr>
                        <td className="spec-label">Kích thước</td>
                        <td className="spec-value">{product.size}</td>
                      </tr>
                    )}
                    {product.weight && (
                      <tr>
                        <td className="spec-label">Trọng lượng</td>
                        <td className="spec-value">{product.weight}</td>
                      </tr>
                    )}
                    {product.refill && (
                      <tr>
                        <td className="spec-label">Loại ruột thay thế</td>
                        <td className="spec-value">{product.refill}</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'warranty' && (
              <div className="warranty-pane">
                <div className="warranty-content">
                  <h4>CHÍNH SÁCH BẢO HÀNH ĐỘC QUYỀN TẠI BLUSAIGON</h4>
                  <ul>
                    <li>
                      <strong>Thời gian bảo hành:</strong> 24 tháng cho mọi lỗi kỹ thuật liên quan đến cụm xoay, ngòi bút và cơ cấu tiếp xúc.
                    </li>
                    <li>
                      <strong>Dịch vụ làm mới trọn đời:</strong> Miễn phí đánh bóng, bảo dưỡng phục hồi độ sáng bóng của bề mặt xà cừ tại hệ thống boutique BLUSAIGON.
                    </li>
                    <li>
                      <strong>Chính sách đổi trả:</strong> Đổi mới 1:1 trong vòng 7 ngày đầu tiên nếu sản phẩm phát sinh lỗi do nhà sản xuất.
                    </li>
                    <li>
                      <strong>Hỗ trợ khắc lại:</strong> Hỗ trợ thay chi tiết nếu khách hàng có nhu cầu khắc lại nội dung mới khi chuyển tặng.
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        <div className="related-products-section">
          <h2 className="head-title-style">SẢN PHẨM CÙNG BỘ SƯU TẬP</h2>
          <div className="products-grid">
            {relatedProducts.map((p) => (
              <div key={p.id} className="product-card">
                <div className="product-media">
                  {p.badge && <span className="product-badge">{p.badge}</span>}
                  <a
                    href={`/product/${p.slug}`}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate(`/product/${p.slug}`);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="product-img-link"
                  >
                    <img src={p.primaryImage} alt={p.name} className="product-img primary" loading="lazy" />
                  </a>
                </div>
                <div className="product-card-body">
                  <span className="product-vendor">BLUS</span>
                  <h3 className="product-card-title">
                    <a
                      href={`/product/${p.slug}`}
                      onClick={(e) => {
                        e.preventDefault();
                        onNavigate(`/product/${p.slug}`);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                    >
                      {p.name}
                    </a>
                  </h3>
                  <div className="product-price-box">
                    <span className="current-price">{formatVND(p.price)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
