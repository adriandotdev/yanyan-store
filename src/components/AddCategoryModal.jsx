import { useState } from 'react'

import { useForm } from 'react-hook-form';

// components
import InputField from './InputField';
import Notification from './Notification';

import { motion } from 'framer-motion';

import { modalBG, modal } from '../motions/modalMotions';
import axios from 'axios';
function AddCategoryModal({ isScreenSize992px, showAddCategoryModal, isNightMode }) {

    const { register, reset, setError, handleSubmit, formState: { errors }, getValues } = useForm();

    const [loading, setLoading] = useState(false);

    const [notification, setNotification] = useState({ show: false, error: false, message: '' });

    const submit = async () => {

        setLoading(() => true);
        try {
            const response = await axios.post(`${import.meta.env.PROD ? import.meta.env.VITE_PROD_SERVER : import.meta.env.VITE_DEV_SERVER}/category/add`, getValues());

            if (response)
                console.log(response);

            reset({ category: '' })
            setLoading(() => false);
            setNotification({ show: true, error: false, message: 'Category added successfully' });
        }
        catch (err) {

            setNotification({ show: true, error: true, message: 'Category cannot be added' });
            setLoading(() => false);
        }
    }
    return (

        <motion.div onClick={(e) => {

            showAddCategoryModal(false);

        }} variants={modalBG} initial="initial" animate="animate" exit="exit" className={`modal-bg d-flex justify-content-center pt-4 ${!isScreenSize992px ? 'align-items-end' : 'align-items-start'}`}>

            <motion.div onClick={(e) => e.stopPropagation()} key="modal" variants={isScreenSize992px ? modal.desktop : modal.mobile} initial="initial" animate="animate" exit="exit" className={`card px-3 py-2 ${isNightMode ? 'custom-bg-dark' : 'bg-light'}`} >

                <div className={`card-body  ${isNightMode ? ' custom-bg-dark' : 'bg-light'}`}>

                    <h5 className={`card-title fw-bold store-title h3 ${isNightMode ? 'text-accent' : 'text-primary'}`}>New Category</h5>
                    <h6 className="card-subtitle mb-2 text-muted">Please provide all the fields.</h6>

                    {/* FORM */}
                    <form onSubmit={handleSubmit(submit)}>
                        <InputField
                            id="category"
                            type="text"
                            label="Category"
                            placeholder="Enter new category"
                            register={register}
                            options={{
                                required: "Category is required.",
                                onBlur: (e) => {

                                    if (e.currentTarget.value === '')
                                        setError('category', { type: 'validate', message: 'Category is required.' })
                                },
                                onChange: (e) => {
                                    if (e.currentTarget.value !== '') setError('category', { type: 'validate', message: '' })
                                    else setError('category', { type: 'validate', message: 'Category is required.' })
                                }
                            }}
                            errors={errors}
                            getValues={getValues}
                        />
                        <button type="submit" className="btn btn-primary w-100 fw-bold mt-3" disabled={loading}>
                            {loading && <span className="spinner-grow spinner-grow-sm mr-1" role="status" aria-hidden="true"></span>}
                            {!loading && <span className="">Add</span>}
                        </button>
                    </form>
                </div>
            </motion.div>

            {/* Notification */}
            <Notification
                notification={notification}
                setNotification={setNotification}
                successHeader={notification.message}
                errorHeader={notification.message}
                successMessage="You can view it on Product Category list"
                errorMessage="Please try again later." />
        </motion.div >
    )
}

export default AddCategoryModal