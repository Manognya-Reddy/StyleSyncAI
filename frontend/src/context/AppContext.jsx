import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [swipes, setSwipes] = useState({ liked: [], disliked: [] });
  const [saved, setSaved] = useState([]);
  const login = (userData, tok) => {
  setUser(userData);
  setToken(tok);
  setSwipes({ liked: [], disliked: [] });
  setSaved([]);
  localStorage.setItem('aura_token', tok);
  localStorage.setItem('aura_user', JSON.stringify(userData));
};
  const logout = () => {
    setUser(null);
    setToken(null);
    setSwipes({ liked: [], disliked: [] });
    setSaved([]);
    localStorage.removeItem('aura_token');
    localStorage.removeItem('aura_user');
  };

  const recordSwipe = async (productId, action) => {
    let newLiked = swipes.liked;
    let newDisliked = swipes.disliked;
    
    if (action === 'like') {
      let alreadyLiked = false;
      for (let i = 0; i < newLiked.length; i++) {
        if (newLiked[i] === productId) alreadyLiked = true;
      }
      if (!alreadyLiked) {
        newLiked.push(productId);
      }
      
      let filteredDisliked = [];
      for (let i = 0; i < newDisliked.length; i++) {
        if (newDisliked[i] !== productId) {
          filteredDisliked.push(newDisliked[i]);
        }
      }
      newDisliked = filteredDisliked;
      
      setSwipes({ liked: newLiked, disliked: newDisliked });
    } else {
      let alreadyDisliked = false;
      for (let i = 0; i < newDisliked.length; i++) {
        if (newDisliked[i] === productId) alreadyDisliked = true;
      }
      if (!alreadyDisliked) {
        newDisliked.push(productId);
      }
      
      let filteredLiked = [];
      for (let i = 0; i < newLiked.length; i++) {
        if (newLiked[i] !== productId) {
          filteredLiked.push(newLiked[i]);
        }
      }
      newLiked = filteredLiked;
      
      setSwipes({ liked: newLiked, disliked: newDisliked });
    }
    
    try {
      const response = await fetch('/api/swipe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user?.id, productId, action })
      });
    } catch(e) {
      console.log('error', e);
    }
  };

  const saveItem = (product) => {
    let alreadyExists = false;
    for (let i = 0; i < saved.length; i++) {
      if (saved[i].id === product.id) {
        alreadyExists = true;
        break;
      }
    }
    if (!alreadyExists) {
      const newSaved = [...saved, product];
      setSaved(newSaved);
    }
  };

  const unsaveItem = (productId) => {
    const newSaved = [];
    for (let i = 0; i < saved.length; i++) {
      if (saved[i].id !== productId) {
        newSaved.push(saved[i]);
      }
    }
    setSaved(newSaved);
  };

  useEffect(() => {
    const savedToken = localStorage.getItem('aura_token');
    const savedUser = localStorage.getItem('aura_user');
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
  }, []);

  return (
    <AppContext.Provider value={{ user, token, swipes, saved, login, logout, recordSwipe, saveItem, unsaveItem }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  return useContext(AppContext);
};