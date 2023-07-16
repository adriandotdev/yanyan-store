import { createBrowserRouter, Route, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import { useState, useEffect } from 'react';

import './css/main.css';
import './css/app.css';

// Layout
import LoginLayout from './layouts/LoginLayout';
import DashboardLayout, { DashboardVerifyChecker } from './layouts/DashboardLayout';

// Components
import AddProduct from './components/AddProduct';
import AddUser from './components/AddUser';
import Products, { categoriesLoader } from './components/Products';
import Users from './components/Users';

// Page
import LoginPage, { VerifiedChecker } from './pages/LoginPage';
import ErrorPage from './pages/ErrorPage';

// Context
import { UtilityContext } from './contexts/UtilityContext';

import axios from 'axios';

const router = createBrowserRouter(

  createRoutesFromElements(

    <Route>
      {/* 
        - React Router path is relative, no need to put a forward slash 
        - element : component or html element to render
        - loader : a function that fetches data before the route loaded.
        - Error Route must have a path of '*'
      */}
      <Route path='/' element={<LoginLayout />}>
        <Route path='login' element={<LoginPage />} loader={VerifiedChecker} />
      </Route>


      <Route path='dashboard' element={<DashboardLayout />} loader={DashboardVerifyChecker}>
        <Route path="add-product" element={<AddProduct />} />
        <Route path='add-user' element={<AddUser />} />
        <Route path='products' element={<Products />} loader={categoriesLoader} />
        <Route path='users' element={<Users />} />
      </Route>

      <Route path="*" element={< ErrorPage />} />
    </Route>
  )
);

function App() {

  const [nightMode, setNightMode] = useState(false);
  const [role, setRole] = useState(null);
  const ICON_DARK_COLOR = '#EDF2FA';
  const ICON_LIGHT_COLOR = '#2A5394';

  const logout = async () => {

    try {
      await axios.post(`${import.meta.env.PROD ? import.meta.env.VITE_PROD_SERVER : import.meta.env.VITE_DEV_SERVER}/users/logout`, {}, { withCredentials: true });
    }
    catch (err) {
      throw new Error('Server Error');
    }
  }

  useEffect(() => {

    setNightMode(localStorage.getItem("nightMode") === "true" ? true : false);
  }, []);

  return (
    <UtilityContext.Provider value={{ nightMode, setNightMode, ICON_DARK_COLOR, ICON_LIGHT_COLOR, logout, role, setRole }}>
      <RouterProvider router={router} />
    </UtilityContext.Provider>
  );
}

export default App;
