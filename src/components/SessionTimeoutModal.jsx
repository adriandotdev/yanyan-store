import React, { useContext } from 'react'
import { UtilityContext } from '../contexts/UtilityContext';
import { useNavigate } from 'react-router-dom';

function SessionTimeoutModal() {

    const { logout } = useContext(UtilityContext);
    const navigate = useNavigate();

    return (
        <div className='modal-bg d-flex justify-content-center align-items-center pt-4'>

            <div style={{ zIndex: '10' }} className='rounded d-relative bg-white px-4 pt-3 pb-4 d-flex-col justify-content-center align-items-center'>
                <h3>Session Timed Out</h3>
                <hr />
                <p className='m-0 mb-2'>Please log in again</p>
                <button onClick={() => {
                    logout();
                    navigate('/', { replace: true });
                }} className='btn btn-dark-secondary align-self-end'>OK</button>
            </div>
        </div>
    )
}

export default SessionTimeoutModal