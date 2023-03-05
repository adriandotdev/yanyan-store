import { useContext } from 'react';

// Components
import InputField from './InputField';
import Select from './Select';

// Contexts
import { UtilityContext } from '../contexts/UtilityContext';

function AddUser() {

    const { nightMode } = useContext(UtilityContext);

    return (
        <div className='pt-4 px-3 pb-4'>

            <div>
                <h2 className={`fw-bold ${nightMode ? 'text-light' : 'text-primary'}`}>New User</h2>
            </div>

            <form className='add-prod-form' action="">

                <Select id="role" label="Role" options={['Store Owner', 'Viewer']} />

                <InputField id="name" type="text" label="Name" placeholder="Enter user's name" />

                <InputField id="name" type="text" label="Username" placeholder="Enter the username" />

                <InputField id="password" type="password" label="Password" placeholder="Enter your password" />

                <InputField id="confirm-password" type="password" label="Re-Type Password" placeholder="Confirm your password" />

                <section className='form--section'>
                    <input className="btn btn-primary w-100 fw-bold" type="submit" value="Add" />
                </section>
            </form>
        </div>
    )
}

export default AddUser