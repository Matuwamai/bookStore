import React, { useState } from "react";
import { MinusIcon, PlusIcon } from "lucide-react";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../store/slices/cartSlices";
import {Link} from 'react-router-dom';

const ProductCard = ({product}) => {
    const dispatch = useDispatch();
    const [qty, setQty] = useState(1);

    const handleQtyChange = (type) => {
        if (type === "increment") {
            setQty(qty + 1);
        } else if (type === "decrement" && qty > 1) {
            setQty(qty - 1);
        }
    }

    const handleAddToCart = () => {
        dispatch(addItemToCart({...product, quantity: qty}));
    }
  return (
    <div class='bg-white rounded-lg shadow-md overflow-hidden max-w-sm w-full relative'>
      <div class='relative'>
        <img
          src={product.imageUrl}
          alt={product.title.slice(0, 20)}
          class='w-full h-[300px] object-cover'
        />
        <span class='absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded'>
          SALE
        </span>
        <button class='absolute top-2 right-2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors duration-200'></button>
      </div>
      <div class='p-4 mb-10'>
        <div class='flex justify-between items-start mb-2'>
          <div>
            <Link className='hover:text-blue-900' to={`/shop/products/${product.title.trim().toLowerCase().replace(/\s/g, "_")}`}>
              <h6 class='font-semibold text-gray-600 mb-1'>{product.title}</h6>
            </Link>
            <p class='text-sm text-gray-600'>{product.subject.name}</p>
          </div>
        </div>
        <div class='py-2'>
          <p class='text-lg font-bold text-green-600'>
            KES {product.price.toLocaleString()}
          </p>
        </div>
      </div>
      <div class='flex space-x-2 items-center absolute bottom-4 left-4 right-4'>
        <div className='flex items-center space-x-2'>
          <button
            className='bg-gray-200 rounded-md p-2 text-gray-600 cursor-pointer'
            onClick={() => handleQtyChange("decrement")}>
            <MinusIcon />
          </button>
          <input
            type='text'
            className='w-10 border-gray-200 rounded-lg'
            value={qty}
            onChange={(e) => setQty(e.target.value)}
          />
          <button
            className='bg-gray-200 rounded-md p-2 text-gray-600 cursor-pointer'
            onClick={() => handleQtyChange("increment")}>
            <PlusIcon />
          </button>
        </div>
        <button
          class='flex-1 bg-blue-900 text-white py-2 px-4 rounded-lg font-semibold transition-colors duration-200 cursor-pointer'
          onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
