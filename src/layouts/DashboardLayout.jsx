import React from 'react'
import Sidebar from '../components/Sidebar';

function DashboardLayout() {
  return (
    <main className='container my-4 dashboard'>
        <div className="row bg-primary gy-1">
            <div className="col">
                <h1>Hello</h1>
            </div>
        </div>

        <div className="row gap-2 mt-3">
            <Sidebar />
            <div className="col bg-info">
                <h1>Main Content</h1>
            </div>
        </div>
    </main>
  )
}

export default DashboardLayout