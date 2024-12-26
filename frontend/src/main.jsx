import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { UserProvider, ProjectProvider, AboutProvider } from './auth/UserProvider.jsx'
import { LeaderboardProvider } from './auth/LeaderboardProvider.jsx'
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
      <ProjectProvider>
        <AboutProvider>
          <LeaderboardProvider>
            <App />
          </LeaderboardProvider>
        </AboutProvider>
      </ProjectProvider>
    </UserProvider>
  </StrictMode>,
)
