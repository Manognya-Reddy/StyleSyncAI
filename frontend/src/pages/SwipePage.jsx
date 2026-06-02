import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import SwipeCard from '../components/SwipeCard';

export default function SwipePage() {
  const { user, swipes, recordSwipe, saveItem } = useApp();
  const [products, setProducts] = useState([]);
  const [index, setIndex] = useState(0);
  const [toast, setToast] = useState('');

  useEffect(() => {
    setIndex(0);
  }, [user]);

  useEffect(() => {
    fetch('/api/products?limit=20')
      .then(r => r.json())
      .then(setProducts)
      .catch(() => {
        setProducts([
          {id:1,name:"Oversized Linen Shirt",category:"tops",price:1299,image:"https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400&q=80",tags:["casual","minimal","neutral"],brand:"Studio Basics"},
          {id:2,name:"High-Waist Straight Jeans",category:"bottoms",price:2199,image:"https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&q=80",tags:["casual","denim","classic"],brand:"Denim Co."},
          {id:3,name:"Slip Midi Dress",category:"dresses",price:1899,image:"https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&q=80",tags:["elegant","party","minimal"],brand:"Silk & Co."},
          {id:4,name:"Cropped Blazer",category:"outerwear",price:2999,image:"https://images.unsplash.com/photo-1594938298603-c8148c4b4f5d?w=400&q=80",tags:["formal","office","chic"],brand:"Sharp Tailors"},
          {id:5,name:"Ribbed Crop Top",category:"tops",price:699,image:"https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=400&q=80",tags:["casual","summer","minimal"],brand:"Basics Studio"},
          {id:6,name:"Wide Leg Trousers",category:"bottoms",price:1799,image:"https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&q=80",tags:["formal","office","chic"],brand:"Fluid Forms"},
          {id:7,name:"Floral Wrap Dress",category:"dresses",price:1599,image:"https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&q=80",tags:["casual","feminine","summer"],brand:"Bloom Studio"},
          {id:8,name:"Chunky Knit Sweater",category:"tops",price:2199,image:"https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&q=80",tags:["winter","cozy","casual"],brand:"Wool & Co."},
        ]);
      });
  }, []);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2000);
  };

  const handleSwipe = async (action) => {
    if (index >= products.length) return;
    await recordSwipe(products[index].id, action);
    setIndex(index + 1);
    if (action === 'like') {
      showToast('❤ Added to likes');
    }
  };

  const handleSave = () => {
    if (index >= products.length) return;
    saveItem(products[index]);
    showToast('🔖 Saved to collection');
  };

  const remaining = products.slice(index);
  const swiped = swipes.liked.length + swipes.disliked.length;

  return (
    <div>
      <div className="swipe-header">
        <div>
          <h1>Discover</h1>
          <p>{swiped} items swiped</p>
        </div>
        <div className="swipe-count">{remaining.length} remaining</div>
      </div>

      <div className="card-stack">
        {remaining.length === 0 ? (
          <div className="empty-stack">
            <h2>You've seen it all!</h2>
            <button onClick={() => setIndex(0)} className="primary-btn reset-btn">Discover again</button>
          </div>
        ) : (
          remaining.slice(0, 3).reverse().map((product, i, arr) => {
            let transformStyle = undefined;
            if (i < arr.length - 1) {
              const scale = 0.94 - (arr.length - 1 - i - 1) * 0.04;
              const translateY = (arr.length - 1 - i) * 12;
              transformStyle = {
                zIndex: i,
                transform: `scale(${scale}) translateY(${translateY}px)`,
                transition: 'transform 0.3s ease',
              };
            } else {
              transformStyle = {
                zIndex: i,
              };
            }
            
            return (
              <SwipeCard
                key={product.id}
                product={product}
                isTop={i === arr.length - 1}
                onSwipe={handleSwipe}
                style={transformStyle}
              />
            );
          })
        )}
      </div>

      {remaining.length > 0 && (
        <div className="swipe-actions">
          <button className="action-btn" onClick={() => handleSwipe('dislike')}>✕</button>
          <button className="action-btn" onClick={handleSave}>🔖</button>
          <button className="action-btn" onClick={() => handleSwipe('like')}>♥</button>
        </div>
      )}

      {toast && (
        <div className="toast-message">
          {toast}
        </div>
      )}
    </div>
  );
}