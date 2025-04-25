import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from 'react-router'
import './index.css'
import App from './App.jsx'
import ImportScreen from './screens/ImportScreen/ImportScreen.jsx'

const router = createBrowserRouter([{
   path: '/',
   element: <ImportScreen />,
}
//Add another path
// {
//    path: '/data',
//    element: <DataScreen />
// }


])

createRoot(document.getElementById('root')).render(
   <StrictMode>
      <RouterProvider router ={router} />
      {/* <App /> */}
   </StrictMode>,
)
