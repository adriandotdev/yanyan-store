import { useContext } from 'react'

import { UtilityContext } from '../contexts/UtilityContext';

function Select({ id, label, options }) {

    const { nightMode } = useContext(UtilityContext);

    return (
        <section className='form--section'>
            <label for={id} className={`form-label ${nightMode ? 'text-light' : 'text-primary'}`}>{label}</label>
            <select className="form-select" id={id} aria-label={label}>
                {
                    options.map(option => <option value={option}>{option}</option>)
                }
            </select>
        </section>
    )
}

export default Select