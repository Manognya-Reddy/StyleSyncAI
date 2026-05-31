const express = require('express');
const allProducts = require('../data/products');

module.exports = (store) => {
  const router = express.Router();

  const parseQuery = (message) => {
    const lower = message.toLowerCase();
    
    let budget = null;
    const budgetMatch = lower.match(/(?:under|below|less than|within|upto|up to)?\s*[₹rs.]*\s*(\d+)/i);
    if(budgetMatch) {
      budget = parseInt(budgetMatch[1]);
    }
    
    const categories = [];
    const occasions = [];
    const styles = [];

    const categoryMap = { 
      dress: 'dresses', skirt: 'bottoms', jeans: 'bottoms', trouser: 'bottoms', pants: 'bottoms',
      top: 'tops', shirt: 'tops', blouse: 'tops', sweater: 'tops', tshirt: 'tops', kurta: 'ethnic',
      jacket: 'outerwear', coat: 'outerwear', blazer: 'outerwear', set: 'sets'
    };
    
    const occasionMap = { 
      party: 'party', college: 'casual', office: 'office', work: 'formal', 
      casual: 'casual', wedding: 'ethnic', date: 'elegant', vacation: 'vacation', festival: 'ethnic' 
    };
    
    const styleMap = { 
      minimal: 'minimal', classic: 'classic', edgy: 'edgy', feminine: 'feminine',
      trendy: 'trendy', comfortable: 'comfortable', oversized: 'oversized', fitted: 'fitted' 
    };

    for(let key in categoryMap) {
      if(lower.includes(key)) {
        categories.push(categoryMap[key]);
      }
    }
    
    for(let key in occasionMap) {
      if(lower.includes(key)) {
        occasions.push(occasionMap[key]);
      }
    }
    
    for(let key in styleMap) {
      if(lower.includes(key)) {
        styles.push(styleMap[key]);
      }
    }

    const uniqueCategories = [];
    for(let i = 0; i < categories.length; i++) {
      if(!uniqueCategories.includes(categories[i])) {
        uniqueCategories.push(categories[i]);
      }
    }
    
    const uniqueOccasions = [];
    for(let i = 0; i < occasions.length; i++) {
      if(!uniqueOccasions.includes(occasions[i])) {
        uniqueOccasions.push(occasions[i]);
      }
    }
    
    const uniqueStyles = [];
    for(let i = 0; i < styles.length; i++) {
      if(!uniqueStyles.includes(styles[i])) {
        uniqueStyles.push(styles[i]);
      }
    }

    return {
      budget: budget,
      categories: uniqueCategories,
      occasions: uniqueOccasions,
      styles: uniqueStyles
    };
  };

  const filterProducts = (parsed, userPrefs) => {
    let filtered = [];
    for(let i = 0; i < allProducts.length; i++) {
      filtered.push(allProducts[i]);
    }
    
    if(parsed.budget) {
      let newFiltered = [];
      for(let i = 0; i < filtered.length; i++) {
        if(filtered[i].price <= parsed.budget) {
          newFiltered.push(filtered[i]);
        }
      }
      filtered = newFiltered;
    }
    
    if(parsed.categories.length > 0) {
      let newFiltered = [];
      for(let i = 0; i < filtered.length; i++) {
        if(parsed.categories.includes(filtered[i].category)) {
          newFiltered.push(filtered[i]);
        }
      }
      filtered = newFiltered;
    }
    
    if(parsed.occasions.length > 0) {
      let newFiltered = [];
      for(let i = 0; i < filtered.length; i++) {
        let hasOccasion = false;
        for(let j = 0; j < filtered[i].tags.length; j++) {
          if(parsed.occasions.includes(filtered[i].tags[j])) {
            hasOccasion = true;
            break;
          }
        }
        if(hasOccasion) {
          newFiltered.push(filtered[i]);
        }
      }
      filtered = newFiltered;
    }
    
    if(parsed.styles.length > 0 && filtered.length < 3) {
      let styleProducts = [];
      for(let i = 0; i < allProducts.length; i++) {
        let hasStyle = false;
        for(let j = 0; j < allProducts[i].tags.length; j++) {
          if(parsed.styles.includes(allProducts[i].tags[j])) {
            hasStyle = true;
            break;
          }
        }
        if(hasStyle) {
          styleProducts.push(allProducts[i]);
        }
      }
      
      for(let i = 0; i < styleProducts.length; i++) {
        let alreadyInFiltered = false;
        for(let j = 0; j < filtered.length; j++) {
          if(filtered[j].id === styleProducts[i].id) {
            alreadyInFiltered = true;
            break;
          }
        }
        if(!alreadyInFiltered) {
          filtered.push(styleProducts[i]);
        }
      }
    }
    
    if(filtered.length === 0) {
      filtered = [];
      for(let i = 0; i < 5 && i < allProducts.length; i++) {
        filtered.push(allProducts[i]);
      }
    }
    
    const result = [];
    for(let i = 0; i < 4 && i < filtered.length; i++) {
      result.push(filtered[i]);
    }
    
    return result;
  };

  router.post('/', async (req, res) => {
    const { message, userId, history } = req.body;
    
    let swipeData = { liked: [], disliked: [] };
    if(store.swipes[userId]) {
      swipeData = store.swipes[userId];
    }
    
    const likedProducts = [];
    for(let i = 0; i < allProducts.length; i++) {
      let isLiked = false;
      for(let j = 0; j < swipeData.liked.length; j++) {
        if(allProducts[i].id === swipeData.liked[j]) {
          isLiked = true;
          break;
        }
      }
      if(isLiked) {
        likedProducts.push(allProducts[i]);
      }
    }
    
    const preferredTags = [];
    for(let i = 0; i < likedProducts.length; i++) {
      for(let j = 0; j < likedProducts[i].tags.length; j++) {
        if(!preferredTags.includes(likedProducts[i].tags[j])) {
          preferredTags.push(likedProducts[i].tags[j]);
        }
      }
    }
    
    const topTags = [];
    for(let i = 0; i < 6 && i < preferredTags.length; i++) {
      topTags.push(preferredTags[i]);
    }
    
    const preferredCategories = [];
    for(let i = 0; i < likedProducts.length; i++) {
      if(!preferredCategories.includes(likedProducts[i].category)) {
        preferredCategories.push(likedProducts[i].category);
      }
    }
    
    const topCategories = [];
    for(let i = 0; i < 3 && i < preferredCategories.length; i++) {
      topCategories.push(preferredCategories[i]);
    }

    const parsed = parseQuery(message);
    const suggestedProducts = filterProducts(parsed, { preferredTags: topTags, preferredCategories: topCategories });

    let productContext = '';
    for(let i = 0; i < suggestedProducts.length; i++) {
      let tagsStr = '';
      for(let j = 0; j < suggestedProducts[i].tags.length; j++) {
        tagsStr = tagsStr + suggestedProducts[i].tags[j];
        if(j < suggestedProducts[i].tags.length - 1) {
          tagsStr = tagsStr + ', ';
        }
      }
      productContext = productContext + '- ' + suggestedProducts[i].name + ' (' + suggestedProducts[i].category + ') | ₹' + suggestedProducts[i].price + ' | Tags: ' + tagsStr + '\n';
    }

    let tagsText = 'still learning...';
    if(topTags.length > 0) {
      tagsText = '';
      for(let i = 0; i < topTags.length; i++) {
        tagsText = tagsText + topTags[i];
        if(i < topTags.length - 1) {
          tagsText = tagsText + ', ';
        }
      }
    }
    
    let categoriesText = 'still learning...';
    if(topCategories.length > 0) {
      categoriesText = '';
      for(let i = 0; i < topCategories.length; i++) {
        categoriesText = categoriesText + topCategories[i];
        if(i < topCategories.length - 1) {
          categoriesText = categoriesText + ', ';
        }
      }
    }

    const systemPrompt = 'You are an AI fashion stylist assistant called "AURA". You are stylish, warm, and knowledgeable about fashion.\n\nUser\'s style preferences based on their swipes:\n- Preferred tags: ' + tagsText + '\n- Preferred categories: ' + categoriesText + '\n\nAvailable products matching their request:\n' + productContext + '\n\nGuidelines:\n- Respond in a warm, conversational but expert tone\n- Keep responses concise (3-5 sentences max)\n- Reference the available products naturally \n- If budget is mentioned, stick to it\n- Give specific outfit pairing advice\n- Mention prices when recommending\n- Always end with a short encouraging note\n- Do NOT use markdown headers, keep it conversational\n- Reference their style preferences when relevant';

    let conversationHistory = [];
    if(history) {
      for(let i = 0; i < history.length; i++) {
        conversationHistory.push({ role: history[i].role, content: history[i].content });
      }
    }
    
    conversationHistory.push({ role: 'user', content: message });

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json', 
          'anthropic-version': '2023-06-01' 
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 500,
          system: systemPrompt,
          messages: conversationHistory
        })
      });
      
      const data = await response.json();
      
      let aiText = "I'm having trouble right now. Try asking about a specific outfit or occasion!";
      if(data.content && data.content[0] && data.content[0].text) {
        aiText = data.content[0].text;
      }
      
      res.json({ reply: aiText, products: suggestedProducts });
    } catch(err) {
      let fallback = "Let me find something perfect for you! Try being more specific about the occasion or budget.";
      
      if(suggestedProducts.length > 0) {
        fallback = 'Based on your preferences, I\'d suggest the ' + suggestedProducts[0].name + ' (₹' + suggestedProducts[0].price + '). ';
        if(suggestedProducts.length > 1) {
          fallback = fallback + 'Pair it with the ' + suggestedProducts[1].name + ' for a complete look!';
        } else {
          fallback = fallback + 'It would work great for your request!';
        }
      }
      
      res.json({ reply: fallback, products: suggestedProducts });
    }
  });

  return router;
};