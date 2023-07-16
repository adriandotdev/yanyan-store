import React, { useContext } from 'react'
import { UtilityContext } from '../contexts/UtilityContext'

function TextArea({ id, label, register }) {

    const { nightMode } = useContext(UtilityContext);

    return (
        <section className='form--section'>
            <label htmlFor={id} className={`form--section-label form-label ${nightMode ? 'text-light' : 'text-primary'}`}>{label}</label>
            <textarea {...register(id)} name={id} id={id} placeholder='Please provide product description here' className="form-control" rows="4"></textarea>
        </section>
    )
}

export default TextArea