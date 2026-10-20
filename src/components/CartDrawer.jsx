import React from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onNavigate,
}) {
  if (!isOpen) return null;

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const freeShippingThreshold = 1000000;
  const progressPercent = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const amountRemaining = Math.max(0, freeShippingThreshold - subtotal);

  const formatVND = (num) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(num);
  };

  const handleCheckout = () => {
    alert('Cảm ơn bạn! Đơn hàng mô phỏng đã được ghi nhận thành công.\nTổng giá trị: ' + formatVND(subtotal));
  };

  const handleProductClick = (e, slug) => {
    e.preventDefault();
    onClose();
    if (onNavigate) {
      onNavigate(`/product/${slug}`);
    }
  };

  return (
    <div className="cart-drawer-overlay" onClick={onClose}>
      <div className="cart-drawer" onClick={(e) => e.stopPropagation()}>
        <div className="cart-drawer-header">
          <div className="drawer-title-box">
            <ShoppingBag size={20} className="drawer-cart-icon" />
            <h3 className="drawer-title">GIỎ HÀNG CỦA BẠN</h3>
            <span className="drawer-count">({cartItems.reduce((acc, item) => acc + item.quantity, 0)})</span>
          </div>
          <button className="cart-close-btn" onClick={onClose} aria-label="Đóng giỏ hàng">
            <X size={22} />
          </button>
        </div>

        {/* Free Shipping Progress */}
        <div className="shipping-progress-box">
          {amountRemaining > 0 ? (
            <p className="shipping-text">
              Mua thêm <strong>{formatVND(amountRemaining)}</strong> để được <strong>MIỄN PHÍ VẬN CHUYỂN</strong> toàn quốc!
            </p>
          ) : (
            <p className="shipping-text success">
              🎉 Chúc mừng! Đơn hàng của bạn đã đủ điều kiện <strong>MIỄN PHÍ VẬN CHUYỂN</strong>!
            </p>
          )}
          <div className="progress-bar-track">
            <div className="progress-bar-fill" style={{ width: `${progressPercent}%` }} />
          </div>
        </div>

        {/* Cart Items List */}
        <div className="cart-drawer-body">
          {cartItems.length === 0 ? (
            <div className="empty-cart-state">
              <ShoppingBag size={54} className="empty-icon" />
              <p className="empty-text">Hiện chưa có sản phẩm nào trong giỏ hàng của bạn.</p>
              <button
                className="btn-luxury-style"
                onClick={() => {
                  onClose();
                  onNavigate('/collections/all');
                }}
              >
                KHÁM PHÁ BỘ SƯU TẬP
              </button>
            </div>
          ) : (
            <div className="cart-items-list">
              {cartItems.map((item) => (
                <div key={item.id} className="cart-item-card">
                  <a
                    href={`/product/${item.slug}`}
                    onClick={(e) => handleProductClick(e, item.slug)}
                    className="cart-item-thumb"
                  >
                    <img src={item.primaryImage} alt={item.name} />
                  </a>
                  <div className="cart-item-details">
                    <a
                      href={`/product/${item.slug}`}
                      onClick={(e) => handleProductClick(e, item.slug)}
                      className="cart-item-name"
                    >
                      {item.name}
                    </a>
                    {item.engravedText && (
                      <span className="cart-engraving-badge">
                        Khắc tên: "{item.engravedText}" ({item.engravedColor || 'Vàng Gold'})
                      </span>
                    )}
                    <div className="cart-item-price">{formatVND(item.price)}</div>

                    <div className="cart-item-actions">
                      <div className="quantity-control">
                        <button
                          className="qty-btn"
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          aria-label="Giảm"
                        >
                          <Minus size={13} />
                        </button>
                        <span className="qty-value">{item.quantity}</span>
                        <button
                          className="qty-btn"
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          aria-label="Tăng"
                        >
                          <Plus size={13} />
                        </button>
                      </div>

                      <button
                        className="remove-item-btn"
                        onClick={() => onRemoveItem(item.id)}
                        aria-label="Xóa sản phẩm"
                        title="Xóa"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Cart Drawer Footer */}
        {cartItems.length > 0 && (
          <div className="cart-drawer-footer">
            <div className="cart-summary-row">
              <span className="summary-label">Tạm tính:</span>
              <span className="summary-value">{formatVND(subtotal)}</span>
            </div>
            <p className="vat-notice">Giá đã bao gồm VAT và dịch vụ gói quà tiêu chuẩn BLUS.</p>

            <button className="btn-luxury-style checkout-btn" onClick={handleCheckout}>
              <span>TIẾN HÀNH ĐẶT HÀNG</span>
              <ArrowRight size={18} />
            </button>

            <button
              className="continue-shopping-btn"
              onClick={onClose}
            >
              Tiếp tục chọn thêm sản phẩm
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
