import React, { useContext, useState } from 'react'
import { UtilityContext } from '../contexts/UtilityContext';
import Notification from './Notification';

function Header() {

  const context = useContext(UtilityContext);
  const [notification, setNotification] = useState({ show: false, error: false });

  return (
    <div className={`d-none d-lg-block row gy-1 dashboard-header p-1 py-2 py-lg-0 my-2 ${context.nightMode ? 'bg-dark border border-accent border-opacity-10' : 'bg-dark-secondary'}`}>
      <div className="col row align-items-center justify-content-between m-0">
        <h1 className='text-white h3 pt-2 fw-bold col-auto'>Yan-Yan's Store</h1>
      </div>

      <Notification notification={notification} setNotification={setNotification} successHeader="Product successfully added" errorHeader="Logging out can't be processed" successMessage="You can view it on Products section." errorMessage="We cannot process your request. Please try again." />
    </div>
  )
}

export default Header