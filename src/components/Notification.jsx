import React from 'react'
import { Toast, ToastContainer } from 'react-bootstrap';
import { useScreenSizeDetection } from '../hooks/useScreenSizeDetection';

function Notification({ notification, setNotification, successHeader, errorHeader, successMessage, errorMessage }) {

    const isMatch = useScreenSizeDetection(992);

    return (
        <ToastContainer className="p-3" position={isMatch ? "bottom-end" : "top-center"}>
            <Toast onClose={() => setNotification(prev => ({ show: false, error: prev.error }))} show={notification.show} bg={notification.error ? "danger" : "success"} delay={2500} autohide={true}>
                <Toast.Header>
                    <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                    <strong className="me-auto text-primary">{notification.error ? errorHeader : successHeader}</strong>
                </Toast.Header>
                <Toast.Body className='fw-bold text-white pl-2'>{notification.error ? errorMessage : successMessage}</Toast.Body>
            </Toast>
        </ToastContainer>
    )
}

export default Notification