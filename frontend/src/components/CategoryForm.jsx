import React, { useState } from "react";
import ErrorMessage from "./ErrorMessage";
import Loading from "./Loading";

const CategoryForm = ({ title, submitForm }) => {
  const [details, setDetails] = useState({
    title: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
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
    if (!details.title || !details.description) {
      setError("Please fill in all fields");
      return;
    }
    setLoading(true);
    try {
      submitForm(details);
    } catch (error) {
      console.error("Error creating category:", error);
      setError("Failed to create category");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className='flex flex-col'>
      <h6 className='text-xl font-semibold my-auto'>{title}</h6>
      <form action='' onSubmit={handleSubmit}>
        {error && <ErrorMessage message={error} />}
        {loading && <Loading />}
        <div className='mb-4'>
          <label
            htmlFor='title'
            className='block text-sm font-medium text-gray-700'>
            Title
          </label>
          <input
            type='text'
            name='title'
            value={details.title}
            onChange={handleChange}
            id='title'
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
