import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


import { createBrowserRouter, RouterProvider,} from "react-router-dom";
import Main from './screens/main'
import CartPage from './screens/CartPage';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main />,
    },
    {
      path:"/cart",
      element:<CartPage />
    }
  ]);
  return(
<RouterProvider router={router} />
  )
}

export default App
