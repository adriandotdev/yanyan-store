import React, { useState, useContext, useEffect } from 'react';
import { UtilityContext } from '../contexts/UtilityContext';
import axios from 'axios';
import { Dropdown } from 'react-bootstrap';
import ConfirmationModal from './ConfirmationModal';
import { useScreenSizeDetection } from '../hooks/useScreenSizeDetection';
import { AnimatePresence } from 'framer-motion';
import Notification from './Notification';
import { useNavigate } from 'react-router-dom';

function Users() {

    const navigate = useNavigate();
    const { nightMode, ICON_DARK_COLOR, ICON_LIGHT_COLOR, role } = useContext(UtilityContext);
    const [isConfirmationModalToShow, showConfirmationModalToShow] = useState(false);

    const isMatch = useScreenSizeDetection(992);
    const [isDeleteInProgress, setDeleteInProgress] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);
    const [users, setUsers] = useState([]);
    const [notification, setNotification] = useState({
        show: false,
        error: false,
        header: '',
        message: ''
    });

    const deleteUser = async () => {

        setDeleteInProgress(true);

        try {


            const response = await axios.delete(`${import.meta.env.PROD ? import.meta.env.VITE_PROD_SERVER : import.meta.env.VITE_DEV_SERVER}/api/store/users/${userToDelete?._id}`, { withCredentials: true });

            if (response.status === 200) {

                setDeleteInProgress(false);
                setUsers(response.data.data);
                showConfirmationModalToShow(false);
                setNotification({ show: true, error: false, header: 'Success!', message: response.data.message });
                return;
            }
        }
        catch (err) {
            setDeleteInProgress(false);
            setNotification({ show: true, error: true, header: 'Request Failed', message: 'We cannot process your request due to Network Error' });
        }
    }

    const getUsers = async () => {

        try {
            const data = await axios.get(`${import.meta.env.PROD ? import.meta.env.VITE_PROD_SERVER : import.meta.env.VITE_DEV_SERVER}/api/store/users`, { withCredentials: true });

            setUsers(data.data.users);
        }
        catch (err) {
            setNotification({ show: true, error: true, header: 'Request Failed', message: 'We cannot process your request due to Network Error' });
        }
    }

    const activateAccount = async (id, status) => {

        try {

            const response = await axios.put(`${import.meta.env.PROD ? import.meta.env.VITE_PROD_SERVER : import.meta.env._DEV_SERVER}/api/store/users/status/${id}`, { status }, { withCredentials: true });

            if (response.status === 200) {

                setUsers(response.data.data);
                setNotification({ show: true, error: false, header: 'Success!', message: response.data.message });
            }
        }
        catch (err) {
            setNotification({ show: true, error: true, header: 'Request Failed', message: 'We cannot process your request due to Network Error' });
        }
    }

    useEffect(() => {

        document.title = "Yan-Yan's Store | Users";
        getUsers();
    }, []);


    if (role === "Viewer")
        navigate('/dashboard/add-product', { replace: true });

    return (
        <main className="products px-3 mt-4 mt-lg-3">
            <div className={`products-section-header d-flex flex-column align-items-center gap-3 flex-lg-row py-2 ${nightMode ? 'bg-dark' : ''}`}>
                <div className="d-flex align-items-center gap-3 w-auto">
                    <h2 className={`${nightMode ? 'text-accent' : 'text-dark-gradient'} fw-bold store-title h1 m-0`}>Users</h2>
                </div>

            </div>

            <div className={`table-container border border-opacity-10 ${nightMode ? 'border-light' : 'border-primary'}`}>
                <table className={`products-table table table-responsive table-bordered border-primary border-opacity-25 ${nightMode ? 'table-dark' : 'table-accent'}`}>
                    <thead>
                        <tr className={`products-table-header ${nightMode ? 'bg-dark' : 'bg-white'}`}>
                            <th className="text-center" scope="col">Actions</th>
                            <th scope="col">Role</th>
                            <th scope="col">Full Name</th>
                            <th scope="col">Username</th>
                            <th scope="col">Account Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users?.map(user => (
                                <tr key={user._id}>
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

                                                        activateAccount(user._id, user.accountStatus);
                                                    }}
                                                >
                                                    {user.accountStatus === 'ACTIVE' ? 'Deactivate' : 'Activate'}
                                                </Dropdown.Item>
                                                <Dropdown.Item
                                                    className="dropdown-item-variant-dark"
                                                    bsPrefix="NA"
                                                    onClick={() => {
                                                        showConfirmationModalToShow(true);
                                                        setUserToDelete(user);
                                                    }}>Delete</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </td>
                                    <td>{user.role}</td>
                                    <td>{user.name}</td>
                                    <td>{user.username}</td>
                                    <td className={`${user.accountStatus === 'ACTIVE' ? 'bg-success' : 'bg-danger'} text-white fw-bold`}>{user.accountStatus}</td>

                                </tr>
                            ))
                        }
                    </tbody>
                    <tfoot>
                        <tr className={`products-table-footer  ${nightMode ? 'bg-dark' : 'bg-white'}`}>
                            <th className="text-center" scope="col">Actions</th>
                            <th scope="col">Role</th>
                            <th scope="col">Full Name</th>
                            <th scope="col">Username</th>
                            <th scope="col">Account Status</th>
                        </tr>
                    </tfoot>
                </table>
            </div>

            <AnimatePresence>
                {isConfirmationModalToShow
                    && <ConfirmationModal
                        message='Are you sure you want to change the status of this user?'
                        isEventInProgress={isDeleteInProgress}
                        onClick={deleteUser}
                        toDelete={userToDelete.name}
                        isScreenSizeMatchTo992={isMatch}
                        showModal={showConfirmationModalToShow}
                        operation="delete" />}
            </AnimatePresence>

            <AnimatePresence>

            </AnimatePresence>

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

export default Users;