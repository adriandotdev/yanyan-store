import React from 'react'

function DashboardLayout() {
  return (
    <main className='container my-4'>
        <div className="row bg-primary">
            <div className="col">
                <h1>Hello</h1>
            </div>
        </div>

        <div className="row">
            <div className="col-3 bg-success">
                <h1>SideBar</h1>
            </div>
            <div className="col bg-info">
                <h1>Main Content</h1>
            </div>
        </div>
    </main>
  )
}

export default DashboardLayout