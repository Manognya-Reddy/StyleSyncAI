import React from 'react';
import { useApp } from '../context/AppContext';

export default function Navbar({ activePage, onNavigate }) {
  const { user, logout } = useApp();
  
  const handleClick = (page) => {
    onNavigate(page);
  };
  
  return (
    <nav className="navbar">
      <div className="nav-logo">AURA</div>
      
      <div className="nav-tabs">
        <button 
          className={activePage === 'swipe' ? 'nav-tab active' : 'nav-tab'} 
          onClick={() => handleClick('swipe')}
        >
          Discover
        </button>
        <button 
          className={activePage === 'chat' ? 'nav-tab active' : 'nav-tab'} 
          onClick={() => handleClick('chat')}
        >
          Stylist
        </button>
        <button 
          className={activePage === 'saved' ? 'nav-tab active' : 'nav-tab'} 
          onClick={() => handleClick('saved')}
        >
          Saved
        </button>
        <button 
          className={activePage === 'dashboard' ? 'nav-tab active' : 'nav-tab'} 
          onClick={() => handleClick('dashboard')}
        >
          Profile
        </button>
      </div>
      
      <button onClick={logout} className="logout-btn">
        {user?.name?.split(' ')[0]} ↗
      </button>
    </nav>
  );
}