import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import App from './App.jsx'
import './index.css'

// Configure Font Awesome
config.autoAddCss = false

// Add meta tag for CSP
const meta = document.createElement('meta');
meta.httpEquiv = "Content-Security-Policy";
meta.content = `
  default-src 'self';
  font-src 'self' data: https: https://fonts.gstatic.com https://ka-f.fontawesome.com;
  img-src 'self' data: https:;
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  script-src 'self' 'unsafe-inline' 'unsafe-eval';
  connect-src 'self' https://v9-properties.onrender.com https://ka-f.fontawesome.com;
`;
document.head.appendChild(meta);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)