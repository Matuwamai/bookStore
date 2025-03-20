import React, { useEffect } from 'react'
import ProductsTable from '../../components/products/ProductsTable'
import PageHeaderWithSearch from '../../components/PageHeaderWithSearch'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '../../store/actions/productActions'
import { resetProductState } from '../../store/slices/productSlices'

const ProductsPage = () => {
  const dispatch = useDispatch();
  const {products} = useSelector(state => state.product)

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    return () => {
      dispatch(resetProductState())
    }
  }, [dispatch]);
  return (
    <div>
      <PageHeaderWithSearch title='Products' subtitle='All products' search />
      <ProductsTable data={products} />
    </div>
  )
}

export default ProductsPage