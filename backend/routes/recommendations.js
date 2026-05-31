const express = require('express');
const allProducts = require('../data/products');

module.exports = (store) => {
  const router = express.Router();

  router.get('/:userId', (req, res) => {
    let swipes = { liked: [], disliked: [] };
    if(store.swipes[req.params.userId]) {
      swipes = store.swipes[req.params.userId];
    }
    
    const likedProducts = [];
    for(let i = 0; i < allProducts.length; i++) {
      let isLiked = false;
      for(let j = 0; j < swipes.liked.length; j++) {
        if(allProducts[i].id === swipes.liked[j]) {
          isLiked = true;
          break;
        }
      }
      if(isLiked) {
        likedProducts.push(allProducts[i]);
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
    
    const preferredTags = [];
    for(let i = 0; i < 5 && i < tagEntries.length; i++) {
      preferredTags.push(tagEntries[i].tag);
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
    
    const preferredCategories = [];
    for(let i = 0; i < catEntries.length; i++) {
      preferredCategories.push(catEntries[i].category);
    }

    const seenIds = [];
    for(let i = 0; i < swipes.liked.length; i++) {
      seenIds.push(swipes.liked[i]);
    }
    for(let i = 0; i < swipes.disliked.length; i++) {
      seenIds.push(swipes.disliked[i]);
    }
    
    const scored = [];
    for(let i = 0; i < allProducts.length; i++) {
      let seen = false;
      for(let j = 0; j < seenIds.length; j++) {
        if(allProducts[i].id === seenIds[j]) {
          seen = true;
          break;
        }
      }
      
      if(!seen) {
        let score = 0;
        
        let catMatch = false;
        for(let j = 0; j < preferredCategories.length; j++) {
          if(allProducts[i].category === preferredCategories[j]) {
            catMatch = true;
            break;
          }
        }
        if(catMatch) {
          score = score + 3;
        }
        
        for(let j = 0; j < allProducts[i].tags.length; j++) {
          for(let k = 0; k < preferredTags.length; k++) {
            if(allProducts[i].tags[j] === preferredTags[k]) {
              score = score + 1;
              break;
            }
          }
        }
        
        scored.push({ 
          id: allProducts[i].id,
          name: allProducts[i].name,
          category: allProducts[i].category,
          price: allProducts[i].price,
          image: allProducts[i].image,
          tags: allProducts[i].tags,
          brand: allProducts[i].brand,
          score: score 
        });
      }
    }
    
    for(let i = 0; i < scored.length - 1; i++) {
      for(let j = 0; j < scored.length - i - 1; j++) {
        if(scored[j].score < scored[j+1].score) {
          const temp = scored[j];
          scored[j] = scored[j+1];
          scored[j+1] = temp;
        }
      }
    }
    
    const recommendations = [];
    for(let i = 0; i < 10 && i < scored.length; i++) {
      recommendations.push(scored[i]);
    }

    res.json({ recommendations: recommendations, preferences: { preferredTags: preferredTags, preferredCategories: preferredCategories } });
  });

  return router;
};