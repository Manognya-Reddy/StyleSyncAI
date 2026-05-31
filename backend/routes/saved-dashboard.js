const express = require('express');
const allProducts = require('../data/products');

const savedRouter = (store) => {
  const router = express.Router();
  
  const getOrInit = (uid) => {
    if(!store.saved[uid]) {
      store.saved[uid] = [];
    }
    return store.saved[uid];
  };

  router.get('/:userId', (req, res) => {
    const ids = getOrInit(req.params.userId);
    
    const result = [];
    for(let i = 0; i < allProducts.length; i++) {
      for(let j = 0; j < ids.length; j++) {
        if(allProducts[i].id === ids[j]) {
          result.push(allProducts[i]);
          break;
        }
      }
    }
    
    res.json(result);
  });
  
  router.post('/', (req, res) => {
    const { userId, productId } = req.body;
    const saved = getOrInit(userId);
    
    let alreadyExists = false;
    for(let i = 0; i < saved.length; i++) {
      if(saved[i] === productId) {
        alreadyExists = true;
        break;
      }
    }
    
    if(!alreadyExists) {
      saved.push(productId);
    }
    
    res.json({ success: true, saved: saved });
  });
  
  router.delete('/', (req, res) => {
    const { userId, productId } = req.body;
    
    if(!store.saved[userId]) {
      store.saved[userId] = [];
    }
    
    const newSaved = [];
    for(let i = 0; i < store.saved[userId].length; i++) {
      if(store.saved[userId][i] !== productId) {
        newSaved.push(store.saved[userId][i]);
      }
    }
    store.saved[userId] = newSaved;
    
    res.json({ success: true });
  });
  
  return router;
};

const dashboardRouter = (store) => {
  const router = express.Router();
  
  router.get('/:userId', (req, res) => {
    const { userId } = req.params;
    
    let swipes = { liked: [], disliked: [] };
    if(store.swipes[userId]) {
      swipes = store.swipes[userId];
    }
    
    let saved = [];
    if(store.saved[userId]) {
      saved = store.saved[userId];
    }
    
    const likedProducts = [];
    for(let i = 0; i < allProducts.length; i++) {
      for(let j = 0; j < swipes.liked.length; j++) {
        if(allProducts[i].id === swipes.liked[j]) {
          likedProducts.push(allProducts[i]);
          break;
        }
      }
    }

    const tagFreq = {};
    const catFreq = {};
    
    for(let i = 0; i < likedProducts.length; i++) {
      for(let j = 0; j < likedProducts[i].tags.length; j++) {
        const tag = likedProducts[i].tags[j];
        if(tagFreq[tag]) {
          tagFreq[tag] = tagFreq[tag] + 1;
        } else {
          tagFreq[tag] = 1;
        }
      }
      
      const cat = likedProducts[i].category;
      if(catFreq[cat]) {
        catFreq[cat] = catFreq[cat] + 1;
      } else {
        catFreq[cat] = 1;
      }
    }

    const tagEntries = [];
    for(let tag in tagFreq) {
      tagEntries.push({ tag: tag, count: tagFreq[tag] });
    }
    
    for(let i = 0; i < tagEntries.length - 1; i++) {
      for(let j = 0; j < tagEntries.length - i - 1; j++) {
        if(tagEntries[j].count < tagEntries[j+1].count) {
          const temp = tagEntries[j];
          tagEntries[j] = tagEntries[j+1];
          tagEntries[j+1] = temp;
        }
      }
    }
    
    const topTags = [];
    for(let i = 0; i < 8 && i < tagEntries.length; i++) {
      topTags.push({ tag: tagEntries[i].tag, count: tagEntries[i].count });
    }

    const catEntries = [];
    for(let cat in catFreq) {
      catEntries.push({ category: cat, count: catFreq[cat] });
    }
    
    for(let i = 0; i < catEntries.length - 1; i++) {
      for(let j = 0; j < catEntries.length - i - 1; j++) {
        if(catEntries[j].count < catEntries[j+1].count) {
          const temp = catEntries[j];
          catEntries[j] = catEntries[j+1];
          catEntries[j+1] = temp;
        }
      }
    }
    
    const topCategories = [];
    for(let i = 0; i < catEntries.length; i++) {
      topCategories.push({ category: catEntries[i].category, count: catEntries[i].count });
    }

    const recentLikes = [];
    for(let i = likedProducts.length - 1; i >= 0 && recentLikes.length < 4; i--) {
      recentLikes.push(likedProducts[i]);
    }

    res.json({
      stats: {
        totalLiked: swipes.liked.length,
        totalDisliked: swipes.disliked.length,
        totalSaved: saved.length,
        totalSwiped: swipes.liked.length + swipes.disliked.length
      },
      preferences: {
        topTags: topTags,
        topCategories: topCategories
      },
      recentLikes: recentLikes
    });
  });
  
  return router;
};

module.exports = { savedRouter, dashboardRouter };