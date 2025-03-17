import React, { useEffect, useState } from "react";
import ErrorMessage from "./ErrorMessage";
import Loading from "./Loading";
import { useSelector } from "react-redux";

const CategoryForm = ({ title, submitForm }) => {
  const {
    loading,
    error: APIError,
    success,
  } = useSelector((state) => state.category);
  const [details, setDetails] = useState({
    name: "",
    description: "",
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    if (!details.name || !details.description) {
      setError("Please fill in all fields");
      return;
    }
    submitForm(details);
  };

  useEffect(() => {
    if (success || APIError) {
      setDetails({
        name: "",
        description: "",
      });
    }
  }, [success, APIError]);

  return (
    <div className='flex flex-col'>
      <h6 className='text-xl font-semibold my-auto'>{title}</h6>
      <form action='' onSubmit={handleSubmit}>
        {(error || APIError) && <ErrorMessage message={error || APIError} />}
        {loading && <Loading />}
        <div className='mb-4'>
          <label
            htmlFor='name'
            className='block text-sm font-medium text-gray-700'>
            Title
          </label>
          <input
            type='text'
            name='name'
            value={details.name}
            onChange={handleChange}
            id='name'
            className='mt-1 p-2 border border-gray-300 rounded w-full'
          />
        </div>
        <div className='mb-4'>
          <label
            htmlFor='description'
            className='block text-sm font-medium text-gray-700'>
            Description
          </label>
          <textarea
            name='description'
            value={details.description}
            onChange={handleChange}
            id='description'
            className='mt-1 p-2 border border-gray-300 rounded w-full'></textarea>
        </div>
        <button
          type='submit'
          className='bg-gray-900 text-white p-2 rounded w-full'>
          Save
        </button>
      </form>
    </div>
  );
};

export default CategoryForm;
