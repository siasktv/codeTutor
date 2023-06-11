import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { store } from './redux/store.js'
import './index.css'

const router = createBrowserRouter([
  // {
  //   path: '/',
  //   element: </> ,
  //   children: [
  //     { path: '/', element: },
  //     { path: '/login', element: },
  //     { path: '/register', element: },
  //   ],
  // },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}>
    <Provider store={store}>
      <App />
    </Provider>
  </RouterProvider>
)
