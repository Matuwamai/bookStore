import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { handleCartQty, removeItemFromCart, selectCartSubtotal } from '../store/slices/cartSlices';
import { Plus, Minus, Trash2, ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {cartItems} = useSelector(state => state.cart)
  const subtotals = useSelector(selectCartSubtotal);
  return (
    <section className='bg-blue-50 mt-4 px-2 py-4 md:p-4 flex flex-col md:flex-row gap-2 min-h-[85vh]'>
      <div className='bg-white flex-1 shadow-sm rounded-sm'>
        <h5 className='p-3 border-b border-gray-200 text-blue-800'>
          Shopping Cart{" "}
          {cartItems.length > 0 && <span>({cartItems.length})</span>}
        </h5>
        {cartItems.length > 0 ? (
          <div className='px-4'>
            {cartItems.map((item, index) => (
              <div
                className='border-b border-gray-300 p-2 flex space-x-2'
                key={index}>
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className='h-[50px] w-[50px] md:h-[70px] md:w-[70px] object-cover'
                />
                <div className='w-full md:flex-1'>
                  <Link
                    href={`/products/${item?.title
                      .trim()
                      .toLowerCase()
                      .replace(/\s/g, "-")}`}
                    className='text-sm md:text-md text-gray-800 font-medium'>
                    {item.title}
                  </Link>
                  <div className='w-full flex justify-between items-center'>
                    <button
                      className='flex items-center space-x-2 border border-gray-300 rounded-md text-red-400 h-max mt-2 text-primary cursor-pointer hover:shadow-lg hover:text-red-500 py-0.5 px-2'
                      onClick={() => {
                        dispatch(removeItemFromCart(item.id));
                      }}>
                      <Trash2 size={14} className='' />
                      <span className='my-auto'>Remove</span>
                    </button>
                    <div className='flex items-center space-x-4'>
                      <div className='flex items-center space-x-4'>
                        <button
                          className='bg-blue-500 rounded-md p-2 text-white cursor-pointer'
                          onClick={() => {
                            dispatch(
                              handleCartQty({
                                type: "dec",
                                id: item.id,
                              })
                            );
                          }}>
                          <Minus color='white' size={16} />
                        </button>
                        <h6>{item.quantity}</h6>
                        <button
                          className='bg-blue-500 rounded-md p-2 text-white cursor-pointer'
                          onClick={() => {
                            dispatch(
                              handleCartQty({
                                type: "inc",
                                id: item.id,
                                colorId: item.color?.id,
                                sizeId: item.size?.id,
                              })
                            );
                          }}>
                          <Plus className='text-white' size={16} />
                        </button>
                      </div>
                      <p className='text-md font-semibold text-blue-800'>
                        {item.quantity} x KES {item.price.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className='p-4 flex flex-col space-y-2 h-full items-center justify-center'>
            <ShoppingCart size={64} className='text-blue-500' />
            <h5 className='text-blue-800 text-lg'>Your cart is empty</h5>
            <button
              onClick={() => {
                navigate("/shop");
              }}
              className='bg-blue-500 text-white text-sm shadow-md px-4 py-2 mt-2 rounded-md cursor-pointer'>
              Continue shopping
            </button>
          </div>
        )}
      </div>
      <div className='flex-none md:w-64'>
        <div className='bg-white shadow-sm rounded-sm py-2'>
          <h5 className='text-blue-800 uppercase p-2 border-b border-gray-300'>
            Cart Summary
          </h5>
          <div className='p-2 border-b'>
            <div className='flex justify-between items-center'>
              <p className='text-gray-600 text-sm'>Subtotal</p>
              <h4 className='text-gray-700 text-xl'>
                KSh {subtotals.toLocaleString()}
              </h4>
            </div>
          </div>
          <div className='p-2'>
            <button
              className='w-full uppercase bg-blue-500 rounded-md p-2 text-white cursor-pointer'
              onClick={() => {
                navigate("/checkout");
              }}
              disabled={cartItems.length === 0}>
              Checkout (KES {subtotals.toLocaleString()})
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
