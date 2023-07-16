/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { Button } from 'react-bootstrap';
import { modal } from '../motions/modalMotions';
import { UtilityContext } from '../contexts/UtilityContext';

function ConfirmationModal({
    message = "Are you sure you want to delete this product?",
    mainButtonColor = "danger",
    toDelete,
    isScreenSizeMatchTo992,
    showModal,
    operation,
    onClick,
    isEventInProgress }) {

    const { nightMode } = useContext(UtilityContext);

    return (
        <div className={`modal-bg d-flex justify-content-center pt-4 ${!isScreenSizeMatchTo992 ? 'align-items-end' : 'align-items-center'}`}>

            <motion.div
                className={`card px-3 py-2 ${nightMode ? 'custom-bg-dark' : 'bg-light'}`}
                variants={isScreenSizeMatchTo992 ? modal.desktop : modal.mobile}
                initial="initial"
                animate="animate"
                exit="exit">

                <div className="card-body">
                    <div className={`card-subtitle h5 ${nightMode ? 'text-light' : 'text-black'}`}>
                        {operation === 'delete' ? message : 'Update this product?'}
                    </div>
                    {operation === 'delete' && <div className='h3 text-danger fw-bold mt-2'>{toDelete}</div>}

                    <hr className={`${nightMode ? 'border-light' : 'border-dark'}`} />
                    <div className='mt-4 row gap-3 px-2'>
                        <Button
                            onClick={onClick}
                            variant={operation === 'delete' ? mainButtonColor : 'primary'}>

                            {isEventInProgress && <span className="spinner-grow spinner-grow-sm mr-1" role="status" aria-hidden="true"></span>}

                            {!isEventInProgress && <span className="">
                                {operation === 'delete' ? 'Delete' : 'Update'}
                            </span>}
                        </Button>
                        <Button onClick={() => showModal(false)} variant={`${nightMode ? 'outline-light' : 'outline-dark-secondary'}`}>
                            Cancel
                        </Button>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}

export default ConfirmationModal