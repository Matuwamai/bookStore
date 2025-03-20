import React, { useEffect, useState } from "react";
import { uploadImage } from "../../firebase";
import Loading from "../Loading";
import ErrorMessage from "../ErrorMessage";
import { useDispatch, useSelector } from "react-redux";
import { createProduct } from "../../store/actions/productActions";
import { fetchCategories } from "../../store/actions/categoryActions";
import { toast } from "react-toastify";

const ProductForm = () => {
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((state) => state.product);
  const { classes, subjects } = useSelector((state) => state.category);
  const [details, setDetails] = useState({
    title: "",
    price: 0,
    description: "",
    stock: 0,
    author: "",
  });
  const [uploading, setUploading] = useState(false);

  const [image, setImage] = useState(null);

  const [isWholesale, setIsWholesale] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [progress, setProgress] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!details.title || !details.price || !details.description) {
      toast.error("Please fill all fields");
      return;
    }
    if (!image) {
      toast.error("Please upload an image");
      return;
    }

    if (!selectedClass || !selectedSubject) {
      toast.error("Please select class and subject");
      return;
    }
    
    try {
      setUploading(true);
      const res = await uploadImage(image, "products", setProgress);
      setUploading(false);
      console.log(progress);
      const data = {
        ...details,
        price: Number(details.price),
        stock: Number(details.stock),
        imageUrl: res,
        wholesale: isWholesale,
        classId: selectedClass,
        subjectId: selectedSubject,
      };
      dispatch(createProduct(data));
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Error uploading image");
    }
  };

  useEffect(() => {
    if (success) {
      toast.success("Product added successfully");
      setDetails({
        title: "",
        price: 0,
        description: "",
        stock: 0,
        author: "",
      });
      setImage(null);
      setSelectedClass("");
      setSelectedSubject("");
    }
  }, [success]);

  useEffect(() => {
    dispatch(fetchCategories("class"));
    dispatch(fetchCategories("subject"));
  }, [dispatch]);

  return (
    <div className='flex justify-center min-h-screen items-center'>
      <div className='w-2/3 bg-white p-8 rounded-lg border-2 border-dashed border-gray-300'>
        <div className='flex justify-between items-center mb-4'>
          <h1 className='text-2xl font-bold my-auto'>Add Product</h1>
          <div class='flex items-center gap-2'>
            <input
              id='isWholesale'
              name='isWholesale'
              value={isWholesale}
              onChange={(e) => setIsWholesale(e.target.checked)}
              type='checkbox'
              className='appearance-none relative inline-block rounded-full w-12 h-6 cursor-pointer before:inline-block before:absolute before:top-0 before:left-0 before:w-full before:h-full before:rounded-full before:bg-stone-200 before:transition-colors before:duration-200 before:ease-in after:absolute after:top-2/4 after:left-0 after:-translate-y-2/4 after:w-6 after:h-6 after:border after:border-stone-200 after:bg-white after:rounded-full checked:after:translate-x-full after:transition-all after:duration-200 after:ease-in disabled:opacity-50 disabled:cursor-not-allowed dark:after:bg-white checked:before:bg-stone-800 '
            />
            <label
              htmlFor='isWholesale'
              className='font-sans antialiased text-base cursor-pointer text-stone-600'>
              Wholesale
            </label>
          </div>
        </div>
        {error && <ErrorMessage message={error} />}
        {uploading || (loading && <Loading />)}
        <form action='' onSubmit={handleSubmit}>
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
          <div className='w-full mb-4 flex space-x-4'>
            <div className='w-full'>
              <label
                htmlFor='price'
                className='block text-sm font-medium text-gray-700'>
                Price
              </label>
              <input
                type='number'
                name='price'
                value={details.price}
                onChange={handleChange}
                id='price'
                className='mt-1 p-2 border border-gray-300 rounded w-full'
              />
            </div>
            <div className='w-full'>
              <label
                htmlFor='stock'
                className='block text-sm font-medium text-gray-700'>
                Stock Quantity
              </label>
              <input
                type='text'
                name='stock'
                value={details.stock}
                onChange={handleChange}
                id='stock'
                className='mt-1 p-2 border border-gray-300 rounded w-full'
              />
            </div>
          </div>
          <div className='mb-4'>
            <label
              htmlFor='author'
              className='block text-sm font-medium text-gray-700'>
              Author
            </label>
            <input
              type='text'
              name='author'
              value={details.author}
              onChange={handleChange}
              id='author'
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
          <div className='mb-4 flex space-x-4'>
            <div className='w-full'>
              <label
                htmlFor='subject'
                className='block text-sm font-medium text-gray-700'>
                Select Subject
              </label>
              <select
                className='mt-1 p-2 border border-gray-300 rounded w-full'
                id='subject'
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}>
                <option value=''>Select Subject</option>
                {subjects.map((subject) => (
                  <option key={subject.id} value={subject.id}>
                    {subject.name}
                  </option>
                ))}
              </select>
            </div>
            <div className='w-full'>
              <label
                htmlFor='class'
                className='block text-sm font-medium text-gray-700'>
                Select Class
              </label>
              <select
                className='mt-1 p-2 border border-gray-300 rounded w-full'
                id='class'
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}>
                <option value=''>Select Class</option>
                {classes.map((class_) => (
                  <option key={class_.id} value={class_.id}>
                    {class_.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <label
            htmlFor='dropzone-file'
            className='mx-auto cursor-pointer flex w-full flex-col items-center rounded-xl border-2 border-dashed border-gray-300 bg-white p-6 text-center mb-4'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-10 w-10 text-blue-500'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              stroke-width='2'>
              <path
                stroke-linecap='round'
                stroke-linejoin='round'
                d='M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12'
              />
            </svg>

            <h2 className='mt-4 text-xl font-medium text-gray-700 tracking-wide'>
              Product Image
            </h2>

            <p className='mt-2 text-gray-500 tracking-wide'>
              Upload or darg & drop your file SVG, PNG or JPG.{" "}
            </p>

            <input
              id='dropzone-file'
              type='file'
              class='hidden'
              onChange={(e) => setImage(e.target.files[0])}
            />
          </label>
          {image && (
            <p className='text-center text-gray-500 tracking-wide mb-4'>
              {image.name} - {image.size / 1000} KB
            </p>
          )}
          <button
            type='submit'
            disabled={uploading || loading}
            className={`cursor-pointer bg-gray-900 text-white p-2 rounded w-full ${
              uploading || loading ? "opacity-50 cursor-not-allowed" : ""
            }`}>
            {uploading || loading ? <Loading /> : "Add Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
