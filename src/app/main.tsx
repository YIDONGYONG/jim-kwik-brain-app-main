import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

console.log("App initialization started...");

// Global error listener to catch production errors
window.onerror = function(message, source, lineno, colno, error) {
  console.error("Global Error Caught: ", message, " at ", source, ":", lineno);
  const root = document.getElementById('root');
  if (root) {
    root.innerHTML = `<div style="padding: 20px; color: red; font-family: sans-serif;">
      <h2>Application Error</h2>
      <p>${message}</p>
      <p>Please check the console for more details.</p>
    </div>`;
  }
};

const rootElement = document.getElementById('root');
if (rootElement) {
  try {
    createRoot(rootElement).render(
      <StrictMode>
        <App />
      </StrictMode>,
    );
    console.log("React render call completed.");
  } catch (err) {
    console.error("Render Error:", err);
  }
} else {
  console.error("Critical: Root element not found");
}
