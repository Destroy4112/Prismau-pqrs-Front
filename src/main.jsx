import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './assets/css/index.css'
import './assets/css/style.css'
import { AxiosInterceptor } from './interceptors/AxiosInterceptors.jsx'

AxiosInterceptor();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
