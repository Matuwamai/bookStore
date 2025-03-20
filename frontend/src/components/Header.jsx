import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {Link} from 'react-router-dom';

const Header = () => {
    const [open, setOpen] = useState(false);
    const { cartItems } = useSelector((state) => state.cart);

    return (
      <nav className='bg-white border-b border-indigo-300 shadow-xs  p-4 lg:px-16'>
        <div className='w-full mx-auto'>
          <div className='mx-2 flex flex-wrap items-center justify-between'>
            <Link to='/' className='flex'>
              <h6 className='self-center text-indigo-500 text-lg font-semibold whitespace-nowrap'>
                Book Store
              </h6>
            </Link>
            <div className='flex md:hidden md:order-2'>
              <button
                onClick={() => setOpen(!open)}
                type='button'
                className='md:hidden text-gray-400 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300 rounded-lg inline-flex items-center justify-center'
                aria-controls='mobile-menu-3'
                aria-expanded={open}>
                <span className='sr-only'>Open main menu</span>
                {open ? (
                  <svg
                    className='w-6 h-6'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                    xmlns='http://www.w3.org/2000/svg'>
                    <path
                      fillRule='evenodd'
                      d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                      clipRule='evenodd'></path>
                  </svg>
                ) : (
                  <svg
                    className='w-6 h-6'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                    xmlns='http://www.w3.org/2000/svg'>
                    <path
                      fillRule='evenodd'
                      d='M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z'
                      clipRule='evenodd'></path>
                  </svg>
                )}
              </button>
            </div>
            <div
              className={`${
                open ? "block" : "hidden"
              } md:flex justify-between items-end w-full md:w-auto md:order-1`}
              id='mobile-menu-3'>
              <ul className='flex-col md:flex-row flex md:space-x-8 mt-4 md:mt-0 md:text-sm md:font-medium'>
                <li>
                  <Link
                    to='/'
                    className='bg-blue-700 md:bg-transparent text-white block pl-3 pr-4 py-2 md:text-blue-700 md:p-0 rounded'
                    aria-current='page'>
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to='/cart'
                    className='text-gray-700 hover:bg-gray-50 border-b border-gray-100 md:hover:bg-transparent md:border-0 block pl-3 pr-4 py-2 md:hover:text-blue-700 md:p-0'>
                    Shopping Cart ({cartItems.length})
                  </Link>
                </li>
                <li>
                  <Link
                    to='/sign-in'
                    className='text-gray-700 hover:bg-gray-50 border-b border-gray-100 md:hover:bg-transparent md:border-0 block pl-3 pr-4 py-2 md:hover:text-blue-700 md:p-0'>
                    Sign In
                  </Link>
                </li>
                <li>
                  <Link
                    to='/sign-up'
                    className='text-gray-700 hover:bg-gray-50 border-b border-gray-100 md:hover:bg-transparent md:border-0 block pl-3 pr-4 py-2 md:hover:text-blue-700 md:p-0'>
                    Sign Up
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    );
};

export default Header;