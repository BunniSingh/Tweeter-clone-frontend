
import {createBrowserRouter, RouterProvider} from 'react-router-dom'

import './App.css';
import Home from './components/Home/Home'
import Feed from './components/Feed/Feed';
import UserProfile from './components/UserProfile/UserProfile';
import LoginPage from './components/LoginPage/LoginPage';

const router = createBrowserRouter([
  {
    element: "",
    element: <Home/>,
    children: [
      {
        path: '/',
        element:<Feed/>
      },
      {
        path: '/profile',
        element:<UserProfile/>
      },

    ]
  },
  {
    path: '/login',
    element: <LoginPage/>
  }
])

function App() {

  return (
    <div className='App-container'>
      <RouterProvider router={router}/>
    </div>
  )
}

export default App
