import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import axios from "axios";
import { Toaster } from "react-hot-toast";
import { Provider } from 'react-redux';
import Home from './components/Home/Home'
import Feed from './components/Feed/Feed';
import UserProfile from './components/UserProfile/UserProfile';
import LoginPage from './components/LoginPage/LoginPage';
import store from './redux/store';
import { PersistGate } from "redux-persist/integration/react";
import persistStore from 'redux-persist/es/persistStore';

let persistor = persistStore(store)

axios.defaults.baseURL = "https://tweeter-clone-backand.onrender.com/api/v1";
// axios.defaults.baseURL = "http://localhost:8080/api/v1";
axios.defaults.withCredentials = true;

const router = createBrowserRouter([
  {
    path: "",
    element: <Home />,
    children: [
      {
        path: '/',
        element: <Feed />,
        children: [
          {

          }
        ]
      },
      {
        path: '/profile/:id',
        element: <UserProfile />
      },

    ]
  },
  {
    path: '/login',
    element: <LoginPage />
  }
])

function App() {

  return (
    <div className='App-container'>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <RouterProvider router={router} />
          <Toaster />
        </PersistGate>
      </Provider>

    </div>
  )
}

export default App
