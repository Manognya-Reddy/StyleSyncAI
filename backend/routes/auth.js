const express = require('express');

module.exports = (store) => {
  const router = express.Router();

  router.post('/login', (req, res) => {
    const { email, password } = req.body;
    
    let foundUser = null;
    for(let i = 0; i < store.users.length; i++) {
      if(store.users[i].email === email && store.users[i].password === password) {
        foundUser = store.users[i];
        break;
      }
    }
    
    if (!foundUser) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const token = 'token_' + foundUser.id + '_' + Date.now();
    store.sessions[token] = foundUser.id;
    
    res.json({ 
      token: token, 
      user: { 
        id: foundUser.id, 
        name: foundUser.name, 
        email: foundUser.email 
      } 
    });
  });

  router.post('/signup', (req, res) => {
    const { name, email, password } = req.body;
    
    let userExists = false;
    for(let i = 0; i < store.users.length; i++) {
      if(store.users[i].email === email) {
        userExists = true;
        break;
      }
    }
    
    if (userExists) {
      return res.status(400).json({ error: 'Email already registered' });
    }
    
    const user = { 
      id: Date.now(), 
      name: name, 
      email: email, 
      password: password 
    };
    
    store.users.push(user);
    
    const token = 'token_' + user.id + '_' + Date.now();
    store.sessions[token] = user.id;
    
    res.json({ 
      token: token, 
      user: { 
        id: user.id, 
        name: user.name, 
        email: user.email 
      } 
    });
  });

  return router;
};