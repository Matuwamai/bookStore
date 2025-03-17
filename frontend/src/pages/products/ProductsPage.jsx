import React from 'react'
import ProductsTable from '../../components/products/ProductsTable'
import PageHeaderWithSearch from '../../components/PageHeaderWithSearch'

const ProductsPage = () => {
  return (
    <div>
      <PageHeaderWithSearch title='Products' subtitle='All products' search />
      <ProductsTable />
    </div>
  )
}

export default ProductsPage