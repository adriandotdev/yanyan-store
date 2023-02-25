import { createBrowserRouter, Routes, Route, Link, NavLink, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


import Home from './pages/Home';
import DashboardLayout from './layouts/DashboardLayout';

const router = createBrowserRouter(

  createRoutesFromElements(

    <Route>

      <Route path='/' element={<DashboardLayout />} />
    </Route>
  )
);

function App() {
  return (
      <RouterProvider router={router}/>
  );
}

export default App;
