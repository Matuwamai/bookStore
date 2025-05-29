import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../store/actions/userActions';

const Header = () => {
  const [open, setOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const logoutHandler = () => {
    dispatch(logout());
    navigate('/sign-in');
  };

  return (
    <nav className='bg-white border-b border-indigo-300 shadow-xs p-4 lg:px-16'>
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
            className={`${open ? "block" : "hidden"
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

              {userInfo ? (
                // Logged in user menu
                <>
                  <li>
                    <Link
                      to='/my-orders'
                      className='text-gray-700 hover:bg-gray-50 border-b border-gray-100 md:hover:bg-transparent md:border-0 block pl-3 pr-4 py-2 md:hover:text-blue-700 md:p-0'>
                      My Orders
                    </Link>
                  </li>
                  <li className='relative' ref={dropdownRef}>
                    <div className='flex items-center'>
                      <span className='text-gray-700 px-3 py-2 hidden md:block'>
                        Hello, {userInfo.name}
                      </span>
                      <button
                        onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                        className='flex items-center text-gray-700 hover:bg-gray-50 border-b border-gray-100 md:hover:bg-transparent md:border-0 pl-3 pr-4 py-2 md:hover:text-blue-700 md:p-0 focus:outline-none'>
                        <svg
                          className='w-5 h-5'
                          fill='none'
                          stroke='currentColor'
                          viewBox='0 0 24 24'
                          xmlns='http://www.w3.org/2000/svg'>
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='2'
                            d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'></path>
                        </svg>
                        <span className='md:hidden ml-2'>Profile</span>
                      </button>
                    </div>
                    
                    {/* Dropdown menu */}
                    {profileDropdownOpen && (
                      <div className='absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50'>
                        <Link
                          to='/profile'
                          className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                          onClick={() => setProfileDropdownOpen(false)}>
                          My Profile
                        </Link>
                        
                        <button
                          onClick={logoutHandler}
                          className='block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'>
                          Sign out
                        </button>
                      </div>
                    )}
                  </li>
                </>
              ) : (
                <>
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
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;