/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useContext, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { NavLink, Outlet, useLoaderData, Navigate, redirect } from 'react-router-dom';

import { UtilityContext } from '../contexts/UtilityContext';
import { useScreenSizeDetection } from '../hooks/useScreenSizeDetection';

import axios from 'axios';
import Offcanvas from 'react-bootstrap/Offcanvas';

function DashboardLayout() {

    const response = useLoaderData();
    const { nightMode, setNightMode, logout, setRole, ICON_DARK_COLOR, ICON_LIGHT_COLOR } = useContext(UtilityContext);
    const isMatch = useScreenSizeDetection(992);
    const [show, setShow] = useState(false);

    useEffect(() => {

        if (isMatch) setShow(false);

        setRole(response?.decodedToken.role);
    }, [isMatch]);

    if (!response) {

        logout();
        return <Navigate to="/" replace={true} />
    }

    return (
        <>
            {/* Navbar */}
            <nav className={`d-lg-none container-fluid px-3 fixed-top navbar mb-0 border-bottom p-1 ${nightMode ? 'bg-dark' : 'bg-dark-secondary'}`}>
                <div className="col row align-items-center justify-content-between m-0">
                    <h1 className='text-white h3 pt-2 fw-bold col-auto'>Yan-Yan's Store</h1>

                    <div className='row col-auto align-items-center mx-0'>

                        {/* Sun/Moon Icon that sets the night/light mode */}
                        <div className="d-none d-lg-block w-auto" onClick={() => setNightMode(prev => !prev)}>

                            {
                                nightMode ? <svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#FEFEAC"><rect fill="none" height="24" width="24" /><path d="M12,3c-4.97,0-9,4.03-9,9s4.03,9,9,9s9-4.03,9-9c0-0.46-0.04-0.92-0.1-1.36c-0.98,1.37-2.58,2.26-4.4,2.26 c-2.98,0-5.4-2.42-5.4-5.4c0-1.81,0.89-3.42,2.26-4.4C12.92,3.04,12.46,3,12,3L12,3z" /></svg>

                                    :

                                    <svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#FEFEAC"><rect fill="none" height="24" width="24" /><path d="M12,7c-2.76,0-5,2.24-5,5s2.24,5,5,5s5-2.24,5-5S14.76,7,12,7L12,7z M2,13l2,0c0.55,0,1-0.45,1-1s-0.45-1-1-1l-2,0 c-0.55,0-1,0.45-1,1S1.45,13,2,13z M20,13l2,0c0.55,0,1-0.45,1-1s-0.45-1-1-1l-2,0c-0.55,0-1,0.45-1,1S19.45,13,20,13z M11,2v2 c0,0.55,0.45,1,1,1s1-0.45,1-1V2c0-0.55-0.45-1-1-1S11,1.45,11,2z M11,20v2c0,0.55,0.45,1,1,1s1-0.45,1-1v-2c0-0.55-0.45-1-1-1 C11.45,19,11,19.45,11,20z M5.99,4.58c-0.39-0.39-1.03-0.39-1.41,0c-0.39,0.39-0.39,1.03,0,1.41l1.06,1.06 c0.39,0.39,1.03,0.39,1.41,0s0.39-1.03,0-1.41L5.99,4.58z M18.36,16.95c-0.39-0.39-1.03-0.39-1.41,0c-0.39,0.39-0.39,1.03,0,1.41 l1.06,1.06c0.39,0.39,1.03,0.39,1.41,0c0.39-0.39,0.39-1.03,0-1.41L18.36,16.95z M19.42,5.99c0.39-0.39,0.39-1.03,0-1.41 c-0.39-0.39-1.03-0.39-1.41,0l-1.06,1.06c-0.39,0.39-0.39,1.03,0,1.41s1.03,0.39,1.41,0L19.42,5.99z M7.05,18.36 c0.39-0.39,0.39-1.03,0-1.41c-0.39-0.39-1.03-0.39-1.41,0l-1.06,1.06c-0.39,0.39-0.39,1.03,0,1.41s1.03,0.39,1.41,0L7.05,18.36z" /></svg>
                            }

                        </div>

                        {/* Offcanvas toggle button */}
                        <button onClick={() => setShow(true)} className={`btn d-lg-none col-auto ${nightMode ? 'btn-dark' : 'btn-outline text-light'}`} type="button">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
                            </svg>
                        </button>
                    </div>

                </div>
            </nav>

            {/* Main Content */}
            <main className='container-fluid px-lg-5 pt-5 pt-lg-2 dashboard'>

                {/* Desktop Header */}
                <Header />
                <div className="row gap-2 dashboard--content">
                    <Sidebar />
                    <div className={`col dashboard--content-data ${isMatch && 'border'} ${nightMode ? 'bg-dark border-accent border-opacity-10' : ''}`}>
                        <Outlet />
                    </div>
                </div>
            </main>

            {/* Off Canvas */}
            <Offcanvas className={`${nightMode ? 'bg-dark' : 'bg-white'}`} show={show} onHide={() => setShow(false)} placement='end'>

                <Offcanvas.Header>

                    <Offcanvas.Title className={`display-6 fw-bold ${nightMode ? 'text-light' : 'text-primary'}`}>Dashboard</Offcanvas.Title>

                    <button onClick={() => setShow(false)} className={`btn ${nightMode ? 'text-light' : 'text-dark'}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
                        </svg>
                    </button>

                </Offcanvas.Header>

                <Offcanvas.Body className='px-0'>

                    {/* Add Product */}
                    <NavLink onClick={() => setShow(false)} to='add-product' className={`text-decoration-none ${nightMode ? 'dashboard-item-dark' : 'dashboard-item'}`}>

                        <div className={`py-3 m-0  row align-items-center item ${nightMode ? 'text-accent' : 'text-dark-secondary'}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill={`${nightMode ? ICON_DARK_COLOR : ICON_LIGHT_COLOR}`} className="bi bi-plus col-2" viewBox="0 0 16 16">
                                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                            </svg>
                            <div className='col-auto fw-bold h5 mb-1 p-0'>Add Product</div>
                        </div>
                    </NavLink>

                    {/* Add User */}
                    <NavLink onClick={() => setShow(false)} to='add-user' className={`text-decoration-none ${nightMode ? 'dashboard-item-dark' : 'dashboard-item'}`}>

                        <div className={`py-3 m-0  row align-items-center item ${nightMode ? 'text-accent' : 'text-dark-secondary'}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill={`${nightMode ? ICON_DARK_COLOR : ICON_LIGHT_COLOR}`} className="bi bi-person-add col-2" viewBox="0 0 16 16">
                                <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0Zm-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
                                <path d="M8.256 14a4.474 4.474 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10c.26 0 .507.009.74.025.226-.341.496-.65.804-.918C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4s1 1 1 1h5.256Z" />
                            </svg>
                            <div className='col-auto fw-bold h5 mb-1 p-0'>Add User</div>
                        </div>
                    </NavLink>

                    {/* Projects */}
                    <NavLink onClick={() => setShow(false)} to='products' className={`text-decoration-none ${nightMode ? 'dashboard-item-dark' : 'dashboard-item'}`}>

                        <div className={`py-3 m-0  row align-items-center item ${nightMode ? 'text-accent' : 'text-dark-secondary'}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill={`${nightMode ? ICON_DARK_COLOR : ICON_LIGHT_COLOR}`} className="bi bi-person-add col-2" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3.854 2.146a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708L2 3.293l1.146-1.147a.5.5 0 0 1 .708 0zm0 4a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708L2 7.293l1.146-1.147a.5.5 0 0 1 .708 0zm0 4a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 0 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0z" />
                            </svg>
                            <div className='col-auto fw-bold h5 mb-1 p-0'>Products</div>
                        </div>
                    </NavLink>

                    {/* Users */}
                    <NavLink to='users' className={`text-decoration-none ${nightMode ? 'dashboard-item-dark' : 'dashboard-item'}`}>

                        <div className={`py-3 m-0  row align-items-center item ${nightMode ? 'text-accent' : 'text-dark-secondary'}`}>
                            <svg width="32" height="32" viewBox="0 0 24 24" fill={`${nightMode ? ICON_DARK_COLOR : ICON_LIGHT_COLOR}`} className="bi bi-person-add col-2" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M5 9.5C5 7.01472 7.01472 5 9.5 5C11.9853 5 14 7.01472 14 9.5C14 11.9853 11.9853 14 9.5 14C7.01472 14 5 11.9853 5 9.5Z" />
                                <path d="M14.3675 12.0632C14.322 12.1494 14.3413 12.2569 14.4196 12.3149C15.0012 12.7454 15.7209 13 16.5 13C18.433 13 20 11.433 20 9.5C20 7.567 18.433 6 16.5 6C15.7209 6 15.0012 6.2546 14.4196 6.68513C14.3413 6.74313 14.322 6.85058 14.3675 6.93679C14.7714 7.70219 15 8.5744 15 9.5C15 10.4256 14.7714 11.2978 14.3675 12.0632Z" />
                                <path fillRule="evenodd" clipRule="evenodd" d="M4.64115 15.6993C5.87351 15.1644 7.49045 15 9.49995 15C11.5112 15 13.1293 15.1647 14.3621 15.7008C15.705 16.2847 16.5212 17.2793 16.949 18.6836C17.1495 19.3418 16.6551 20 15.9738 20H3.02801C2.34589 20 1.85045 19.3408 2.05157 18.6814C2.47994 17.2769 3.29738 16.2826 4.64115 15.6993Z" />
                                <path d="M14.8185 14.0364C14.4045 14.0621 14.3802 14.6183 14.7606 14.7837V14.7837C15.803 15.237 16.5879 15.9043 17.1508 16.756C17.6127 17.4549 18.33 18 19.1677 18H20.9483C21.6555 18 22.1715 17.2973 21.9227 16.6108C21.9084 16.5713 21.8935 16.5321 21.8781 16.4932C21.5357 15.6286 20.9488 14.9921 20.0798 14.5864C19.2639 14.2055 18.2425 14.0483 17.0392 14.0008L17.0194 14H16.9997C16.2909 14 15.5506 13.9909 14.8185 14.0364Z" />
                            </svg>
                            <div className='col-auto fw-bold h5 m-0 p-0'>Users</div>
                        </div>
                    </NavLink>

                    <hr />

                    {/* Night Mode */}
                    <div onClick={() => {
                        localStorage.setItem("nightMode", !nightMode);
                        setNightMode(prev => !prev);
                    }} className={`btn-dark-mode py-3 px-2 m-0 row align-items-center item ${nightMode ? 'text-accent' : 'text-dark-secondary'}`}>
                        {
                            nightMode ?
                                <svg className="col-2" xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" height="32" viewBox="0 0 24 24" width="32" fill="#EDF2FA"><rect fill="none" height="24" width="24" /><path d="M12,3c-4.97,0-9,4.03-9,9s4.03,9,9,9s9-4.03,9-9c0-0.46-0.04-0.92-0.1-1.36c-0.98,1.37-2.58,2.26-4.4,2.26 c-2.98,0-5.4-2.42-5.4-5.4c0-1.81,0.89-3.42,2.26-4.4C12.92,3.04,12.46,3,12,3L12,3z" /></svg>

                                :

                                <svg className='col-2' xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" height="32" viewBox="0 0 24 24" width="32" fill="#2A5394"><rect fill="none" height="24" width="24" /><path d="M12,7c-2.76,0-5,2.24-5,5s2.24,5,5,5s5-2.24,5-5S14.76,7,12,7L12,7z M2,13l2,0c0.55,0,1-0.45,1-1s-0.45-1-1-1l-2,0 c-0.55,0-1,0.45-1,1S1.45,13,2,13z M20,13l2,0c0.55,0,1-0.45,1-1s-0.45-1-1-1l-2,0c-0.55,0-1,0.45-1,1S19.45,13,20,13z M11,2v2 c0,0.55,0.45,1,1,1s1-0.45,1-1V2c0-0.55-0.45-1-1-1S11,1.45,11,2z M11,20v2c0,0.55,0.45,1,1,1s1-0.45,1-1v-2c0-0.55-0.45-1-1-1 C11.45,19,11,19.45,11,20z M5.99,4.58c-0.39-0.39-1.03-0.39-1.41,0c-0.39,0.39-0.39,1.03,0,1.41l1.06,1.06 c0.39,0.39,1.03,0.39,1.41,0s0.39-1.03,0-1.41L5.99,4.58z M18.36,16.95c-0.39-0.39-1.03-0.39-1.41,0c-0.39,0.39-0.39,1.03,0,1.41 l1.06,1.06c0.39,0.39,1.03,0.39,1.41,0c0.39-0.39,0.39-1.03,0-1.41L18.36,16.95z M19.42,5.99c0.39-0.39,0.39-1.03,0-1.41 c-0.39-0.39-1.03-0.39-1.41,0l-1.06,1.06c-0.39,0.39-0.39,1.03,0,1.41s1.03,0.39,1.41,0L19.42,5.99z M7.05,18.36 c0.39-0.39,0.39-1.03,0-1.41c-0.39-0.39-1.03-0.39-1.41,0l-1.06,1.06c-0.39,0.39-0.39,1.03,0,1.41s1.03,0.39,1.41,0L7.05,18.36z" /></svg>
                        }
                        <div className='col-auto fw-bold h5 mb-1 p-0'>Dark Mode</div>
                    </div>

                    {/* Logout Button */}
                    <NavLink style={{ textDecoration: 'none' }} onClick={logout} className={`btn-logout py-3 px-3 m-0 row align-items-center item ${nightMode ? 'text-accent' : 'text-dark-secondary'}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill={`${nightMode ? ICON_DARK_COLOR : ICON_LIGHT_COLOR}`} className="bi bi-box-arrow-right col-2" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z" />
                            <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z" />
                        </svg>
                        <div className='col-auto fw-bold h5 mb-1 p-0'>Logout</div>
                    </NavLink>
                </Offcanvas.Body>
            </Offcanvas >
        </>
    )
}

// Loader Function
export const DashboardVerifyChecker = async () => {

    try {
        const response = await axios.post(`${import.meta.env.PROD ? import.meta.env.VITE_PROD_SERVER : import.meta.env.VITE_DEV_SERVER}/api/user/verify-login`, {}, { withCredentials: true });

        return response.data;
    }
    catch (error) {

        return null;
    }
}
export default DashboardLayout