import { useContext } from 'react'
import { Link } from 'react-router-dom';
import { UtilityContext } from '../contexts/UtilityContext';

function ErrorPage() {

  const { nightMode } = useContext(UtilityContext);

  return (
    <div className={`container min-vh-100 d-flex flex-column justify-content-center align-items-center ${nightMode && 'bg-dark'}`}>

      <h1 className='display-2 text-center fw-bold'>Got lost in the woods?</h1>
      <p className='display-6'>We'll get you back on track</p>

      <Link to="/admin/add-product" className='btn btn-primary'>Go Back</Link>
    </div>
  )
}

export default ErrorPage