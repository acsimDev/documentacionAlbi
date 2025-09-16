import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { ProgressProvider } from './context/ProgressContext.jsx'
import { HighlightProvider } from './context/HighlightContext.jsx'
import { AuthProvider } from './context/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<BrowserRouter basename={import.meta.env.VITE_BASENAME}>
			<AuthProvider>
				<ProgressProvider>
					<HighlightProvider>
						<App />
					</HighlightProvider>
				</ProgressProvider>
			</AuthProvider>
		</BrowserRouter>
	</StrictMode>,
)
