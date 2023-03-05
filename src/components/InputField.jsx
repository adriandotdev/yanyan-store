import { useContext } from 'react'

// Context
import { UtilityContext } from '../contexts/UtilityContext';

function InputField({ type, id, label }) {

    const { nightMode } = useContext(UtilityContext);

    return (
        <section className='form--section'>
            <label for={id} className={`form-label ${nightMode ? 'text-light' : 'text-primary'}`}>{label}</label>
            <input type={type} className='form-control' id={id} />
        </section>
    )
}

export default InputField