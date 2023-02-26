import React from 'react'
import { NavLink } from 'react-router-dom';

function Sidebar() {
  return (
    <div className='col-3 rounded border px-0 border-primary border-2'>
        <h1 className='h3 fw-bold text-primary my-4 px-3'>Dashboard</h1>

        <div>
            <NavLink to='add-product' className='text-decoration-none text-dark'>
                <div className='py-3 px-4 m-0 text-primary fw-bold h5 bg-light border-5 border-start border-primary'>Add Product</div>
            </NavLink>
            <NavLink to='add-user' className='text-decoration-none text-dark'>
                <div className='py-3 px-4 m-0 text-primary fw-bold h5'>Add User</div>
            </NavLink>
            <NavLink to='sales' className='text-decoration-none text-dark'>
                <div className='py-3 px-4 text-primary fw-bold h5'>Sales</div>
            </NavLink>
        </div>
    </div>
  )
}

export default Sidebar