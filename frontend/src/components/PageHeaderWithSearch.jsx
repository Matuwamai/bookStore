import React from 'react'

const PageHeaderWithSearch = ({title, subtitle, search=false}) => {
  return (
    <div className='w-full flex flex-col md:flex-row md:justify-between md:items-center mb-3 my-3 space-y-2 md:space-y-0'>
      <div>
        <h2 className='text-lg font-semibold text-gray-900'>
          {title}
        </h2>
        <p className='text-slate-500'>
          {subtitle}
        </p>
      </div>
      {search && (
        <div className='flex space-x-4 items-center md:w-1/2'>
          <form className='relative w-full'>
            <input
              className='bg-white w-full md:pr-11 h-10 pl-3 py-2 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded transition duration-200 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md'
              placeholder='search'
              name='search'
            />
            <button
              className='absolute h-8 w-8 right-1 top-1 my-auto px-2 flex items-center bg-white rounded '
              type='submit'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke-width='3'
                stroke='currentColor'
                className='w-8 h-8 text-slate-600'>
                <path
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  d='m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z'
                />
              </svg>
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default PageHeaderWithSearch