import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';

export default function DashboardPage() {
  const { user, swipes, saved } = useApp();
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`/api/dashboard/${user?.id}`)
      .then(r => r.json())
      .then(setData)
      .catch(() => {
        const PRODUCTS = [];
        const tagFreq = {};
        const catFreq = {};
        setData({
          stats: { totalLiked: swipes.liked.length, totalDisliked: swipes.disliked.length, totalSaved: saved.length, totalSwiped: swipes.liked.length + swipes.disliked.length },
          preferences: { topTags: [], topCategories: [] },
          recentLikes: []
        });
      });
  }, [user?.id, swipes.liked.length]);

  const stats = data?.stats || { totalLiked: swipes.liked.length, totalDisliked: swipes.disliked.length, totalSaved: saved.length, totalSwiped: swipes.liked.length + swipes.disliked.length };
  const prefs = data?.preferences || { topTags: [], topCategories: [] };
  let maxCat = 1;
  if(prefs.topCategories[0]) {
    maxCat = prefs.topCategories[0].count;
  }

  const statItems = [
    ['❤', stats.totalLiked, 'Liked'],
    ['✕', stats.totalDisliked, 'Passed'],
    ['🔖', stats.totalSaved, 'Saved'],
    ['↕', stats.totalSwiped, 'Swiped']
  ];

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Style Profile</h1>
        <p>Welcome back, {user?.name?.split(' ')[0]}</p>
      </div>

      <div className="stats-grid">
        {statItems.map((item) => {
          return (
            <div key={item[2]} className="stat-card">
              <div className="stat-icon">{item[0]}</div>
              <div className="stat-number">{item[1]}</div>
              <div className="stat-label">{item[2]}</div>
            </div>
          );
        })}
      </div>

      <div className="section-card">
        <div className="section-title">Style Preferences</div>
        {prefs.topTags.length > 0 ? (
          <div>
            {prefs.topTags.map((tagObj) => {
              return <span key={tagObj.tag} className="pref-tag">{tagObj.tag}</span>;
            })}
          </div>
        ) : (
          <p className="empty-text">Keep swiping to reveal your taste profile</p>
        )}
      </div>

      <div className="section-card">
        <div className="section-title">Favourite Categories</div>
        {prefs.topCategories.length > 0 ? (
          prefs.topCategories.map((catObj) => {
            const widthPercent = Math.round(catObj.count / maxCat * 100);
            return (
              <div key={catObj.category} className="category-row">
                <div className="category-name">{catObj.category}</div>
                <div className="category-bar">
                  <div className="category-fill" style={{ width: widthPercent + '%' }}></div>
                </div>
                <div className="category-count">{catObj.count}</div>
              </div>
            );
          })
        ) : (
          <p className="empty-text">No category data yet</p>
        )}
      </div>

      {data?.recentLikes && data.recentLikes.length > 0 && (
        <div className="section-card">
          <div className="section-title">Recent Likes</div>
          <div className="recent-grid">
            {data.recentLikes.map((p) => {
              return (
                <div key={p.id} className="recent-item">
                  <img src={p.image} alt={p.name}/>
                  <p>{p.name}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}