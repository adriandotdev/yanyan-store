import React from 'react'
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { NavLink, Outlet } from 'react-router-dom';

function DashboardLayout() {
  return (
    <>
    <main className='container-lg pt-0 pt-lg-4 dashboard'>
        <Header />
        <div className="row gap-2 mt-lg-3 dashboard--content">
            <Sidebar />
            <div className="col dashboard--content-data">
                <Outlet />
            </div>
        </div>
    </main>

    {/* Off Canvas that only available when in mobile screen sizes. */}
    <div className="offcanvas-lg offcanvas-end" tabindex="-1" id="offcanvasResponsive" aria-labelledby="offcanvasResponsiveLabel">
        <div className="offcanvas-header">
            <h5 className="offcanvas-title h3 fw-bold text-primary px-1" id="offcanvasResponsiveLabel">Dashboard</h5>
            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" data-bs-target="#offcanvasResponsive" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body d-lg-none p-0">
            <div>
            <NavLink to='add-product' className='text-decoration-none text-dark dashboard-item '>
               
                <div className='py-3 px-1 m-0 text-primary row align-items-center item'>
                     <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-plus col-3" viewBox="0 0 16 16">
                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                    </svg>
                    <div className='col-auto fw-bold h5 m-0 p-0'>Add Product</div>
                </div>
            </NavLink>

            <NavLink to='add-user' className='text-decoration-none text-dark dashboard-item '>
               
                <div className='py-3 px-1 m-0 text-primary row align-items-center item'>
                     <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-person-add col-3" viewBox="0 0 16 16">
                        <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0Zm-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"/>
                        <path d="M8.256 14a4.474 4.474 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10c.26 0 .507.009.74.025.226-.341.496-.65.804-.918C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4s1 1 1 1h5.256Z"/>
                    </svg>
                    <div className='col-auto fw-bold h5 m-0 p-0'>Add User</div>
                </div>
            </NavLink>

            <NavLink to='sales' className='text-decoration-none text-dark dashboard-item '>
               
                <div className='py-3 px-1 m-0 text-primary row align-items-center item'>
                     <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-currency-dollar col-3" viewBox="0 0 16 16">
                        <path d="M4 10.781c.148 1.667 1.513 2.85 3.591 3.003V15h1.043v-1.216c2.27-.179 3.678-1.438 3.678-3.3 0-1.59-.947-2.51-2.956-3.028l-.722-.187V3.467c1.122.11 1.879.714 2.07 1.616h1.47c-.166-1.6-1.54-2.748-3.54-2.875V1H7.591v1.233c-1.939.23-3.27 1.472-3.27 3.156 0 1.454.966 2.483 2.661 2.917l.61.162v4.031c-1.149-.17-1.94-.8-2.131-1.718H4zm3.391-3.836c-1.043-.263-1.6-.825-1.6-1.616 0-.944.704-1.641 1.8-1.828v3.495l-.2-.05zm1.591 1.872c1.287.323 1.852.859 1.852 1.769 0 1.097-.826 1.828-2.2 1.939V8.73l.348.086z"/>
                    </svg>
                    <div className='col-auto fw-bold h5 m-0 p-0'>Sales</div>
                </div>
            </NavLink>
        </div>
        </div>
    </div>
    </>
  )
}

export default DashboardLayout