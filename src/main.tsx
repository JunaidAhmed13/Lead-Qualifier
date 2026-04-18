import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ClerkProvider } from '@clerk/react'
import { BrowserRouter } from 'react-router-dom'
import './styles/index.css'
import App from './App'

const clerkAppearance = {
  variables: {
    colorPrimary: '#4f6ef7',
    colorBackground: '#ffffff',
    colorInputBackground: '#f5f5f7',
    colorInputText: '#0f0f1a',
    colorText: '#0f0f1a',
    colorTextSecondary: '#666680',
    colorNeutral: '#0f0f1a',
    borderRadius: '12px',
    fontFamily: 'Geist, sans-serif',
  },
  elements: {
    modalBackdrop: 'backdrop-blur-sm bg-black/60',
    card: 'shadow-2xl border border-gray-200',
    formButtonPrimary: 'bg-[#4f6ef7] hover:bg-[#3d5ce0] text-white',
    footerActionLink: 'text-[#4f6ef7]',
    identityPreviewEditButton: 'text-[#4f6ef7]',
  },
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ClerkProvider
      publishableKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY}
      afterSignOutUrl="/"
      appearance={clerkAppearance}
    >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ClerkProvider>
  </StrictMode>,
)
