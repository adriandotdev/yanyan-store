/* eslint-disable react/no-unescaped-entities */
import { useState, useContext } from 'react'
import { useForm } from 'react-hook-form';

import InputField from '../components/InputField'
import Notification from '../components/Notification';

import '../css/login.css';
import axios from 'axios';

import { UtilityContext } from '../contexts/UtilityContext';

import { useNavigate, Navigate, useLoaderData } from 'react-router-dom';

function LoginPage() {

    const { nightMode, setRole } = useContext(UtilityContext);
    const { register, setError, handleSubmit, formState: { errors }, getValues } = useForm();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const isVerified = useLoaderData();

    const [notification, setNotification] = useState({ show: false, error: false, header: '', body: '' });

    const submit = async () => {

        setLoading(true);

        try {

            const response = await axios.post(`${import.meta.env.PROD ? import.meta.env.VITE_PROD_SERVER : import.meta.env.VITE_DEV_SERVER}/users/login`, getValues(), { withCredentials: true });

            if (response.status === 200) {
                // replace: true is for to not have a history for the 'login' route.
                console.log('LOGGED IN')
                setLoading(false);
                setRole(response.data.decodedToken.role);
                navigate('/dashboard/add-product', { replace: true });
            }
        }
        catch (err) {
            setLoading(false);
            setNotification({ show: true, error: true, header: err.response.data.header, body: err.response.data.body });
        }
    }

    document.title = "Yan-Yan's Store | Login";

    if (nightMode)
        document.body.style.background = 'linear-gradient(228deg, rgba(18,36,64,1) 0%, rgba(18,36,64,1) 44%, rgba(42,83,148,1) 100%)';
    else
        document.body.style.background = '#fff';


    if (isVerified)
        return <Navigate to="/dashboard/add-product" replace={true} />

    return (
        <div className='container login'>

            <div className='login-content d-flex flex-column justify-content-center px-3'>

                <h1 className={`login-title text-center ${nightMode ? 'text-accent' : 'text-dark-gradient'}`}>Yan-Yan's Store</h1>
                <form onSubmit={handleSubmit(submit)} className='w-100 d-flex flex-column align-items-center'>

                    <InputField
                        id="username"
                        type="text"
                        label="Username"
                        placeholder="Enter your username"
                        register={register}
                        options={{
                            required: "Please fill out this field",
                            onBlur: (e) => (e.currentTarget.value === '') ? setError('username', { type: 'validate', message: 'Please fill out this field' }) : setError('username', { type: 'validate', message: '' }),

                            onChange: (e) => (e.currentTarget.value === '') ? setError('username', { type: 'validate', message: 'Please fill out this field' }) : setError('username', { type: 'validate', message: '' })
                        }}
                        errors={errors}
                        getValues={getValues}
                    />

                    <InputField
                        id="password"
                        type="password"
                        label="Password"
                        placeholder="Enter your password"
                        register={register}
                        options={{
                            required: "Please fill out this field",
                            onBlur: (e) => (e.currentTarget.value === '') ? setError('password', { type: 'validate', message: 'Please fill out this field' }) : setError('password', { type: 'validate', message: '' }),
                            onChange: (e) => (e.currentTarget.value === '') ? setError('password', { type: 'validate', message: 'Please fill out this field' }) : setError('password', { type: 'validate', message: '' })
                        }}
                        errors={errors}
                        getValues={getValues}
                    />

                    <section className='form--section mt-auto mt-xl-0'>

                        <button type="submit" className={`btn w-100 fw-bold mt-3 ${nightMode ? 'btn-dark' : 'btn-dark-secondary'}`} disabled={loading}>
                            {loading && <span className="spinner-grow spinner-grow-sm mr-1" role="status" aria-hidden="true"></span>}
                            {!loading && <span className="">Sign In</span>}
                        </button>
                    </section>
                </form>

            </div>
            <Notification
                notification={notification}
                setNotification={setNotification}
                successHeader={notification.header}
                errorHeader={notification.header}
                successMessage={notification.body}
                errorMessage={notification.body} />
        </div>
    )
}

export const VerifiedChecker = async () => {

    try {
        const response = await axios.post(`${import.meta.env.PROD ? import.meta.env.VITE_PROD_SERVER : import.meta.env.VITE_DEV_SERVER}/api/user/verify-login`, {}, { withCredentials: true });

        return response.data;
    }
    catch (error) {

        console.log(error)
        return null;
    }
}
export default LoginPage