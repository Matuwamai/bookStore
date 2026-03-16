import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createProduct,
  resetProductSuccessAction,
} from "../../store/actions/productActions";
import { fetchCategories } from "../../store/actions/categoryActions";
import { toast } from "react-toastify";
import Loading from "../Loading";
import ErrorMessage from "../ErrorMessage";

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

  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [isWholesale, setIsWholesale] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedClass, setSelectedClass] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    // Limit to 5 images (as per your backend limit)
    if (files.length > 5) {
      toast.error("You can only upload up to 5 images");
      return;
    }

    setImages(files);

    // Create preview URLs
    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const removeImage = (index) => {
    const newImages = [...images];
    const newPreviews = [...imagePreviews];

    // Revoke the object URL to avoid memory leaks
    URL.revokeObjectURL(newPreviews[index]);

    newImages.splice(index, 1);
    newPreviews.splice(index, 1);

    setImages(newImages);
    setImagePreviews(newPreviews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!details.title || !details.price || !details.description) {
      toast.error("Please fill all required fields");
      return;
    }

    if (images.length === 0) {
      toast.error("Please upload at least one image");
      return;
    }

    if (!selectedClass || !selectedSubject) {
      toast.error("Please select class and subject");
      return;
    }

    // Create FormData object
    const formData = new FormData();

    // Append all fields
    formData.append("title", details.title);
    formData.append("price", Number(details.price));
    formData.append("description", details.description);
    formData.append("stock", Number(details.stock) || 0);
    formData.append("author", details.author || "");
    formData.append("wholesale", isWholesale);
    formData.append("classId", selectedClass);
    formData.append("subjectId", selectedSubject);

    // Append images (using "images" as field name to match backend)
    images.forEach((image) => {
      formData.append("images", image);
    });

    // Dispatch action with formData
    dispatch(createProduct(formData));
  };

  useEffect(() => {
    if (success) {
      toast.success("Product added successfully");

      // Reset form
      setDetails({
        title: "",
        price: 0,
        description: "",
        stock: 0,
        author: "",
      });

      // Clear images
      imagePreviews.forEach((preview) => URL.revokeObjectURL(preview));
      setImages([]);
      setImagePreviews([]);

      setSelectedClass("");
      setSelectedSubject("");
      setIsWholesale(false);

      // Reset success state
      dispatch(resetProductSuccessAction());
    }
  }, [success, dispatch, imagePreviews]);

  useEffect(() => {
    dispatch(fetchCategories("class"));
    dispatch(fetchCategories("subject"));

    // Cleanup function to revoke object URLs
    return () => {
      imagePreviews.forEach((preview) => URL.revokeObjectURL(preview));
    };
  }, [dispatch]);

  return (
    <div className="flex justify-center min-h-screen items-center">
      <div className="w-2/3 bg-white p-8 rounded-lg border-2 border-dashed border-gray-300">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold my-auto">Add Product</h1>
          <div className="flex items-center gap-2">
            <input
              id="isWholesale"
              name="isWholesale"
              checked={isWholesale}
              onChange={(e) => setIsWholesale(e.target.checked)}
              type="checkbox"
              className="appearance-none relative inline-block rounded-full w-12 h-6 cursor-pointer before:inline-block before:absolute before:top-0 before:left-0 before:w-full before:h-full before:rounded-full before:bg-stone-200 before:transition-colors before:duration-200 before:ease-in after:absolute after:top-2/4 after:left-0 after:-translate-y-2/4 after:w-6 after:h-6 after:border after:border-stone-200 after:bg-white after:rounded-full checked:after:translate-x-full after:transition-all after:duration-200 after:ease-in disabled:opacity-50 disabled:cursor-not-allowed dark:after:bg-white checked:before:bg-stone-800"
            />
            <label
              htmlFor="isWholesale"
              className="font-sans antialiased text-base cursor-pointer text-stone-600"
            >
              Wholesale
            </label>
          </div>
        </div>

        {error && <ErrorMessage message={error} />}
        {loading && <Loading />}

        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Title *
            </label>
            <input
              type="text"
              name="title"
              value={details.title}
              onChange={handleChange}
              id="title"
              className="mt-1 p-2 border border-gray-300 rounded w-full"
              required
            />
          </div>

          <div className="w-full mb-4 flex space-x-4">
            <div className="w-full">
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700"
              >
                Price *
              </label>
              <input
                type="number"
                name="price"
                value={details.price}
                onChange={handleChange}
                id="price"
                step={0.01}
                min={0}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
                required
              />
            </div>
            <div className="w-full">
              <label
                htmlFor="stock"
                className="block text-sm font-medium text-gray-700"
              >
                Stock Quantity
              </label>
              <input
                type="number"
                name="stock"
                value={details.stock}
                onChange={handleChange}
                id="stock"
                min={0}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              />
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="author"
              className="block text-sm font-medium text-gray-700"
            >
              Author
            </label>
            <input
              type="text"
              name="author"
              value={details.author}
              onChange={handleChange}
              id="author"
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description *
            </label>
            <textarea
              name="description"
              value={details.description}
              onChange={handleChange}
              id="description"
              rows="4"
              className="mt-1 p-2 border border-gray-300 rounded w-full"
              required
            ></textarea>
          </div>

          <div className="mb-4 flex space-x-4">
            <div className="w-full">
              <label
                htmlFor="subject"
                className="block text-sm font-medium text-gray-700"
              >
                Select Subject *
              </label>
              <select
                className="mt-1 p-2 border border-gray-300 rounded w-full"
                id="subject"
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                required
              >
                <option value="">Select Subject</option>
                {subjects.map((subject) => (
                  <option key={subject.id} value={subject.id}>
                    {subject.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-full">
              <label
                htmlFor="class"
                className="block text-sm font-medium text-gray-700"
              >
                Select Class *
              </label>
              <select
                className="mt-1 p-2 border border-gray-300 rounded w-full"
                id="class"
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                required
              >
                <option value="">Select Class</option>
                {classes.map((class_) => (
                  <option key={class_.id} value={class_.id}>
                    {class_.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Image Upload Section */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Images * (Max 5)
            </label>

            <label
              htmlFor="dropzone-file"
              className="mx-auto cursor-pointer flex w-full flex-col items-center rounded-xl border-2 border-dashed border-gray-300 bg-white p-6 text-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-blue-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>

              <h2 className="mt-4 text-xl font-medium text-gray-700 tracking-wide">
                Upload Product Images
              </h2>

              <p className="mt-2 text-gray-500 tracking-wide">
                Upload or drag & drop your files (SVG, PNG, JPG)
              </p>

              <input
                id="dropzone-file"
                type="file"
                className="hidden"
                onChange={handleImageChange}
                multiple
                accept="image/*"
              />
            </label>

            {/* Image Previews */}
            {imagePreviews.length > 0 && (
              <div className="mt-4 grid grid-cols-5 gap-2">
                {imagePreviews.map((preview, index) => (
                  <div key={index} className="relative">
                    <img
                      src={preview}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-20 object-cover rounded border border-gray-300"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}

            {images.length > 0 && (
              <p className="text-center text-gray-500 tracking-wide mt-2">
                {images.length} image(s) selected
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`cursor-pointer bg-gray-900 text-white p-2 rounded w-full ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? <Loading /> : "Add Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
