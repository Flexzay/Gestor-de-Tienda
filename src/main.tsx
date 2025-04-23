
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom'; 
import App from './routes/App'; 



createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <Router> {/* Envolvemos la aplicación en Router */}
      <App /> {/* Renderizamos las rutas definidas en App */}
    </Router>
  </StrictMode>
);
