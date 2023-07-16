import { useContext } from 'react'
import { Link } from 'react-router-dom';
import { UtilityContext } from '../contexts/UtilityContext';

function ErrorPage() {

  const { nightMode } = useContext(UtilityContext);

  return (
    <div className={`p-3 min-vh-100 d-flex flex-column justify-content-center align-items-center ${nightMode && 'bg-dark-gradient'}`}>

      <h1 className={`display-2 text-center fw-bold ${nightMode ? 'text-accent' : ''}`}>Oops! This page seems to have taken a detour.</h1>
      <p className={`display-6 ${nightMode ? 'text-light' : ''}`}>We'll get you back on track</p>

      <Link to="/" className={`btn font-weight-bold ${nightMode ? 'btn-accent' : 'btn-dark-secondary'}`}>Go Back</Link>
    </div>
  )
}

export default ErrorPage