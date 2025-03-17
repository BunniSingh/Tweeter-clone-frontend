import './App.css';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import axios from "axios";
import {Toaster} from "react-hot-toast";
import {Provider} from 'react-redux';
import Home from './components/Home/Home'
import Feed from './components/Feed/Feed';
import UserProfile from './components/UserProfile/UserProfile';
import LoginPage from './components/LoginPage/LoginPage';
import store from './redux/store';

axios.defaults.baseURL = "http://localhost:8080/api/v1";

const router = createBrowserRouter([
  {
    path: "",
    element: <Home/>,
    children: [
      {
        path: '/',
        element:<Feed/>
      },
      {
        path: '/profile/:id',
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
      <Provider store={store}>
        <RouterProvider router={router}/>
        <Toaster/>
      </Provider>
      
    </div>
  )
}

export default App
