import React, { useState } from 'react'
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';

const SignUp = () => {
    const [details, setDetails] = useState({
        fullName: '',
        email: '',
        password: '',
        phoneNo: '',
        confirmPassword: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDetails((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        if (!details.fullName || !details.email || !details.phoneNo || !details.password) {
            setError('Please fill in all fields');
            return;
        }
        if (details.password !== details.confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        setIsLoading(true);
        try {
            console.log('Sign up user with email:', details.email, 'and password:', details.password);
        } catch (error) {
            console.error('Error signing up:', error);
            setError('Failed to sign up');
        } finally {
            setIsLoading(false);
        }
    }
  return (
    <section className='flex min-h-screen items-center justify-center'>
      <div className='relative md:w-1/2 h-[70vh] md:h-auto flex flex-col items-center md:justify-center bg-white p-4 md:p-8'>
        <h1 className='text-2xl font-semibold mb-4'>Sign Up</h1>
        {isLoading && <Loading />}
        {error && <ErrorMessage message={error} />}
        <div className='mb-4'>
          <p className='text-gray-500'>
            Fill in the form below to create an account.
          </p>
        </div>
        <form action='' onSubmit={handleSubmit} className='w-full'>
          <div className='mb-4'>
            <label
              htmlFor='fullName'
              className='block text-sm font-medium text-gray-700'>
              Full Name
            </label>
            <input
              type='text'
              name='fullName'
              id='fullName'
              value={details.fullName}
              onChange={handleChange}
              className='mt-1 p-2 border border-gray-300 rounded w-full'
            />
          </div>
          <div className='mb-4'>
            <label
              htmlFor='email'
              className='block text-sm font-medium text-gray-700'>
              Email
            </label>
            <input
              type='email'
              name='email'
              id='email'
              value={details.email}
              onChange={handleChange}
              className='mt-1 p-2 border border-gray-300 rounded w-full'
            />
          </div>
          <div className='mb-4'>
            <label
              htmlFor='phoneNo'
              className='block text-sm font-medium text-gray-700'>
              Phone Number
            </label>
            <input
              type='text'
              name='phoneNo'
              id='phoneNo'
              value={details.phoneNo}
              onChange={handleChange}
              className='mt-1 p-2 border border-gray-300 rounded w-full'
            />
          </div>
          <div className='mb-4'>
            <label
              htmlFor='password'
              className='block text-sm font-medium text-gray-700'>
              Password
            </label>
            <input
              type='password'
              name='password'
              value={details.password}
              onChange={handleChange}
              id='password'
              className='mt-1 p-2 border border-gray-300 rounded w-full'
            />
          </div>
          <div className='mb-4'>
            <label
              htmlFor='confirmPassword'
              className='block text-sm font-medium text-gray-700'>
              Confirm Password
            </label>
            <input
              type='password'
              name='confirmPassword'
              value={details.confirmPassword}
              onChange={handleChange}
              id='confirmPassword'
              className='mt-1 p-2 border border-gray-300 rounded w-full'
            />
          </div>
          <button
            type='submit'
            className='bg-gray-900 text-white p-2 rounded w-full'>
            Submit
          </button>
        </form>
        <footer className='absolute bottom-0 flex flex-col md:justify-between pt-6 text-center text-sm text-gray-400'>
          <p className='mb-2 text-sm'>
            &copy; {new Date().getFullYear()} Book Store. All rights reserved.
          </p>
          {/* <a
            href='https://wamaendiritu.vercel.app/'
            target='_blank'
            rel='noopener noreferrer'
            className='text-primary ml-2 underline'>
            Contact Developer
          </a> */}
        </footer>
      </div>
    </section>
  );
}

export default SignUp