import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { fetchProductDetails } from '../../store/actions/productActions';

const ProductDetailsPage = () => {
  const dispatch = useDispatch();
  const { productDetails } = useSelector(state => state.product);
  const params = useParams();
  const productName = params.name;

  useEffect(() => {
    if (productName) {
      dispatch(fetchProductDetails(productName))
    }
  }, [dispatch, productName])


  console.log(productDetails)
  return (
    <div className='container mx-auto'>
      <h1 className='text-2xl font-semibold'>Product Details Page</h1>
      <p>Product ID: {productName}</p>
    </div>
  )
}

export default ProductDetailsPage