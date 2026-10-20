import React, { useState, useEffect } from 'react';
import { Search, User, ShoppingBag, Menu, X, ChevronDown, ChevronRight } from 'lucide-react';
import { mockNavigation } from '../data/mockData';

export default function Header({
  cartCount,
  onOpenCart,
  onOpenSearch,
  currentRoute,
  onNavigate,
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedMobileItem, setExpandedMobileItem] = useState(null);
  const [currentLang, setCurrentLang] = useState('vi');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (onNavigate) {
      onNavigate(href);
    }
  };

  const toggleMobileSubmenu = (title) => {
    setExpandedMobileItem(expandedMobileItem === title ? null : title);
  };

  return (
    <>
      {/* Language / Utility Topbar */}
      <div className="header-topbar">
        <div className="container header-topbar-inner">
          <div className="topbar-left">
            <span>Thương hiệu bút ngọc trai & quà tặng chế tác thủ công cao cấp Việt Nam</span>
          </div>
          <div className="topbar-right">
            <div className="lang-switcher">
              <button
                className={`lang-btn ${currentLang === 'vi' ? 'active' : ''}`}
                onClick={() => setCurrentLang('vi')}
              >
                <span className="flag-icon vn-flag">🇻🇳</span> Tiếng Việt
              </button>
              <span className="lang-divider">|</span>
              <button
                className={`lang-btn ${currentLang === 'en' ? 'active' : ''}`}
                onClick={() => setCurrentLang('en')}
              >
                <span className="flag-icon en-flag">🇬🇧</span> English
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Header */}
      <header className={`main-header ${isScrolled ? 'header-sticky' : ''}`}>
        <div className="container main-header-inner">
          {/* Mobile Menu Button */}
          <button
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Mở menu"
          >
            <Menu size={24} />
          </button>

          {/* Logo */}
          <div className="header-logo">
            <a
              href="/"
              onClick={(e) => handleNavClick(e, '/')}
              className="logo-link"
              title="BLUS - Để Lại Dấu Ấn"
            >
              <img
                src="//theme.hstatic.net/1000345452/1001290055/14/logo.png?v=1503"
                alt="BLUSAIGON"
                width="150"
                height="49"
                className="logo-img"
              />
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="desktop-nav">
            <ul className="nav-list">
              {mockNavigation.map((item) => (
                <li
                  key={item.title}
                  className={`nav-item ${item.hasSubmenu ? 'has-dropdown' : ''} ${
                    item.isMega ? 'is-mega' : ''
                  }`}
                >
                  <a
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="nav-link"
                  >
                    <span>{item.title}</span>
                    {item.hasSubmenu && <ChevronDown size={14} className="dropdown-arrow" />}
                  </a>

                  {/* Mega Menu Dropdown */}
                  {item.hasSubmenu && item.isMega && item.columns && (
                    <div className="mega-menu">
                      <div className="mega-menu-inner container">
                        {item.columns.map((col) => (
                          <div key={col.heading} className="mega-col">
                            <h4 className="mega-heading">
                              <a
                                href={col.href}
                                onClick={(e) => handleNavClick(e, col.href)}
                              >
                                {col.heading}
                              </a>
                            </h4>
                            <ul className="mega-sublist">
                              {col.items.map((subItem) => (
                                <li key={subItem.title} className="mega-subitem">
                                  <a
                                    href={subItem.href}
                                    onClick={(e) => handleNavClick(e, subItem.href)}
                                    className="mega-sublink"
                                  >
                                    {subItem.title}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Standard Dropdown */}
                  {item.hasSubmenu && !item.isMega && item.items && (
                    <div className="standard-dropdown">
                      <ul className="standard-sublist">
                        {item.items.map((sub) => (
                          <li key={sub.title} className="standard-subitem">
                            <a
                              href={sub.href}
                              onClick={(e) => handleNavClick(e, sub.href)}
                              className="standard-sublink"
                            >
                              {sub.title}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Header Action Icons */}
          <div className="header-actions">
            {/* Search Trigger */}
            <button
              className="action-icon-btn search-btn"
              onClick={onOpenSearch}
              aria-label="Tìm kiếm sản phẩm"
              title="Tìm kiếm"
            >
              <Search size={20} />
            </button>

            {/* Account Link */}
            <div className="account-dropdown-wrapper">
              <button
                className="action-icon-btn account-btn"
                aria-label="Tài khoản"
                title="Tài khoản"
              >
                <User size={20} />
              </button>
              <div className="account-dropdown-menu">
                <a href="#login" className="account-menu-link">Đăng nhập</a>
                <a href="#register" className="account-menu-link">Đăng ký thành viên</a>
              </div>
            </div>

            {/* Shopping Cart Trigger */}
            <button
              className="action-icon-btn cart-btn"
              onClick={onOpenCart}
              aria-label="Giỏ hàng"
              title="Giỏ hàng"
            >
              <ShoppingBag size={20} />
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <div className={`mobile-drawer-overlay ${mobileMenuOpen ? 'open' : ''}`} onClick={() => setMobileMenuOpen(false)}>
        <div className="mobile-drawer" onClick={(e) => e.stopPropagation()}>
          <div className="mobile-drawer-header">
            <img
              src="//theme.hstatic.net/1000345452/1001290055/14/logo.png?v=1503"
              alt="BLUS"
              height="36"
              className="mobile-drawer-logo"
            />
            <button
              className="close-drawer-btn"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Đóng menu"
            >
              <X size={22} />
            </button>
          </div>

          <div className="mobile-drawer-body">
            <ul className="mobile-nav-list">
              {mockNavigation.map((item) => (
                <li key={item.title} className="mobile-nav-item">
                  <div className="mobile-nav-row">
                    <a
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href)}
                      className="mobile-nav-link"
                    >
                      {item.title}
                    </a>
                    {item.hasSubmenu && (
                      <button
                        className="mobile-expand-btn"
                        onClick={() => toggleMobileSubmenu(item.title)}
                        aria-label="Mở danh mục con"
                      >
                        <ChevronDown
                          size={18}
                          className={`expand-arrow ${
                            expandedMobileItem === item.title ? 'rotated' : ''
                          }`}
                        />
                      </button>
                    )}
                  </div>

                  {/* Submenu Accordion */}
                  {item.hasSubmenu && expandedMobileItem === item.title && (
                    <div className="mobile-submenu-accordion">
                      {item.isMega && item.columns ? (
                        item.columns.map((col) => (
                          <div key={col.heading} className="mobile-subcol">
                            <div className="mobile-col-heading">{col.heading}</div>
                            <ul className="mobile-subcol-list">
                              {col.items.map((sub) => (
                                <li key={sub.title}>
                                  <a
                                    href={sub.href}
                                    onClick={(e) => handleNavClick(e, sub.href)}
                                    className="mobile-subcol-link"
                                  >
                                    {sub.title}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))
                      ) : (
                        <ul className="mobile-subcol-list">
                          {item.items?.map((sub) => (
                            <li key={sub.title}>
                              <a
                                href={sub.href}
                                onClick={(e) => handleNavClick(e, sub.href)}
                                className="mobile-subcol-link"
                              >
                                {sub.title}
                              </a>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}
                </li>
              ))}
            </ul>

            <div className="mobile-drawer-footer">
              <div className="mobile-contact-line">
                <strong>Hotline:</strong> <a href="tel:0944801771">0944 801 771</a>
              </div>
              <div className="mobile-contact-line">
                <strong>Showroom:</strong> 129E Nguyễn Đình Chính, P. Phú Nhuận, TP.HCM
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
