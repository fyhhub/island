import { createRoot } from 'react-dom/client'
import { App } from './App'

function renderInBrowser() {
  const container = document.querySelector('#root')
  if (!container) {
    throw new Error('#root element not found')
  }
  createRoot(container).render(<App/>)
}

renderInBrowser()