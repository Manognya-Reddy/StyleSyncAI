
A full-stack Pinterest-style fashion discovery app with an AI stylist chatbot.


```
ai-fashion-stylist/
├── backend/
│   ├── server.js            # Express app entry
│   ├── package.json
│   ├── data/
│   │   └── products.js      # Mock clothing catalogue (20 items)
│   └── routes/
│       ├── auth.js          # POST /api/auth/login, /api/auth/signup
│       ├── products.js      # GET  /api/products
│       ├── swipe.js         # POST /api/swipe, GET /api/swipe/:userId
│       ├── recommendations.js # GET /api/recommendations/:userId
│       ├── chat.js          # POST /api/chat (AI stylist)
│       └── saved-dashboard.js # saved + dashboard routes
│
└── frontend/
    ├── package.json
    ├── public/index.html
    └── src/
        ├── App.jsx
        ├── styles.css
        ├── index.jsx
        ├── context/
        │   └── AppContext.jsx    # Global state (auth, swipes, saved)
        ├── components/
        │   ├── Navbar.jsx
        │   └── SwipeCard.jsx    # Draggable card with gesture recognition
        └── pages/
            ├── LoginPage.jsx
            ├── SwipePage.jsx    # Card swipe discovery
            ├── ChatPage.jsx     # AURA AI stylist chat
            ├── SavedPage.jsx    # Saved items collection
            └── DashboardPage.jsx # Style profile & preferences
```

## Quick Start

### 1. Install dependencies
```bash
npm install              # installs concurrently at root
npm run install:all      # installs backend + frontend deps
```

### 2. Configure AI (optional)
The chatbot works without an API key using smart fallback responses.

To enable the real AI stylist, set your Anthropic API key:
```bash
# backend/.env
ANTHROPIC_API_KEY=sk-ant-...
```

Then update `backend/routes/chat.js` to read from env:
```js
headers: {
  'Content-Type': 'application/json',
  'anthropic-version': '2023-06-01',
  'x-api-key': process.env.ANTHROPIC_API_KEY,
}
```

### 3. Run development servers
```bash
npm run dev
```
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001

### 4. Demo login
```
Email:    demo@style.ai
Password: demo123
```

## API Routes

| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/auth/login` | Login with email/password |
| POST | `/api/auth/signup` | Create new account |
| GET  | `/api/products` | Get clothing items (supports `?category=&limit=&offset=`) |
| POST | `/api/swipe` | Record a like/dislike swipe |
| GET  | `/api/swipe/:userId` | Get user's swipe history |
| GET  | `/api/recommendations/:userId` | Get personalized recommendations |
| POST | `/api/chat` | Send message to AI stylist |
| GET  | `/api/saved/:userId` | Get saved items |
| POST | `/api/saved` | Save an item |
| DELETE | `/api/saved` | Unsave an item |
| GET  | `/api/dashboard/:userId` | Get profile stats & preferences |

## Features

- **Swipe Discovery** — Drag cards left/right with smooth gesture physics
- **Smart Recommendations** — Tag + category scoring engine (pluggable with embeddings)
- **AI Stylist Chat** — Claude-powered chatbot with budget & occasion parsing
- **Saved Collection** — Bookmark items while swiping
- **Style Profile** — Visualize preferences from swipe history
