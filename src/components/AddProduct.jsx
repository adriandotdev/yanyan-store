/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';

// Components
import Notification from './Notification';
import InputField from './InputField';
import Select from './Select';
import AddCategoryModal from './AddCategoryModal';
import TextArea from './TextArea';
import SessionTimeoutModal from './SessionTimeoutModal';

// Contexts
import { UtilityContext } from '../contexts/UtilityContext';

import axios from 'axios';

import { useScreenSizeDetection } from '../hooks/useScreenSizeDetection';

import DropdownIcon from './icons/DropdownIcon';
import { AnimatePresence } from 'framer-motion';

export default function AddProduct() {

    const { nightMode } = useContext(UtilityContext);
    const isMatch = useScreenSizeDetection(992);

    // useForm
    const { register, reset, setError, handleSubmit, formState: { errors }, getValues, setValue } = useForm();

    // Notification
    const [notification, setNotification] = useState({ show: false, error: false, message: '' });

    // Loading state for the button
    const [loading, setLoading] = useState(false);

    // modal for adding category.
    const [addCategoryModal, showAddCategoryModal] = useState(false);

    // Indicator if the session timeout modal is to show.
    const [isSessionTimeout, setSessionTimeout] = useState(false);

    // Category list to be rendered in the Product Category dropdown.
    const [categoryList, setCategoryList] = useState([]);

    const getProductCategories = async () => {

        try {

            const response = await axios.get(`${import.meta.env.PROD ? import.meta.env.VITE_PROD_SERVER : import.meta.env.VITE_DEV_SERVER}/category`, { withCredentials: true });

            if (response.status === 200) {
                const categories = response.data?.categories.map(data => data.category);
                setValue('category', categories[0]);
                setCategoryList(categories);
            }
        }
        catch (_err) {

            if (_err.response.status === 403) {
                setSessionTimeout(true);
            }
            else {
                setNotification({ show: true, error: true, message: "Categories can't be loaded." });
            }
        }
    }

    // Add Product
    const addProduct = async () => {

        setLoading(true);

        try {

            const response = await axios.post(`${import.meta.env.PROD ? import.meta.env.VITE_PROD_SERVER : import.meta.env.VITE_DEV_SERVER}/products/add`, getValues());

            if (response.status >= 200) {

                setNotification({ show: true, error: false, message: response.data.message });
                reset({ product: '', price: '', quantity: '', description: '' });
                setLoading(false);
            }
        }
        catch (error) {
            setNotification({ show: true, error: true, message: 'Product cannot be added!' });
            setLoading(false);
        }
    }


    // Fetch category list.
    useEffect(() => {

        getProductCategories();

    }, [addCategoryModal])

    document.title = "Yan-Yan's Store | Add Product";

    return (
        <div className='pt-4 px-3 pb-4'>

            <div>
                <h2 className={`fw-bold h1 store-title ${nightMode ? 'text-accent' : 'text-dark-gradient'}`}>New Product</h2>
            </div>

            <form onSubmit={handleSubmit(addProduct)}>

                <div className='d-flex align-items-center gap-2'>
                    <Select id="category" label="Product Category" options={categoryList}
                        register={register} />

                    <div className="btn-group dropstart align-self-end">
                        <button type="button" className={`btn rounded ${nightMode ? 'btn-accent' : 'btn-dark-gradient'}`} data-bs-toggle="dropdown" aria-expanded="false">
                            <DropdownIcon />
                        </button>
                        <ul className="dropdown-menu ">
                            <li onClick={() => showAddCategoryModal(true)}><span className="dropdown-item" href="#">Add</span></li>
                            <li><span className="dropdown-item" href="#">Delete</span></li>
                            <li><span className="dropdown-item" href="#">Edit</span></li>
                        </ul>
                    </div>
                </div>

                <InputField
                    id="product"
                    type="text"
                    label="Product Name"
                    placeholder="Enter product name"
                    register={register}
                    options={{
                        required: "Please provide a product name.",
                        pattern: {
                            value: /^[a-zA-Z_\s\d-]+$/ig,
                            message: 'Please provide a product name consisting of letters and numbers only.'
                        },
                        onBlur: (e) => {

                            if (e.currentTarget.value === '')
                                setError('product', { type: 'validate', message: 'Please provide a product name.' })
                        },
                        onChange: (e) => {
                            if (e.currentTarget.value !== '') setError('product', { type: 'validate', message: '' })
                            else setError('product', { type: 'validate', message: 'Please provide a product name.' })
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

                <section className='form--section'>

                    <button type="submit" className={`btn w-100 fw-bold mt-3 ${nightMode ? "btn-dark-gradient text-accent" : "btn-dark-secondary text-light"}`} disabled={loading}>
                        {loading && <span className="spinner-grow spinner-grow-sm mr-1" role="status" aria-hidden="true"></span>}
                        {!loading && <span className="">Add</span>}
                    </button>
                </section>
            </form>

            {/* Notification */}
            <Notification
                notification={notification}
                setNotification={setNotification}
                successHeader={notification.message}
                errorHeader={notification.message}
                successMessage="You can view it on Products section."
                errorMessage="We cannot process your request. Please try again." />

            {isSessionTimeout && <SessionTimeoutModal />}

            {/* Category Modal */}
            <AnimatePresence>
                {addCategoryModal && <AddCategoryModal isScreenSize992px={isMatch} showAddCategoryModal={showAddCategoryModal} isNightMode={nightMode} />}
            </AnimatePresence>
        </div >
    )
}