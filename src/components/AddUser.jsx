import { useContext } from 'react';
import { UtilityContext } from '../contexts/UtilityContext';

function AddUser() {

    const { nightMode } = useContext(UtilityContext);

    return (
        <div className='pt-4 px-3 pb-4'>

            <div>
                <h2 className={`fw-bold ${nightMode ? 'text-light' : 'text-primary'}`}>New User</h2>
            </div>

            <form className='add-prod-form' action="">

                <section className='form--section'>
                    <label for="category" className={`form-label ${nightMode ? 'text-light' : 'text-primary'}`}>Role</label>
                    <select className="form-select" id='category' aria-label="Product category">
                        <option value="1">Store Owner</option>
                        <option value="2">Viewer</option>
                    </select>
                </section>

                <section className='form--section'>
                    <label for="name" className={`form-label ${nightMode ? 'text-light' : 'text-primary'}`}>Name</label>
                    <input type='text' className='form-control' id='name' />
                </section>

                <section className='form--section'>
                    <label for="username" className={`form-label ${nightMode ? 'text-light' : 'text-primary'}`}>Username</label>
                    <input type='text' className='form-control' id='username' />
                </section>

                <section className='form--section'>
                    <label for="password" className={`form-label ${nightMode ? 'text-light' : 'text-primary'}`}>Password</label>
                    <input type='text' className='form-control' id='password' />
                </section>

                <section className='form--section'>
                    <label for="confirm-password" className={`form-label ${nightMode ? 'text-light' : 'text-primary'}`}>Confirm Password</label>
                    <input type='text' className='form-control' id='confirm-password' />
                </section>

                <section className='form--section'>
                    <input className="btn btn-primary w-100 fw-bold" type="submit" value="Add" />
                </section>
            </form>
        </div>
    )
}

export default AddUser