import { createBrowserRouter, Route, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import { useState } from 'react';
import './css/main.css';

// Layout
import DashboardLayout from './layouts/DashboardLayout';

// Components
import AddProduct from './components/AddProduct';
import AddUser from './components/AddUser';

// Page
import ErrorPage from './pages/ErrorPage';

// Context
import { UtilityContext } from './contexts/UtilityContext';

const router = createBrowserRouter(

  createRoutesFromElements(

    <Route>
      <Route path='admin' element={<DashboardLayout />} >
        <Route index path='add-product' element={<AddProduct />} />
        <Route path='add-user' element={<AddUser />} />
        <Route path='sales' element={<div>Sales</div>} />
      </Route>

      <Route path="*" element={< ErrorPage />} />
    </Route>
  )
);

function App() {

  const [nightMode, setNightMode] = useState(false);

  return (
    <UtilityContext.Provider value={{ nightMode, setNightMode }}>
      <RouterProvider router={router} />
    </UtilityContext.Provider>
  );
}

export default App;
