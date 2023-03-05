import { useContext } from 'react';

// Component
import InputField from './InputField';
import Select from './Select';

// Context
import { UtilityContext } from '../contexts/UtilityContext';

function AddProduct() {

    const { nightMode } = useContext(UtilityContext);

    return (
        <div className='pt-4 px-3 pb-4'>

            <div>
                <h2 className={`fw-bold ${nightMode ? 'text-light' : 'text-primary'}`}>New Product</h2>
            </div>

            <form className='add-prod-form' action="">

                <Select id="category" label="Product Category" options={['Beverage', 'Condiments']} />

                <InputField id="product-name" type="text" label="Product Name" placeholder="Enter product name" />

                <InputField id="price" type="text" label="Price" placeholder="Enter product price" />

                <InputField id="quantity" type="text" label="Quantity" placeholder="Enter product quantity" />

                <section className='form--section'>
                    <input className="btn btn-primary w-100 fw-bold" type="submit" value="Add" />
                </section>
            </form>
        </div>
    )
}

export default AddProduct