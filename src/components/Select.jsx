import { useContext } from 'react'

import { UtilityContext } from '../contexts/UtilityContext';

function Select({ id, label, options, register }) {

    const { nightMode } = useContext(UtilityContext);

    return (
        <section className='form--section'>
            <label htmlFor={id} className={`form-label ${nightMode ? 'text-light' : 'text-primary'}`}>{label}</label>
            <select {...register(id)} className="form-select" id={id} name={id} aria-label={label}>
                {
                    options.map((option, index) => <option key={index} value={option}>{option}</option>)
                }
            </select>
        </section>
    )
}

export default Select