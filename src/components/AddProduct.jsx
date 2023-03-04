import { useContext } from 'react'
import { UtilityContext } from '../contexts/UtilityContext';

function AddProduct() {

    const { nightMode } = useContext(UtilityContext);

    return (
        <div className='pt-4 px-3 pb-4'>

            <div>
                <h2 className={`fw-bold ${nightMode ? 'text-light' : 'text-primary'}`}>New Product</h2>
            </div>

            <form className='add-prod-form' action="">

                <section className='form--section'>
                    <label for="category" className={`form-label ${nightMode ? 'text-light' : 'text-primary'}`}>Category</label>
                    <select className="form-select" id='category' aria-label="Product category">
                        <option value="1">Beverage</option>
                        <option value="2">Condiments</option>
                        <option value="3">Dairy Product</option>
                    </select>
                </section>

                <section className='form--section'>
                    <label for="product-name" className={`form-label ${nightMode ? 'text-light' : 'text-primary'}`}>Product Name</label>
                    <input type='text' className='form-control' id='product-name' />
                </section>

                <section className='form--section'>
                    <label for="price" className={`form-label ${nightMode ? 'text-light' : 'text-primary'}`}>Price</label>
                    <input type='text' className='form-control' id='price' />
                </section>

                <section className='form--section'>
                    <label for="quantity" className={`form-label ${nightMode ? 'text-light' : 'text-primary'}`}>Quantity</label>
                    <input type='text' className='form-control' id='quantity' />
                </section>

                <section className='form--section'>
                    <input className="btn btn-primary w-100 fw-bold" type="submit" value="Add" />
                </section>
            </form>
        </div>
    )
}

export default AddProduct