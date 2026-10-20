import React, { useState } from 'react';
import { X, Sparkles, Check } from 'lucide-react';

export default function EngraveModal({ isOpen, onClose, onApplyEngraving, initialText = '' }) {
  const [engraveText, setEngraveText] = useState(initialText || 'Nguyễn Thành Nam');
  const [selectedFont, setSelectedFont] = useState('serif');
  const [selectedColor, setSelectedColor] = useState('gold');

  if (!isOpen) return null;

  const fontOptions = [
    { id: 'serif', name: 'Antiqua Serif', style: { fontFamily: "'Noto Serif Display', Georgia, serif", fontStyle: 'italic' } },
    { id: 'script', name: 'Thư Pháp Mềm Mại', style: { fontFamily: "'Brush Script MT', 'Dancing Script', cursive", fontStyle: 'italic' } },
    { id: 'modern', name: 'Hiện Đại (Sans)', style: { fontFamily: "'Montserrat', sans-serif", fontWeight: '600', letterSpacing: '2px' } },
    { id: 'classic', name: 'Chữ In Hoa Cổ Điển', style: { fontFamily: "'Noto Serif Display', serif", textTransform: 'uppercase', letterSpacing: '3px' } },
  ];

  const colorOptions = [
    { id: 'gold', name: 'Ánh Vàng 18K (Gold)', hex: '#d4af37', textClass: 'text-gold' },
    { id: 'silver', name: 'Ánh Bạc Bạch Kim (Silver)', hex: '#e2e8f0', textClass: 'text-silver' },
  ];

  const handleApply = () => {
    if (onApplyEngraving) {
      onApplyEngraving({
        text: engraveText,
        font: selectedFont,
        color: selectedColor === 'gold' ? 'Vàng 18K' : 'Bạc Bạch Kim',
      });
    }
    onClose();
  };

  return (
    <div className="engrave-modal-overlay" onClick={onClose}>
      <div className="engrave-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="engrave-modal-header">
          <div className="engrave-title-box">
            <Sparkles size={22} className="engrave-header-icon" />
            <div>
              <h3 className="engrave-modal-title">DỊCH VỤ KHẮC TÊN MIỄN PHÍ</h3>
              <p className="engrave-modal-sub">Cá nhân hóa tặng phẩm độc bản theo dấu ấn riêng của bạn</p>
            </div>
          </div>
          <button className="engrave-close-btn" onClick={onClose} aria-label="Đóng">
            <X size={22} />
          </button>
        </div>

        <div className="engrave-modal-body">
          {/* Live Pen Simulation Canvas */}
          <div className="pen-preview-stage">
            <div className="pen-preview-label">MÔ PHỎNG NÉT KHẮC TRỰC QUAN</div>
            <div className="pen-mockup-wrapper">
              <div className="pen-body-graphic">
                <div className="pen-cap">
                  <div className="pen-clip" />
                </div>
                <div className="pen-barrel">
                  <div
                    className={`engraved-text-render ${selectedColor}`}
                    style={fontOptions.find((f) => f.id === selectedFont)?.style}
                  >
                    {engraveText || 'Nội dung khắc tên'}
                  </div>
                </div>
              </div>
            </div>
            <span className="pen-preview-note">
              * Vị trí khắc sắc nét bằng công nghệ Fiber Laser hiện đại của Đức trên nền xà cừ hoặc kim loại.
            </span>
          </div>

          {/* Controls */}
          <div className="engrave-controls-grid">
            {/* Input Name */}
            <div className="control-group">
              <label className="control-label">Nội dung khắc (Họ tên / Lời chúc / Chức danh):</label>
              <input
                type="text"
                maxLength={30}
                value={engraveText}
                onChange={(e) => setEngraveText(e.target.value)}
                placeholder="VD: Nguyễn Văn An - BLUS"
                className="engrave-input-field"
              />
              <span className="char-count">{engraveText.length}/30 ký tự</span>
            </div>

            {/* Choose Font */}
            <div className="control-group">
              <label className="control-label">Chọn kiểu chữ:</label>
              <div className="font-options-list">
                {fontOptions.map((font) => (
                  <button
                    key={font.id}
                    className={`font-chip ${selectedFont === font.id ? 'active' : ''}`}
                    onClick={() => setSelectedFont(font.id)}
                    style={font.style}
                  >
                    {font.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Choose Color */}
            <div className="control-group">
              <label className="control-label">Màu sắc nét khắc:</label>
              <div className="color-options-list">
                {colorOptions.map((col) => (
                  <button
                    key={col.id}
                    className={`color-chip ${selectedColor === col.id ? 'active' : ''}`}
                    onClick={() => setSelectedColor(col.id)}
                  >
                    <span className="color-dot" style={{ backgroundColor: col.hex }} />
                    <span>{col.name}</span>
                    {selectedColor === col.id && <Check size={14} className="check-icon" />}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="engrave-modal-footer">
          <button className="btn-cancel" onClick={onClose}>
            Hủy bỏ
          </button>
          <button className="btn-luxury-style" onClick={handleApply}>
            ÁP DỤNG MẪU KHẮC NÀY
          </button>
        </div>
      </div>
    </div>
  );
}
