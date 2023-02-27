import React from 'react'

function Header() {
  return (
    <div className="row bg-primary gy-1 dashboard-header p-1">
        <div className="col row align-items-center justify-content-between m-0">
            <h1 className='text-white h3 pt-2 fw-bold col-auto'>Yan-Yan's Store</h1>

            {/* Offcanvas toggle button */}
            <button class="btn btn-primary d-lg-none col-auto" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasResponsive" aria-controls="offcanvasResponsive">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-list" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
                </svg>
            </button>
        </div>
    </div>
  )
}

export default Header