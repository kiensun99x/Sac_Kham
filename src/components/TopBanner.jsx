import React, { useState } from 'react';
import { X } from 'lucide-react';

export default function TopBanner() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="top-banner">
      <div className="container top-banner-container">
        <a href="#welcome-promo" className="top-banner-text">
          Nhập mã <strong>WELCOME</strong> nhận ngay ưu đãi <strong>100.000 VND</strong> cho thành viên mới
        </a>
        <button
          className="top-banner-close"
          onClick={() => setVisible(false)}
          aria-label="Đóng thông báo"
        >
          <X size={15} />
        </button>
      </div>
    </div>
  );
}
