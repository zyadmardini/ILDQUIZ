import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// Import tokens.css FIRST to ensure CSS variables are available before component styles
import './styles/tokens.css';
import './styles/global.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

