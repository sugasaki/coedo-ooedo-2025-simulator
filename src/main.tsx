import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import './index.css';
import App from './App.tsx';
import { QueryParamHandler } from './components/QueryParamHandler';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <QueryParamHandler />
      <App />
    </BrowserRouter>
  </StrictMode>
);
