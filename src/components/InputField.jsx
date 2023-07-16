import { useContext } from 'react'

// Context
import { UtilityContext } from '../contexts/UtilityContext';

function InputField({ type, id, label, placeholder, register, options, errors, getValues }) {

    const { nightMode } = useContext(UtilityContext);

    return (
        <section className='form--section'>
            <label htmlFor={id} className={`form--section-label form-label ${nightMode ? 'text-light' : 'text-primary'}`}>{label}</label>
            <input {...register(id, options)} type={type} name={id} className={`form-control ${errors && errors[id]?.message ? 'is-invalid' :
                getValues()[id] && !errors[id]?.message ? 'is-valid' : ''}`} id={id} placeholder={placeholder} step={type === 'number' ? "0.01" : "0"} />
            {errors && errors[id]?.message && <small className='d-block mt-1 text-danger fw-bold mx-1 d-block'>*{errors[id].message}</small>}
        </section>
    )
}

export default InputField