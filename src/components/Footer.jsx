import React, { useState } from 'react';
import { MapPin, Phone, Mail, CheckCircle } from 'lucide-react';

export default function Footer({ onNavigate }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(href);
    }
  };

  return (
    <footer className="site-footer">
      <div className="container footer-main">
        <div className="footer-grid">
          {/* Col 1: Contact Info */}
          <div className="footer-col col-contact">
            <h3 className="footer-heading">BLUSAIGON</h3>
            <div className="footer-contact-list">
              <div className="contact-item">
                <MapPin size={18} className="contact-icon" />
                <div className="contact-text">
                  <strong>Địa chỉ:</strong>
                  <span>129E Nguyễn Đình Chính, Phường Phú Nhuận, TP. Hồ Chí Minh</span>
                </div>
              </div>

              <div className="contact-item">
                <Phone size={18} className="contact-icon" />
                <div className="contact-text">
                  <strong>Khách hàng cá nhân:</strong>{' '}
                  <a href="tel:0944801771" className="footer-link-active">0944 801 771</a>
                  <br />
                  <strong>Khách hàng doanh nghiệp:</strong>{' '}
                  <a href="tel:0944641771" className="footer-link-active">0944 641 771</a>
                </div>
              </div>

              <div className="contact-item">
                <Mail size={18} className="contact-icon" />
                <div className="contact-text">
                  <strong>Email:</strong>{' '}
                  <a href="mailto:sale@blusaigon.com" className="footer-link-active">sale@blusaigon.com</a>
                </div>
              </div>
            </div>

            <div className="bct-badge-box">
              <a href="http://online.gov.vn/Home/WebDetails/66655" target="_blank" rel="noreferrer" title="Đã thông báo Bộ Công Thương">
                <img
                  src="//theme.hstatic.net/1000345452/1001290055/14/logo_bct.png?v=1503"
                  alt="Đã thông báo Bộ Công Thương"
                  width="180"
                  height="68"
                  className="bct-img"
                  loading="lazy"
                />
              </a>
            </div>
          </div>

          {/* Col 2: Policies */}
          <div className="footer-col">
            <h3 className="footer-heading">CHÍNH SÁCH</h3>
            <ul className="footer-links">
              <li><a href="/terms" onClick={(e) => handleLinkClick(e, '/terms')}>Điều Khoản & Điều Kiện</a></li>
              <li><a href="/returns" onClick={(e) => handleLinkClick(e, '/returns')}>Chính Sách Đổi Trả</a></li>
              <li><a href="/warranty-pen" onClick={(e) => handleLinkClick(e, '/warranty-pen')}>Chính Sách Bảo Hành Bút</a></li>
              <li><a href="/warranty-jewelry" onClick={(e) => handleLinkClick(e, '/warranty-jewelry')}>Chính Sách Bảo Hành Trang Sức</a></li>
              <li><a href="/privacy" onClick={(e) => handleLinkClick(e, '/privacy')}>Chính Sách Bảo Mật</a></li>
            </ul>
          </div>

          {/* Col 3: Perks */}
          <div className="footer-col">
            <h3 className="footer-heading">ĐẶC QUYỀN</h3>
            <ul className="footer-links">
              <li><a href="/member" onClick={(e) => handleLinkClick(e, '/member')}>Đặc Quyền Thành Viên</a></li>
              <li><a href="/repair" onClick={(e) => handleLinkClick(e, '/repair')}>Sửa Chữa & Bảo Dưỡng Trọn Đời</a></li>
              <li><a href="/catalogue" onClick={(e) => handleLinkClick(e, '/catalogue')}>Catalogue Điện Tử 2026</a></li>
              <li><a href="/custom" onClick={(e) => handleLinkClick(e, '/custom')}>Thiết Kế Khắc Tên Độc Bản</a></li>
            </ul>
          </div>

          {/* Col 4: Newsletter & Social */}
          <div className="footer-col col-newsletter">
            <h3 className="footer-heading">ĐĂNG KÝ NHẬN TIN</h3>
            <p className="newsletter-desc">
              Nhận ngay mã ưu đãi 100.000₫ và thông tin các bộ sưu tập giới hạn mới nhất.
            </p>

            <form onSubmit={handleSubscribe} className="newsletter-form">
              <input
                type="email"
                placeholder="Nhập địa chỉ email của bạn..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="newsletter-input"
              />
              <button type="submit" className="newsletter-btn">
                Đăng ký
              </button>
            </form>

            {subscribed && (
              <div className="subscribe-success">
                <CheckCircle size={16} /> Cảm ơn bạn đã đăng ký nhận tin từ BLUS!
              </div>
            )}

            <div className="footer-social-wrapper">
              <span className="social-label">KẾT NỐI VỚI CHÚNG TÔI</span>
              <ul className="social-icons-list">
                <li>
                  <a href="https://www.facebook.com/BLUSAIGON" target="_blank" rel="noreferrer" title="Facebook">
                    <img src="//theme.hstatic.net/1000345452/1001290055/14/icon1.png?v=1503" alt="Facebook" width="30" height="30" />
                  </a>
                </li>
                <li>
                  <a href="https://www.instagram.com/blusaigon/" target="_blank" rel="noreferrer" title="Instagram">
                    <img src="//theme.hstatic.net/1000345452/1001290055/14/icon2.png?v=1503" alt="Instagram" width="30" height="30" />
                  </a>
                </li>
                <li>
                  <a href="https://www.tiktok.com/@blusaigon" target="_blank" rel="noreferrer" title="TikTok">
                    <img src="//theme.hstatic.net/1000345452/1001290055/14/icon3.png?v=1503" alt="TikTok" width="30" height="30" />
                  </a>
                </li>
                <li>
                  <a href="https://www.youtube.com/blusaigon" target="_blank" rel="noreferrer" title="YouTube">
                    <img src="//theme.hstatic.net/1000345452/1001290055/14/icon4.png?v=1503" alt="YouTube" width="30" height="30" />
                  </a>
                </li>
                <li>
                  <a href="https://vn.linkedin.com/company/blusaigon" target="_blank" rel="noreferrer" title="LinkedIn">
                    <img src="//theme.hstatic.net/1000345452/1001290055/14/icon5.png?v=1503" alt="LinkedIn" width="30" height="30" />
                  </a>
                </li>
              </ul>
            </div>

            <div className="trustbadge-box">
              <img
                src="//theme.hstatic.net/1000345452/1001290055/14/footer_trustbadge.jpg?v=1503"
                alt="Phương thức thanh toán an toàn"
                className="trustbadge-img"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p className="legal-text">
            Thương hiệu BLUS thuộc sở hữu bởi Công ty Cổ phần BLUSAIGON. Giấy chứng nhận ĐKKD số: 0312553578 do Sở Kế hoạch và Đầu tư TP. Hồ Chí Minh cấp.
          </p>
          <p className="copyright-text">
            © {new Date().getFullYear()} Bản quyền thuộc về BLUS. Thiết kế tái hiện trải nghiệm thủ công Việt Nam.
          </p>
        </div>
      </div>
    </footer>
  );
}
