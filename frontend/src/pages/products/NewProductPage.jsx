import React, { useEffect } from "react";
import ProductForm from "../../components/products/ProductForm";
import { useDispatch } from "react-redux";
import { clearProductState } from "../../store/slices/productSlices";

const NewProductPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearProductState());
    };
  }, [dispatch]);
  return (
    <div>
      <ProductForm />
    </div>
  );
};

export default NewProductPage;
