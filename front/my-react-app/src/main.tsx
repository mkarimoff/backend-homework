
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import RouterComponent from './routes.tsx'

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
    <RouterComponent />
    </BrowserRouter>
)
