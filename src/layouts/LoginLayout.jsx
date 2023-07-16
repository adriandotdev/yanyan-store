import React, { useEffect } from 'react'
import { useNavigate, Outlet } from 'react-router-dom';

function LoginLayout() {

    const navigate = useNavigate();

    useEffect(() => navigate('/login'), []);

    return (
        <>
            <Outlet />
        </>
    )
}

export default LoginLayout