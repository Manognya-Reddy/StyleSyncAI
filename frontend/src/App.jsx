import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import LoginPage from './pages/LoginPage';
import SwipePage from './pages/SwipePage';
import ChatPage from './pages/ChatPage';
import SavedPage from './pages/SavedPage';
import DashboardPage from './pages/DashboardPage';
import Navbar from './components/Navbar';
import './styles.css';

function AppInner() {
  const { user } = useApp();
  const [activePage, setActivePage] = useState('swipe');
  if (!user) {
    return <LoginPage />;
  }
  let ActivePage = SwipePage;
  if (activePage === 'chat') ActivePage = ChatPage;
  if (activePage === 'saved') ActivePage = SavedPage;
  if (activePage === 'dashboard') ActivePage = DashboardPage;

  return (
    <div className="app-container">
      <Navbar activePage={activePage} onNavigate={setActivePage} />
      <main className="page-content">
        <ActivePage />
      </main>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppInner />
    </AppProvider>
  );
}