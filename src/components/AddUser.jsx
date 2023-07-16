import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

// Components
import Notification from './Notification';
import InputField from './InputField';
import Select from './Select';

// Contexts
import { UtilityContext } from '../contexts/UtilityContext';

import axios from 'axios';

function AddUser() {

    const navigate = useNavigate();

    const { nightMode, role } = useContext(UtilityContext);
    const { register, reset, setError, handleSubmit, getValues, watch, formState: { errors } } = useForm();

    const [loading, setLoading] = useState(false);
    const [notification, setNotification] = useState({ show: false, error: false, message: '' });

    const password = watch('password');

    const setFieldError = (e, fieldName, message) => {

        if (e.currentTarget.value === '')
            setError(fieldName, { type: 'validate', message: message });
        else
            setError(fieldName, { type: 'validate', message: '' });
    }

    const submit = async () => {

        setLoading(true);

        try {
            const response = await axios.post(`${import.meta.env.PROD ? import.meta.env.VITE_PROD_SERVER : import.meta.env.VITE_DEV_SERVER}/users/add`, getValues())

            if (response.status === 200) {
                setLoading(false);
                setNotification({ show: true, error: false, message: response.data.message });
                reset();
            }
        }
        catch (err) {
            setLoading(false);
            setNotification({ show: true, error: true, message: err.response.data.message });
        }
    }

    document.title = "Yan-Yan's Store | Add User";

    if (role === "Viewer")
        navigate('/dashboard/add-product', { replace: true });

    return (
        <div className='pt-4 px-3 pb-4'>

            <div>
                <h2 className={`fw-bold store-title h1 ${nightMode ? 'text-accent' : 'text-dark-gradient'}`}>New User</h2>
            </div>

            <form className='add-prod-form' onSubmit={handleSubmit(submit)}>

                <Select id="role" label="Role" options={['Store Owner', 'Viewer']}
                    register={register} />

                {/* Fullname InputField */}
                <InputField
                    id="name"
                    type="text"
                    label="Full Name"
                    placeholder="Enter user's full name"
                    register={register}
                    options={{
                        required: "Please provide a name.",
                        onBlur: (e) => setFieldError(e, 'name', 'Please provide a name.'),
                        onChange: (e) => setFieldError(e, 'name', 'Please provide a name.')
                    }}
                    errors={errors}
                    getValues={getValues}
                />

                {/* Username InputField */}
                <InputField
                    id="username"
                    type="text"
                    label="Username"
                    placeholder="Enter username here"
                    register={register}
                    options={{
                        required: "Please provide a username.",

                        minLength: {
                            value: 8,
                            message: "Username must be at least 8 characters."
                        },

                        onBlur: (e) => (e.currentTarget.value === '' || e.currentTarget.value.length < 8) ? setError('username', { type: 'validate', message: 'Username must be at least 8 characters' }) : setError('username', { type: 'validate', message: '' }),

                        onChange: (e) => (e.currentTarget.value === '' || e.currentTarget.value.length < 8) ? setError('username', { type: 'validate', message: 'Username must be at least 8 characters' }) : setError('username', { type: 'validate', message: '' })
                    }}
                    errors={errors}
                    getValues={getValues}
                />

                {/* Password InputField */}
                <InputField
                    id="password"
                    type="password"
                    label="Password"
                    placeholder="Enter password here"
                    register={register}
                    options={{
                        required: "Password is required",
                        minLength: {
                            value: 8,
                            message: 'Password must be at least 8 characters.'
                        },
                        onBlur: (e) => (e.currentTarget.value === '' || e.currentTarget.value.length < 8) ? setError('password', { type: 'validate', message: 'Password must be at least 8 characters' }) : setError('password', { type: 'validate', message: '' }),
                        onChange: (e) => (e.currentTarget.value === '' || e.currentTarget.value.length < 8) ? setError('password', { type: 'validate', message: 'Password must be at least 8 characters' }) : setError('password', { type: 'validate', message: '' })
                    }}
                    errors={errors}
                    getValues={getValues}
                />

                {/* Confirm Password InputField */}
                <InputField
                    id="confirm-pass"
                    type="password"
                    label="Confirm Password"
                    placeholder="Confirm password"
                    register={register}
                    options={{
                        required: "Confirm your password",
                        validate: (value, formValues) => value === password || "Password does not match.",
                        onChange: (e) => e.currentTarget.value === password ? setError('confirm-pass', { type: 'validate', message: '' })
                            : setError('confirm-pass', { type: 'validate', message: 'Password does not match' })
                    }}
                    errors={errors}
                    getValues={getValues}
                />

                {/* Submit Button and with the Spinner component */}
                <section className='form--section'>
                    <button type="submit" className={`btn w-100 fw-bold mt-3 ${nightMode ? 'btn-dark-gradient text-accent' : 'btn-dark-secondary text-light'}`} disabled={loading}>
                        {loading && <span className="spinner-grow spinner-grow-sm mr-1" role="status" aria-hidden="true"></span>}
                        {!loading && <span className="">Add</span>}
                    </button>
                </section>
            </form>

            <Notification
                notification={notification}
                setNotification={setNotification}
                successHeader={notification.message}
                errorHeader={notification.message}
                successMessage="User account succesfully created!"
                errorMessage="We cannot process your request." />
        </div >
    )
}

export default AddUser