import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

let lastTouchY = 0;
let touchStartY = 0;

document.addEventListener('touchstart', (e) => {
  touchStartY = e.touches[0].clientY;
}, { passive: true });

document.addEventListener('touchmove', (e) => {
  const touchY = e.touches[0].clientY;
  const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight;
  const clientHeight = document.documentElement.clientHeight;
  
  // If page is at top and user is scrolling down, prevent default behavior (pull-to-refresh)
  if (scrollTop === 0 && touchY > touchStartY) {
    e.preventDefault();
  }
  // If page is at bottom and user is scrolling up, prevent default behavior
  else if (scrollTop + clientHeight >= scrollHeight && touchY < touchStartY) {
    e.preventDefault();
  }
  
  lastTouchY = touchY;
}, { passive: false });

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)


