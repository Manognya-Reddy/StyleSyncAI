import React from 'react';
import { useApp } from '../context/AppContext';

export default function SavedPage() {
  const { saved, unsaveItem } = useApp();
  
  return (
    <div>
      <div className="saved-header">
        <h1>Saved Pieces</h1>
        <p>{saved.length} pieces in your collection</p>
      </div>
      
      {saved.length === 0 ? (
        <div className="empty-saved">
          <div className="empty-icon">🔖</div>
          <p>No saved pieces yet</p>
          <p>Tap the bookmark while discovering</p>
        </div>
      ) : (
        <div className="saved-grid">
          {saved.map((p) => {
            return (
              <div key={p.id} className="saved-item">
                <img src={p.image} alt={p.name}/>
                <div className="saved-item-info">
                  <div className="saved-item-name">{p.name}</div>
                  <div className="saved-item-price">₹{p.price.toLocaleString()}</div>
                  <button onClick={() => unsaveItem(p.id)} className="remove-btn">
                    Remove
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}