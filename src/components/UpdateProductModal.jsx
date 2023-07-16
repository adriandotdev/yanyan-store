/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import { updateModal, modalBG } from '../motions/modalMotions';
import { UtilityContext } from '../contexts/UtilityContext';
import { useForm } from 'react-hook-form';
import InputField from './InputField';
import Select from './Select';
import TextArea from './TextArea';
import { CloseButton } from 'react-bootstrap';

import axios from 'axios';

import '../css/products.css'
function UpdateProductModal({ isScreenSize992px, setUpdateModalToShow, setNotification, setProducts, productToUpdate }) {


    const { nightMode } = useContext(UtilityContext);
    const { register, reset, setError, handleSubmit, formState: { errors }, getValues, setValue } = useForm();

    const [isUpdating, setUpdating] = useState(false);
    const [categories, setCategories] = useState([]);

    const updateProduct = async () => {

        setUpdating(true);

        try {
            const response = await axios.put(`${import.meta.env.PROD ? import.meta.env.VITE_PROD_SERVER : import.meta.env.VITE_DEV_SERVER}/products/${productToUpdate._id}`, getValues());

            if (response.status === 200) {

                setUpdating(false);
                setUpdateModalToShow(false);
                setProducts(response.data.products);
                setNotification({ show: true, error: false, message: 'Product updated successfully', header: 'Success!' });
                reset({ category: '', product: '', price: '', quantity: '' })
            }
        }
        catch (err) {
            setUpdating(false);
            setNotification({ show: true, error: true, message: 'We cannot process your request', header: 'Failed' });
        }
    }

    useEffect(() => {

        setValue('product', productToUpdate.product);
        setValue('price', productToUpdate.price);
        setValue('quantity', productToUpdate.quantity);
        setValue('description', productToUpdate.description);

        axios.get(`${import.meta.env.PROD ? import.meta.env.VITE_PROD_SERVER : import.meta.env.VITE_DEV_SERVER}/category`, { withCredentials: true })
            .then(response => {

                const categories = response.data?.categories.map(data => data.category);
                setValue('category', productToUpdate.category);
                setCategories(categories);
            }).catch(err => { })

    }, [])

    return (
        <motion.div onClick={(e) => {


            setUpdateModalToShow(false)
        }} variants={modalBG} initial="initial" animate="animate" exit="exit" className={`modal-bg d-flex justify-content-center pt-4 ${!isScreenSize992px ? 'align-items-end' : 'align-items-start'}`}>

            <motion.div onClick={(e) => e.stopPropagation()} key="modal" variants={updateModal} initial="initial" animate="animate" exit="exit" className={`update-modal card px-3 py-2 ${nightMode ? 'custom-bg-dark' : 'bg-light'}`} >

                <div className={`card-body  ${nightMode ? ' custom-bg-dark' : 'bg-light'}`}>

                    <div className='d-flex justify-content-between'>
                        <div>
                            <h5 className={`card-title fw-bold store-title h3 ${nightMode ? 'text-accent' : 'text-dark-gradient'}`}>Update Product</h5>
                            <h6 className="card-subtitle text-muted">Please provide all the fields.</h6>
                        </div>
                        <CloseButton variant={`${nightMode ? 'white' : 'dark'}`} onClick={() => setUpdateModalToShow(false)} />
                    </div>

                    {/* FORM */}
                    <form onSubmit={handleSubmit(updateProduct)}>

                        <Select id="category" label="Product Category" options={categories}
                            register={register} />

                        <InputField
                            id="product"
                            type="text"
                            label="Product"
                            placeholder="Enter product name"
                            register={register}
                            options={{
                                required: "Product is required.",
                                onBlur: (e) => {

                                    if (e.currentTarget.value === '')
                                        setError('product', { type: 'validate', message: 'Product is required.' })
                                },
                                onChange: (e) => {
                                    if (e.currentTarget.value !== '') setError('product', { type: 'validate', message: '' })
                                    else setError('product', { type: 'validate', message: 'Product is required.' })
                                }
                            }}
                            errors={errors}
                            getValues={getValues}
                        />

                        <InputField
                            id="price"
                            type="number"
                            label="Price"
                            placeholder="Enter product price"
                            register={register}
                            options={{
                                required: "Please provide a valid product price.",
                                min: {
                                    value: 1,
                                    message: 'Price must be greater than zero.'
                                },
                                onBlur: (e) => {

                                    if (e.currentTarget.value === '')
                                        setError('price', { type: 'validate', message: 'Please provide a valid product price.' })
                                },
                                onChange: (e) => {
                                    if (e.currentTarget.value !== '' && e.currentTarget.value > 0)
                                        setError('price', { type: 'validate', message: '' })
                                    else if (e.currentTarget.value !== '' && e.currentTarget.value <= 0)
                                        setError('price', { type: 'validate', message: 'Price must be greater than zero.' })
                                    else
                                        setError('price', { type: 'validate', message: 'Please provide a valid product price.' })
                                }
                            }}
                            errors={errors}
                            getValues={getValues}
                        />

                        <InputField
                            id="quantity"
                            type="number"
                            label="Quantity"
                            placeholder="Enter product quantity"
                            register={register}
                            options={{
                                required: "Product quantity is required.",
                                min: {
                                    value: 1,
                                    message: 'Quantity must be greater than zero.'
                                },
                                onBlur: (e) => {

                                    if (e.currentTarget.value === '')
                                        setError('quantity', { type: 'validate', message: 'Quantity is required.' })
                                },
                                onChange: (e) => {
                                    if (e.currentTarget.value !== '' && e.currentTarget.value > 0)
                                        setError('quantity', { type: 'validate', message: '' });
                                    else if (e.currentTarget.value !== '' && e.currentTarget.value <= 0)
                                        setError('quantity', { type: 'validate', message: 'Quantity must be greater than zero' });
                                    else
                                        setError('quantity', { type: 'validate', message: 'Quantity is required.' })
                                }
                            }}
                            errors={errors}
                            getValues={getValues}
                        />

                        <TextArea id="description" label="Description (Optional)" register={register} />

                        <button type="submit" className="btn btn-primary w-100 fw-bold mt-4" disabled={isUpdating}>
                            {isUpdating && <span className="spinner-grow spinner-grow-sm mr-1" role="status" aria-hidden="true"></span>}
                            {!isUpdating && <span className="">Update</span>}
                        </button>
                    </form>
                </div>
            </motion.div>
        </motion.div >
    )
}

export default UpdateProductModal