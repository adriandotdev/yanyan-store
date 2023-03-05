import { useContext } from 'react'
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { NavLink, Outlet } from 'react-router-dom';

import { UtilityContext } from '../contexts/UtilityContext';
import { useScreenSizeDetection } from '../hooks/useScreenSizeDetection';
function DashboardLayout() {

    const { nightMode, setNightMode } = useContext(UtilityContext);
    const isMatch = useScreenSizeDetection(992);

    return (
        <>
            {/* Navbar */}
            <nav class={`d-lg-none container-fluid px-3 fixed-top navbar mb-0 border-bottom ${nightMode ? 'bg-dark' : 'bg-primary'}`}>
                <div className="col row align-items-center justify-content-between m-0">
                    <h1 className='text-white h3 pt-2 fw-bold col-auto'>Yan-Yan's Store</h1>

                    <div className='row col-auto align-items-center mx-0'>

                        {/* Sun/Moon Icon that sets the night/light mode */}
                        <div className="w-auto" onClick={() => setNightMode(prev => !prev)}>

                            {
                                nightMode ? <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#FEFEAC"><rect fill="none" height="24" width="24" /><path d="M12,3c-4.97,0-9,4.03-9,9s4.03,9,9,9s9-4.03,9-9c0-0.46-0.04-0.92-0.1-1.36c-0.98,1.37-2.58,2.26-4.4,2.26 c-2.98,0-5.4-2.42-5.4-5.4c0-1.81,0.89-3.42,2.26-4.4C12.92,3.04,12.46,3,12,3L12,3z" /></svg>

                                    :

                                    <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#FEFEAC"><rect fill="none" height="24" width="24" /><path d="M12,7c-2.76,0-5,2.24-5,5s2.24,5,5,5s5-2.24,5-5S14.76,7,12,7L12,7z M2,13l2,0c0.55,0,1-0.45,1-1s-0.45-1-1-1l-2,0 c-0.55,0-1,0.45-1,1S1.45,13,2,13z M20,13l2,0c0.55,0,1-0.45,1-1s-0.45-1-1-1l-2,0c-0.55,0-1,0.45-1,1S19.45,13,20,13z M11,2v2 c0,0.55,0.45,1,1,1s1-0.45,1-1V2c0-0.55-0.45-1-1-1S11,1.45,11,2z M11,20v2c0,0.55,0.45,1,1,1s1-0.45,1-1v-2c0-0.55-0.45-1-1-1 C11.45,19,11,19.45,11,20z M5.99,4.58c-0.39-0.39-1.03-0.39-1.41,0c-0.39,0.39-0.39,1.03,0,1.41l1.06,1.06 c0.39,0.39,1.03,0.39,1.41,0s0.39-1.03,0-1.41L5.99,4.58z M18.36,16.95c-0.39-0.39-1.03-0.39-1.41,0c-0.39,0.39-0.39,1.03,0,1.41 l1.06,1.06c0.39,0.39,1.03,0.39,1.41,0c0.39-0.39,0.39-1.03,0-1.41L18.36,16.95z M19.42,5.99c0.39-0.39,0.39-1.03,0-1.41 c-0.39-0.39-1.03-0.39-1.41,0l-1.06,1.06c-0.39,0.39-0.39,1.03,0,1.41s1.03,0.39,1.41,0L19.42,5.99z M7.05,18.36 c0.39-0.39,0.39-1.03,0-1.41c-0.39-0.39-1.03-0.39-1.41,0l-1.06,1.06c-0.39,0.39-0.39,1.03,0,1.41s1.03,0.39,1.41,0L7.05,18.36z" /></svg>
                            }

                        </div>

                        {/* Offcanvas toggle button */}
                        <button className={`btn d-lg-none col-auto ${nightMode ? 'btn-dark' : 'btn-primary'}`} type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasResponsive" aria-controls="offcanvasResponsive">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-list" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
                            </svg>
                        </button>
                    </div>

                </div>
            </nav>

            {/* Main Content */}
            <main className='container-lg pt-5 pt-lg-2 dashboard'>

                {/* Desktop Header */}
                <Header />
                <div className="row gap-2 dashboard--content">
                    <Sidebar />
                    <div className={`col dashboard--content-data ${isMatch && 'border'} ${nightMode ? 'bg-dark border-accent border-opacity-50' : 'bg-white'}`}>
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
                                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                                </svg>
                                <div className='col-auto fw-bold h5 m-0 p-0'>Add Product</div>
                            </div>
                        </NavLink>

                        <NavLink to='add-user' className='text-decoration-none text-dark dashboard-item '>

                            <div className='py-3 px-1 m-0 text-primary row align-items-center item'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-person-add col-3" viewBox="0 0 16 16">
                                    <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0Zm-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
                                    <path d="M8.256 14a4.474 4.474 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10c.26 0 .507.009.74.025.226-.341.496-.65.804-.918C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4s1 1 1 1h5.256Z" />
                                </svg>
                                <div className='col-auto fw-bold h5 m-0 p-0'>Add User</div>
                            </div>
                        </NavLink>

                        <NavLink to='sales' className='text-decoration-none text-dark dashboard-item '>

                            <div className='py-3 px-1 m-0 text-primary row align-items-center item'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-currency-dollar col-3" viewBox="0 0 16 16">
                                    <path d="M4 10.781c.148 1.667 1.513 2.85 3.591 3.003V15h1.043v-1.216c2.27-.179 3.678-1.438 3.678-3.3 0-1.59-.947-2.51-2.956-3.028l-.722-.187V3.467c1.122.11 1.879.714 2.07 1.616h1.47c-.166-1.6-1.54-2.748-3.54-2.875V1H7.591v1.233c-1.939.23-3.27 1.472-3.27 3.156 0 1.454.966 2.483 2.661 2.917l.61.162v4.031c-1.149-.17-1.94-.8-2.131-1.718H4zm3.391-3.836c-1.043-.263-1.6-.825-1.6-1.616 0-.944.704-1.641 1.8-1.828v3.495l-.2-.05zm1.591 1.872c1.287.323 1.852.859 1.852 1.769 0 1.097-.826 1.828-2.2 1.939V8.73l.348.086z" />
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