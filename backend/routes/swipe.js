const express = require('express');

module.exports = (store) => {
  const router = express.Router();

  const getOrInitUser = (userId) => {
    if(!store.swipes[userId]) {
      store.swipes[userId] = { liked: [], disliked: [] };
    }
    return store.swipes[userId];
  };

  router.post('/', (req, res) => {
    const { userId, productId, action } = req.body;
    
    if(!userId || !productId || !action) {
      return res.status(400).json({ error: 'Missing fields' });
    }
    
    const user = getOrInitUser(userId);
    
    if(action === 'like') {
      let alreadyLiked = false;
      for(let i = 0; i < user.liked.length; i++) {
        if(user.liked[i] === productId) {
          alreadyLiked = true;
          break;
        }
      }
      
      if(!alreadyLiked) {
        user.liked.push(productId);
      }
      
      const newDisliked = [];
      for(let i = 0; i < user.disliked.length; i++) {
        if(user.disliked[i] !== productId) {
          newDisliked.push(user.disliked[i]);
        }
      }
      user.disliked = newDisliked;
      
    } else if(action === 'dislike') {
      let alreadyDisliked = false;
      for(let i = 0; i < user.disliked.length; i++) {
        if(user.disliked[i] === productId) {
          alreadyDisliked = true;
          break;
        }
      }
      
      if(!alreadyDisliked) {
        user.disliked.push(productId);
      }
      
      const newLiked = [];
      for(let i = 0; i < user.liked.length; i++) {
        if(user.liked[i] !== productId) {
          newLiked.push(user.liked[i]);
        }
      }
      user.liked = newLiked;
    }
    
    res.json({ success: true, swipes: user });
  });

  router.get('/:userId', (req, res) => {
    const userData = getOrInitUser(req.params.userId);
    res.json(userData);
  });

  return router;
};