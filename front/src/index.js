import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import {
  BrowserRouter as Router,
} from "react-router-dom" 
import { QueryClient, QueryClientProvider } from 'react-query'

 import {
   RecoilRoot
 } from 'recoil'

 const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})
const renderApp = () => {
  ReactDOM.render(
  <React.StrictMode>
  <RecoilRoot>
    <Router>
    <QueryClientProvider client={queryClient}>
      <App />   
    </QueryClientProvider>
    </Router>
  </RecoilRoot>
  </React.StrictMode>
  ,
  
  document.getElementById('root'))
}
renderApp()