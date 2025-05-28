import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { handleCartQty, removeItemFromCart, selectCartSubtotal, resetCart} from '../store/slices/cartSlices';
import { Plus, Minus, Trash2, ShoppingCart, MapPin, Phone, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { BASE_URL } from '../base_url';

export default function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector(state => state.cart);
 const { userInfo } = useSelector(state => state.user);
  const subtotals = useSelector(selectCartSubtotal);
  console.log('Full user state:', useSelector(state => state.user));
console.log('User info from state:', userInfo);
console.log('User ID:', userInfo?.user?.id);

  const [deliveryInfo, setDeliveryInfo] = useState({
    location: '',
    contact: '',
    notes: ''
  });
  const [isCreatingOrder, setIsCreatingOrder] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDeliveryInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

const handleCreateOrder = async () => {
  if (!userInfo) {
    toast.error('Please login to place an order');
    navigate('/login', { state: { from: '/cart' } });
    return;
  }

  if (!deliveryInfo.location || !deliveryInfo.contact) {
    toast.error('Please provide delivery location and contact information');
    return;
  }

  try {
    setIsCreatingOrder(true);
    
    const orderData = {
      userId: userInfo?.user?.id,  
      items: cartItems.map(item => ({
        bookId: item.id,
        quantity: item.quantity
      })),
      deliveryLocation: deliveryInfo.location,
      deliveryContact: deliveryInfo.contact,
      deliveryNotes: deliveryInfo.notes || null
    };

    console.log('Order data being sent:', orderData); // Debug log

    const response = await axios.post(`${BASE_URL}/orders`, orderData);
    
    toast.success('Order placed successfully!');
    dispatch(clearCart());
    navigate('/orders');
  } catch (error) {
    console.error('Order creation failed:', error);
    toast.error(error.response?.data?.message || 'Failed to create order');
  } finally {
    setIsCreatingOrder(false);
  }
};

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
                    to={`/products/${item?.title
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

            {/* Delivery Information Section */}
            <div className='mt-6 p-4 border-t border-gray-200'>
              <h5 className='text-blue-800 font-medium mb-4 flex items-center'>
                <MapPin className='mr-2' size={18} />
                Delivery Information
              </h5>
              
              {!userInfo ? (
                <div className='bg-yellow-50 p-3 rounded-md border border-yellow-200'>
                  <p className='text-yellow-800'>
                    Please <button onClick={() => navigate('/login', { state: { from: '/cart' } })} className='text-blue-600 underline'>login</button> to place an order
                  </p>
                </div>
              ) : (
                <>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div className='relative'>
                      <label className='block text-sm text-gray-600 mb-1'>Delivery Location*</label>
                      <div className='relative'>
                        <MapPin className='absolute left-3 top-3 text-gray-400' size={16} />
                        <input
                          type='text'
                          name='location'
                          value={deliveryInfo.location}
                          onChange={handleInputChange}
                          placeholder='Enter your delivery address'
                          className='pl-10 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                          required
                        />
                      </div>
                    </div>
                    
                    <div className='relative'>
                      <label className='block text-sm text-gray-600 mb-1'>Contact Phone*</label>
                      <div className='relative'>
                        <Phone className='absolute left-3 top-3 text-gray-400' size={16} />
                        <input
                          type='text'
                          name='contact'
                          value={deliveryInfo.contact}
                          onChange={handleInputChange}
                          placeholder='Your phone number'
                          className='pl-10 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                          required
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className='mt-4'>
                    <label className='block text-sm text-gray-600 mb-1'>Additional Notes</label>
                    <textarea
                      name='notes'
                      value={deliveryInfo.notes}
                      onChange={handleInputChange}
                      placeholder='Any special instructions for delivery'
                      className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                      rows={3}
                    />
                  </div>
                </>
              )}
            </div>
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
              className={`w-full uppercase rounded-md p-2 text-white cursor-pointer ${cartItems.length === 0 || !userInfo || !deliveryInfo.location || !deliveryInfo.contact ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'}`}
              onClick={handleCreateOrder}
              disabled={cartItems.length === 0 || !userInfo || isCreatingOrder || !deliveryInfo.location || !deliveryInfo.contact}>
              {isCreatingOrder ? 'Processing...' : `Place Order (KES ${subtotals.toLocaleString()})`}
            </button>
          </div>
        </div>
        
        {userInfo && (
          <div className='bg-white shadow-sm rounded-sm py-2 mt-4'>
            <h5 className='text-blue-800 uppercase p-2 border-b border-gray-300 flex items-center'>
              <User className='mr-2' size={18} />
              Customer Info
            </h5>
            <div className='p-3'>
              <p className='text-gray-700'>{userInfo.name}</p>
              <p className='text-gray-600 text-sm'>{userInfo.email}</p>
              {userInfo.phone && <p className='text-gray-600 text-sm mt-1'>{userInfo.phone}</p>}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}