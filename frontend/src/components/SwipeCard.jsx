import React, { useRef, useState } from 'react';

export default function SwipeCard({ product, onSwipe, style, isTop }) {
  const cardRef = useRef();
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [hint, setHint] = useState(null);
  const startPos = useRef({ x: 0, y: 0 });

  const onPointerDown = (e) => {
    if (!isTop) return;
    setDragging(true);
    startPos.current.x = e.clientX;
    startPos.current.y = e.clientY;
    cardRef.current?.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e) => {
    if (!dragging) return;
    const dx = e.clientX - startPos.current.x;
    const dy = e.clientY - startPos.current.y;
    setOffset({ x: dx, y: dy });
    
    if (dx > 40) {
      setHint('like');
    } else if (dx < -40) {
      setHint('dislike');
    } else {
      setHint(null);
    }
  };

  const onPointerUp = () => {
    if (!dragging) return;
    setDragging(false);
    
    if (offset.x > 90) {
      onSwipe('like');
    } else if (offset.x < -90) {
      onSwipe('dislike');
    } else {
      setOffset({ x: 0, y: 0 });
      setHint(null);
    }
  };

  const rotation = offset.x * 0.08;
  
  const cardStyle = {
    ...style,
    transform: 'translate(' + offset.x + 'px, ' + offset.y + 'px) rotate(' + rotation + 'deg)',
    transition: dragging ? 'none' : 'transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    cursor: isTop ? (dragging ? 'grabbing' : 'grab') : 'default',
    touchAction: 'none',
  };

  return (
    <div
      ref={cardRef}
      className={'clothing-card ' + (dragging ? 'dragging' : '')}
      style={cardStyle}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
    >
      {hint === 'like' && (
        <div style={{position:'absolute',top:'50%',left:'16px',transform:'translateY(-50%)',border:'2px solid #4CAF50',color:'#4CAF50',padding:'6px 12px',borderRadius:'8px',fontWeight:'500',fontSize:'14px',letterSpacing:'1px',zIndex:10}}>
          LOVE ♥
        </div>
      )}
      {hint === 'dislike' && (
        <div style={{position:'absolute',top:'50%',right:'16px',transform:'translateY(-50%)',border:'2px solid #F44336',color:'#F44336',padding:'6px 12px',borderRadius:'8px',fontWeight:'500',fontSize:'14px',letterSpacing:'1px',zIndex:10}}>
          PASS ✕
        </div>
      )}
      <img 
        className="card-image" 
        src={product.image} 
        alt={product.name} 
        draggable={false}
        onError={(e) => { 
          e.target.style.display = 'none'; 
        }}
      />
      <div className="card-info">
        <div className="card-name">{product.name}</div>
        <div style={{display:'flex',justifyContent:'space-between',marginTop:'4px'}}>
          <div className="card-price">₹{product.price.toLocaleString()}</div>
          <div style={{fontSize:'11px',color:'var(--muted)'}}>{product.brand}</div>
        </div>
        <div className="card-tags">
          {product.tags.slice(0, 4).map(function(t) {
            return <span key={t} className="tag">{t}</span>;
          })}
        </div>
      </div>
    </div>
  );
}