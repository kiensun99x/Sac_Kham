import React, { useState, useEffect } from 'react';
import './App.css';
import TopBanner from './components/TopBanner';
import Header from './components/Header';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import SearchModal from './components/SearchModal';
import EngraveModal from './components/EngraveModal';
import HomePage from './pages/HomePage';
import CollectionPage from './pages/CollectionPage';
import ProductDetailPage from './pages/ProductDetailPage';
import { mockProducts } from './data/mockData';

export default function App() {
  const [currentRoute, setCurrentRoute] = useState('/');
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      slug: 'truong-hai-inspired-edition',
      name: 'Trường Hải - Inspired Edition',
      price: 1699000,
      quantity: 1,
      primaryImage: 'https://cdn.hstatic.net/products/1000345452/ins_g___7__cddc55bba63540f98a227443cbb332dd_large.png',
      engravedText: 'BLUS - Để Lại Dấu Ấn',
      engravedColor: 'Vàng 18K',
    },
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isEngraveOpen, setIsEngraveOpen] = useState(false);
  const [customEngraving, setCustomEngraving] = useState({
    text: 'BLUS - Để Lại Dấu Ấn',
    font: 'serif',
    color: 'Vàng 18K',
  });

  // Client-side routing helper
  const navigate = (path) => {
    setCurrentRoute(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Add to cart handler
  const handleAddToCart = (product) => {
    setCartItems((prevItems) => {
      const existing = prevItems.find((item) => item.id === product.id);
      if (existing) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + (product.quantity || 1) }
            : item
        );
      }
      return [
        ...prevItems,
        {
          id: product.id,
          slug: product.slug,
          name: product.name,
          price: product.price,
          quantity: product.quantity || 1,
          primaryImage: product.primaryImage,
          engravedText: product.engravedText,
          engravedColor: product.engravedColor,
        },
      ];
    });
    setIsCartOpen(true);
  };

  // Update quantity
  const handleUpdateQuantity = (productId, newQty) => {
    if (newQty <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.id === productId ? { ...item, quantity: newQty } : item))
    );
  };

  // Remove item
  const handleRemoveItem = (productId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
  };

  // Apply custom engraving
  const handleApplyEngraving = (engraveData) => {
    setCustomEngraving(engraveData);
  };

  // Total cart count
  const cartTotalCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Render current view
  const renderCurrentPage = () => {
    if (currentRoute.startsWith('/product/')) {
      const slug = currentRoute.replace('/product/', '');
      return (
        <ProductDetailPage
          productSlug={slug}
          onNavigate={navigate}
          onAddToCart={handleAddToCart}
          onOpenEngrave={() => setIsEngraveOpen(true)}
          customEngraving={customEngraving}
        />
      );
    }

    if (currentRoute.startsWith('/collections/')) {
      const slug = currentRoute.replace('/collections/', '');
      return (
        <CollectionPage
          collectionSlug={slug}
          onNavigate={navigate}
          onAddToCart={handleAddToCart}
        />
      );
    }

    return (
      <HomePage
        onNavigate={navigate}
        onAddToCart={handleAddToCart}
        onOpenEngrave={() => setIsEngraveOpen(true)}
      />
    );
  };

  return (
    <div className="app-root">
      {/* 1. Promo Announcement */}
      <TopBanner />

      {/* 2. Header with Navigation & Cart */}
      <Header
        cartCount={cartTotalCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        currentRoute={currentRoute}
        onNavigate={navigate}
      />

      {/* 3. Main Page Content */}
      <main className="main-content-flow">
        {renderCurrentPage()}
      </main>

      {/* 4. Footer */}
      <Footer onNavigate={navigate} />

      {/* 5. Modals & Drawers */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onNavigate={navigate}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={navigate}
      />

      <EngraveModal
        isOpen={isEngraveOpen}
        onClose={() => setIsEngraveOpen(false)}
        onApplyEngraving={handleApplyEngraving}
        initialText={customEngraving.text}
      />
    </div>
  );
}
