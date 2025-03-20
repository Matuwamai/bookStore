import React, { useEffect } from 'react'
import ProductForm from '../../components/products/ProductForm'
import { useDispatch } from 'react-redux';
import { resetProductState } from '../../store/slices/productSlices';

const NewProductPage = () => {
  const dispatch = useDispatch();

   useEffect(() => {
      return () => {
        dispatch(resetProductState())
      }
    }, [dispatch]);
  return (
    <div>
      <ProductForm />
    </div>
  )
}

export default NewProductPage