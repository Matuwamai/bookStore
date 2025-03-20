import React, { useEffect } from "react";
import ProductCard from "./ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../store/actions/productActions";
import Loading from "./Loading";

const ShopSection = () => {
  const dispatch = useDispatch();
  const { loading, products } = useSelector((state) => state.product);
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  return (
    <div className='p-8 lg:p-16' id='shop'>
      <h3 className='text-lg font-semibold text-blue-900'>Shop</h3>
      <div className='flex items-center justify-between mt-4'>
        {loading && <Loading />}
      </div>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ShopSection;
