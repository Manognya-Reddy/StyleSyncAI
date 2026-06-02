import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';

const SUGGESTIONS = [
  'Party outfit under ₹2000',
  'Casual college looks',
  'Office wardrobe essentials',
  'Summer vacation style',
];

export default function ChatPage() {
  const { user } = useApp();
  const [messages, setMessages] = useState([
    { role: 'ai', text: "Hello! I'm AURA, your personal stylist ✦ Tell me about an occasion, budget, or the vibe you're going for — and I'll curate the perfect look for you." }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEnd = useRef();

  useEffect(() => {
    messagesEnd.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (text) => {
    let msg = text;
    if (!msg) {
      msg = input.trim();
    }
    
    if (!msg) return;
    if (loading) return;
    
    setInput('');
    
    const newMessages = [...messages, { role: 'user', text: msg }];
    setMessages(newMessages);
    setLoading(true);

    const history = [];
    for (let i = 0; i < messages.length; i++) {
      const m = messages[i];
      if (m.role === 'ai') {
        history.push({ role: 'assistant', content: m.text });
      } else {
        history.push({ role: 'user', content: m.text });
      }
    }

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: msg, userId: user?.id, history: history })
      });
      const data = await res.json();
      setMessages([...newMessages, { role: 'ai', text: data.reply, products: data.products }]);
    } catch(err) {
      setMessages([...newMessages, { role: 'ai', text: "I'm having trouble connecting right now. Please try again!" }]);
    }
    setLoading(false);
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h1>AURA Stylist</h1>
        <p>Your personal AI fashion advisor</p>
      </div>

      <div className="messages-container">
        {messages.map((msg, i) => {
          return (
            <div key={i} className={`message ${msg.role}`}>
              <div className={`message-avatar ${msg.role}`}>
                {msg.role === 'ai' ? '✦' : '👤'}
              </div>
              <div>
                <div className="message-bubble">{msg.text}</div>
                {msg.products && msg.products.length > 0 && (
                  <div className="products-scroll">
                    {msg.products.map((p) => {
                      return (
                        <div key={p.id} className="product-card">
                          <img src={p.image} alt={p.name}/>
                          <div className="product-card-info">
                            <div className="product-card-name">{p.name}</div>
                            <div className="product-card-price">₹{p.price.toLocaleString()}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          );
        })}
        {loading && (
          <div className="message ai">
            <div className="message-avatar ai">✦</div>
            <div className="message-bubble loading-dots">
              <div className="loading-dot"></div>
              <div className="loading-dot"></div>
              <div className="loading-dot"></div>
            </div>
          </div>
        )}
        <div ref={messagesEnd}/>
      </div>

      <div>
        <div className="suggestions-row">
          {SUGGESTIONS.map((s) => {
            return (
              <button key={s} onClick={() => sendMessage(s)} className="suggestion-btn">
                {s}
              </button>
            );
          })}
        </div>
        <div className="chat-input-row">
          <input className="chat-input" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => { if(e.key === 'Enter') sendMessage(); }} placeholder="Ask about outfits, styles, occasions..."/>
          <button onClick={() => sendMessage()} className="send-btn">→</button>
        </div>
      </div>
    </div>
  );
}