const express = require('express');
const allProducts = require('../data/products');

const productsRouter = express.Router();

productsRouter.get('/', (req, res) => {
  const { category, limit, offset } = req.query;
  
  let limitNum = 20;
  if(limit) {
    limitNum = parseInt(limit);
  }
  
  let offsetNum = 0;
  if(offset) {
    offsetNum = parseInt(offset);
  }
  
  let filtered = [];
  for(let i = 0; i < allProducts.length; i++) {
    filtered.push(allProducts[i]);
  }
  
  if(category) {
    let categoryFiltered = [];
    for(let i = 0; i < filtered.length; i++) {
      if(filtered[i].category === category) {
        categoryFiltered.push(filtered[i]);
      }
    }
    filtered = categoryFiltered;
  }
  
  const result = [];
  for(let i = offsetNum; i < offsetNum + limitNum && i < filtered.length; i++) {
    result.push(filtered[i]);
  }
  
  res.json(result);
});

productsRouter.get('/:id', (req, res) => {
  let found = null;
  for(let i = 0; i < allProducts.length; i++) {
    if(allProducts[i].id === parseInt(req.params.id)) {
      found = allProducts[i];
      break;
    }
  }
  
  if(!found) {
    return res.status(404).json({ error: 'Not found' });
  }
  
  res.json(found);
});

module.exports = productsRouter;