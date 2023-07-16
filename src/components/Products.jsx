import { useContext, useState, useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import { UtilityContext } from "../contexts/UtilityContext";
import { Dropdown } from 'react-bootstrap';

// Hooks/Custom Hooks
import { useScreenSizeDetection } from "../hooks/useScreenSizeDetection";

// Components
import Notification from "./Notification";
import DropdownIcon from "./icons/DropdownIcon";
import ConfirmationModal from "./ConfirmationModal";
import UpdateProductModal from "./UpdateProductModal";
import SessionTimeoutModal from "./SessionTimeoutModal";

// motions
import { motion, AnimatePresence } from "framer-motion";
import { dropdown, dropdownItem } from "../motions/filterCategoryDropdownMotions";

// CSS
import '../css/products.css'

// Axios
import axios from "axios";

export default function Products() {

    // Context
    const { nightMode, ICON_DARK_COLOR, ICON_LIGHT_COLOR } = useContext(UtilityContext);

    const isMatch = useScreenSizeDetection(992);
    const categories = useLoaderData();
    const [productToSearch, setProductToSearch] = useState('');
    const [products, setProducts] = useState([]);
    const [filters, setFilters] = useState([]);

    // Indicator if the filter category drop
    const [isFiltersDropdownToShow, showFiltersDropdown] = useState(false);

    // Indicator if the confirmation modal should show.
    const [isConfirmationModalToShow, showConfirmationModalToShow] = useState(false);

    // Indicator if the update modal should show
    const [isUpdateModalToShow, setUpdateModalToShow] = useState(false);

    // Indicator if the session timeout modal is to show.
    const [isSessionTimeout, setSessionTimeout] = useState(false);

    // An object to be passed in the modal for deletion.
    const [productToDelete, setProductToDelete] = useState(null);

    // An object to be passed in the update modal for updating.
    const [productToUpdate, setProductToUpdate] = useState(null);

    // Used for showing/hiding the loading icon in the button of confirmation modal.
    const [isDeleteInProgress, setDeleteProgress] = useState(false);

    // Used for Notification
    const [notification, setNotification] = useState({
        show: false,
        error: false,
        header: '',
        message: ''
    });

    /**
     * @Description
     * Get all the products
     */
    const getProducts = async () => {

        try {

            const response = await axios.get(`${import.meta.env.PROD ? import.meta.env.VITE_PROD_SERVER : import.meta.env.VITE_DEV_SERVER}/products`, { withCredentials: true });

            if (response.status === 200) {

                setProducts(response.data.products);
            }
        }
        catch (err) {

            if (err.response.status === 403) {

                setSessionTimeout(true);
            }
            else if (err.response.status === 404) {
                setNotification({ show: true, error: true, message: '' });
            }
        }
    }

    /**
     * @Description
     * Delete a product based on id.
     */
    const deleteProduct = async () => {

        setDeleteProgress(true);

        try {
            const response = await axios.delete(`${import.meta.env.PROD ? import.meta.env.VITE_PROD_SERVER : import.meta.env.VITE_DEV_SERVER}/products/${productToDelete?._id}`);

            if (response.status === 200) {

                setDeleteProgress(false);
                setProducts(response.data.products);
                showConfirmationModalToShow(false);
                setNotification({ show: true, error: false, header: 'Success!', message: response.data.message });
                return;
            }

        }
        catch (err) {
            setDeleteProgress(false);
            setNotification({ show: true, error: true, header: 'Failed', message: err.response.data.message });
        }
    }

    /**
     * @Description
     * Get all the products that is equal to one of the selected categories
     * in category filter dropdown.
     */
    const applyCategoryFilter = async (e) => {

        e.stopPropagation();

        if (filters.length < 1) return;

        const response = await axios.post(`${import.meta.env.PROD ? import.meta.env.VITE_PROD_SERVER : import.meta.env.VITE_DEV_SERVER}/products/filter`, { categories: filters })

        if (response.status === 200) {
            setProducts(response.data.products);
            hideFiltersDropdown();
        }

    }

    const hideFiltersDropdown = () => {

        showFiltersDropdown(false);
    }

    /**
     * @Description
     * Click event for the document.body to close the filter dropdown
     */
    useEffect(() => {

        document.body.addEventListener('click', hideFiltersDropdown);

        return () => {
            document.body.removeEventListener('click', hideFiltersDropdown);
        }
    }, [])

    /**
     * @Description
     * Get all the products in first render.
     */
    useEffect(() => {

        getProducts();
    }, []);

    document.title = "Yan-Yan's Store | Products";

    return (

        <main className="products px-3 mt-4 mt-lg-3">
            {/* Products Header */}
            <div className={`products-section-header d-flex flex-column align-items-center gap-3 flex-lg-row py-2 ${nightMode ? 'bg-dark' : ''}`}>
                <div className="d-flex align-items-center gap-3 w-auto">
                    <h2 className={`${nightMode ? 'text-accent' : 'text-dark-gradient'} fw-bold store-title h1 m-0`}>Products</h2>

                    {/* Custom Dropdown */}
                    <div className="custom-dropdown">
                        <button onClick={(e) => {
                            e.stopPropagation();
                            showFiltersDropdown(prev => !prev)
                        }} className={`btn btn-sm ${nightMode ? 'btn-accent border' : 'btn-dark-secondary'}`} type="button">
                            <span>Filter by Category</span>
                            <DropdownIcon />
                        </button>
                        {isFiltersDropdownToShow && <motion.ul variants={dropdown} initial="initial" animate="animate" className={`content bg-light pt-3 list-unstyled rounded-1 border ${nightMode ? 'border-dark' : 'border-primary'}`}>
                            {
                                categories.map(category => (
                                    <motion.label key={category._id} onClick={(e) => e.stopPropagation()} variants={dropdownItem} whileHover="whileHover" className="d-block px-3 py-2" htmlFor={category._id}>
                                        <motion.li className="d-flex align-items-center justify-content-between">
                                            <span>{category.category}</span>
                                            <input checked={filters.includes(category.category)} onChange={(e) => {

                                                let categoryLabel = e.target.previousSibling.textContent;

                                                if (filters.includes(categoryLabel)) {

                                                    const newFilters = filters.filter(category => category !== categoryLabel)

                                                    if (newFilters.length < 1) {
                                                        getProducts();
                                                    }
                                                    setFilters(newFilters);
                                                }
                                                else {

                                                    setFilters([...filters, categoryLabel]);
                                                }

                                            }} className="d-block form-check-input me-1" type="checkbox" value="" id={category._id}></input>
                                        </motion.li>
                                    </motion.label>
                                ))
                            }
                            <div className="px-1 pb-1 pt-1">
                                <button onClick={applyCategoryFilter} className="btn btn-dark w-100">Apply</button>
                            </div>
                        </motion.ul>}
                    </div>
                </div>

                <div className="mobile-product-search" >
                    <input onChange={(e) => setProductToSearch(e.target.value)} type="text" className="form-control" placeholder="Search Product" />
                </div>
            </div>

            {/* Table */}
            <div className={`table-container border border-opacity-10 ${nightMode ? 'border-light' : 'border-primary'}`}>
                <table className={`products-table table table-responsive table-striped table-hover table-bordered border-primary border-opacity-25 ${nightMode ? 'table-dark' : 'table-accent'}`}>
                    <thead>
                        <tr className={`products-table-header ${nightMode ? 'bg-dark' : 'bg-white'}`}>
                            <th className="text-center" scope="col">Actions</th>
                            <th scope="col">Category</th>
                            <th scope="col">Product</th>
                            <th scope="col">Price</th>
                            <th scope="col">Quantity</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            products.filter(product => {
                                if (productToSearch) {
                                    if (String(product.product).toLowerCase().includes(productToSearch.toLowerCase()))
                                        return product;
                                }
                                else {
                                    return product;
                                }
                            }).map(product => {

                                return (

                                    <tr key={product._id}>
                                        <td style={{ width: '5rem' }} className="text-center p-0">
                                            <Dropdown>
                                                <Dropdown.Toggle className="action" bsPrefix="NA">
                                                    <span className="">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill={`${nightMode ? ICON_DARK_COLOR : ICON_LIGHT_COLOR}`} className="bi bi-three-dots" viewBox="0 0 16 16">
                                                            <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
                                                        </svg>
                                                    </span>
                                                </Dropdown.Toggle>

                                                {/* Table's Action Dropdown Menu */}
                                                <Dropdown.Menu>
                                                    <Dropdown.Item
                                                        className="dropdown-item-variant-dark"
                                                        bsPrefix="NA"
                                                        onClick={() => {
                                                            setProductToUpdate(product);
                                                            setUpdateModalToShow(true);
                                                        }}
                                                    >
                                                        Edit
                                                    </Dropdown.Item>
                                                    <Dropdown.Item
                                                        className="dropdown-item-variant-dark"
                                                        bsPrefix="NA"
                                                        onClick={() => {
                                                            setProductToDelete(product);
                                                            showConfirmationModalToShow(true);
                                                        }}>Delete</Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </td>
                                        <td>{product.category}</td>
                                        <td>{product.product}</td>
                                        <td>{Number(product.price).toLocaleString('en-PH', { style: 'currency', currency: 'PHP' })}</td>
                                        <td>{product.quantity}</td>

                                    </tr>
                                )
                            })
                        }
                    </tbody>
                    <tfoot>
                        <tr className={`products-table-footer  ${nightMode ? 'bg-dark' : 'bg-white'}`}>
                            <th className="text-center" scope="col">Actions</th>
                            <th scope="col">Category</th>
                            <th scope="col">Product</th>
                            <th scope="col">Price</th>
                            <th scope="col">Quantity</th>
                        </tr>
                    </tfoot>
                </table>
            </div>

            <AnimatePresence>
                {isUpdateModalToShow &&
                    <UpdateProductModal
                        isScreenSize992px={isMatch}
                        setUpdateModalToShow={setUpdateModalToShow}
                        setNotification={setNotification}
                        setProducts={setProducts}
                        productToUpdate={productToUpdate} />}
            </AnimatePresence>

            {/* Confirmation Modal */}
            <AnimatePresence>
                {isConfirmationModalToShow
                    && <ConfirmationModal
                        isEventInProgress={isDeleteInProgress}
                        onClick={deleteProduct}
                        toDelete={productToDelete.product}
                        isScreenSizeMatchTo992={isMatch}
                        showModal={showConfirmationModalToShow}
                        operation="delete" />}
            </AnimatePresence>

            {isSessionTimeout && <SessionTimeoutModal />}

            <Notification
                notification={notification}
                setNotification={setNotification}
                successHeader={notification.header}
                errorHeader={notification.header}
                successMessage={notification.message}
                errorMessage={notification.message} />
        </main>
    )
}

// Loader Function
// Will run before this component render.
export const categoriesLoader = async () => {

    try {
        const data = await axios.get(`${import.meta.env.PROD ? import.meta.env.VITE_PROD_SERVER : import.meta.env.VITE_DEV_SERVER}/category`, { withCredentials: true });

        /** This is a promise but the loader function will parse it for us. */
        return data.data.categories;
    }
    catch (err) {
        return null;
    }
}