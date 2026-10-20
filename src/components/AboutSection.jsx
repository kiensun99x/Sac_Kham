import React from 'react';

export default function AboutSection({ onNavigate }) {
  const handleClick = (e) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate('/about');
    }
  };

  return (
    <section className="about-section">
      <div className="container">
        <div className="about-grid">
          <div className="about-image-col">
            <div className="about-image-wrapper">
              <img
                src="https://theme.hstatic.net/1000345452/1001290055/14/imgtext_2_img.jpg?v=1503"
                alt="Về BLUSAIGON"
                className="about-image"
                loading="lazy"
              />
            </div>
          </div>
          <div className="about-content-col">
            <div className="about-content-box">
              <span className="about-sub-label">Tinh hoa nghệ thuật chế tác Việt Nam</span>
              <h2 className="about-title head-title-style" style={{ textAlign: 'left', margin: '0 0 20px 0' }}>
                VỀ CHÚNG TÔI
              </h2>
              <div className="about-text-body">
                <p>
                  <strong>BLUS</strong> ra đời với khát vọng đưa thương hiệu <em>"Made in Vietnam"</em> lên bản đồ thủ công thế giới.
                </p>
                <p>
                  Tặng phẩm tinh xảo trên tay quý vị được chế tác thủ công trong nhiều giờ bằng sự tận tâm, tỉ mỉ từ bàn tay nghệ nhân Việt với niềm tự hào và tinh hoa bản địa từ nghệ thuật khảm xà cừ, nghệ thuật sơn mài truyền thống nghìn năm.
                </p>
                <p>
                  Mỗi đường vân xà cừ đại dương là một độc bản bất quy tắc của tự nhiên, không bao giờ có cây bút thứ hai giống hệt nhau – như chính dấu ấn độc nhất của bạn.
                </p>
              </div>
              <a
                href="/about"
                onClick={handleClick}
                className="btn-luxury-style"
              >
                KHÁM PHÁ CÂU CHUYỆN
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
