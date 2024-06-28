import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.js';
import './index.css';
import Store from './Contexts/Store.js';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Store>
      <App />
    </Store>
  </React.StrictMode>
);