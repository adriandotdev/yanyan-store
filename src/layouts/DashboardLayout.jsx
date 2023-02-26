import React from 'react'
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { Outlet } from 'react-router-dom';

function DashboardLayout() {
  return (
    <main className='container pt-4 dashboard'>
        <Header />
        <div className="row gap-2 mt-3 dashboard--content">
            <Sidebar />
            <div className="col border-2 border-primary border rounded dashboard--content-data">
                <Outlet />
            </div>
        </div>
    </main>
  )
}

export default DashboardLayout