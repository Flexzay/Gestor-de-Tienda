import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom'; // Importar Router
import App from './routes/App'; // Importa App que contiene las rutas


createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <Router> {/* Envolvemos la aplicación en Router */}
      <App /> {/* Renderizamos las rutas definidas en App */}
    </Router>
  </StrictMode>
);
