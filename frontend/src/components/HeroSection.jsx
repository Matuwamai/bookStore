import React from "react";
import backToSchools from "../assets/back-to-school.jpeg";

const HeroSection = () => {
  return (
    <div className='relative bg-blue-50'>
      <div className='container m-auto px-6  md:px-12 lg:pt-[4.8rem] lg:px-7'>
        <div className='flex items-center flex-wrap px-2 md:px-0'>
          <div className='relative lg:w-6/12 lg:py-24 xl:py-32'>
            <h1 className='font-bold text-4xl text-blue-900 md:text-5xl lg:w-10/12'>
              Empower Your Learning Journey
            </h1>
            <form action='' className='w-full mt-12'>
              <div className='relative flex p-1 rounded-full bg-white border border-blue-200 shadow-md md:p-2'>
                <input
                  placeholder='Search for books, authors, or topics'
                  className='w-full p-4 rounded-full'
                  type='text'
                />
                <button
                  type='button'
                  title='Search books'
                  className='ml-auto py-3 px-6 rounded-full text-center transition bg-gradient-to-b from-blue-200 to-blue-300 hover:to-blue-300 active:from-blue-400 focus:from-blue-400 md:px-12'>
                  <span className='hidden text-blue-900 font-semibold md:block'>
                    Search
                  </span>
                </button>
              </div>
            </form>
            <p className='mt-8 text-gray-700 lg:w-10/12'>
              Unlock the knowledge you need to succeed.{" "}
              <a href='#shop' className='text-blue-700'>
                Shop Now
              </a>{" "}
              and discover books that inspire and educate.
            </p>
          </div>
          <div className=''>
            <img
              src={backToSchools}
              className='ml-20 relative h-[400px] w-full object-cover rounded-lg shadow-lg lg:h-[500px]'
              alt='book illustration'
              loading='lazy'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
