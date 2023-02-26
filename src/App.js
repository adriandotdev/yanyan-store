import { createBrowserRouter, Routes, Route, Link, NavLink, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import './css/main.css';

import Home from './pages/Home';
import DashboardLayout from './layouts/DashboardLayout';
import AddProduct from './components/AddProduct';

const router = createBrowserRouter(

  createRoutesFromElements(

    <Route>

      <Route path='admin' element={<DashboardLayout />} > 
        <Route index path='add-product' element={<AddProduct/>} />
        <Route path='add-user' element={<div>Add User</div>} />
        <Route path='sales' element={<div>Sales</div>} />
      </Route>
    </Route>
  )
);

function App() {
  return (
      <RouterProvider router={router}/>
  );
}

export default App;
