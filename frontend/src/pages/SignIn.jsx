import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/actions/userActions";
import { useNavigate } from "react-router";

export default function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error: APIError, userInfo } = useSelector((state) => state.user);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            setError("Please fill in all fields");
            return;
        }
       dispatch(login({ email, password }))
    }

    useEffect(() => {
        if (userInfo) {
            navigate("/dashboard");
        }
    }, [userInfo, navigate]);


  return (
    <div className='flex flex-col md:flex-row min-h-screen'>
      {/* Left Side: Image Background and Welcome Message */}
      <div
        className='md:w-1/2 h-[30vh] md:h-auto bg-cover bg-center'
        style={{
          backgroundImage: "url('/book-seller.jpeg')",
          backgroundPositionX: "50%",
          backgroundSize: "contain",
          backgroundRepeat: "repeat-y",
        }}>
        <div className='relative flex h-full items-center justify-center bg-black bg-opacity-60'>
          <div className='text-white text-center px-6'>
            <h1 className='text-3xl font-semibold'>
              Welcome to Book Store Admin Dashboard
            </h1>
            <p className='text-lg mt-2 mb-4 md:mb-0'>
              Sign in to manage your store.
            </p>
          </div>
        </div>
      </div>

      {/* Right Side: Sign-In Form */}
      <div className='relative md:w-1/2 h-[70vh] md:h-auto flex flex-col items-center md:justify-center bg-white p-4 md:p-8'>
        <h1 className='text-2xl font-semibold mb-4'>Sign In</h1>
        {loading && <Loading />}
        {(error || APIError ) && (<ErrorMessage message={error || APIError} />)}
        <div className='mb-4'>
          <p className='text-gray-500'>
            Sign in to your account to manage your store
          </p>
        </div>
        <form action='' onSubmit={handleSubmit} className='w-full'>
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              id='password'
              className='mt-1 p-2 border border-gray-300 rounded w-full'
            />
          </div>
          <button
            type='submit'
            className='bg-gray-900 text-white p-2 rounded w-full'>
            Submit
          </button>
        </form>
        <footer className='absolute bottom-2 md:bottom-10 flex flex-col md:justify-between pt-6 text-center text-sm text-gray-400'>
          <p className='mb-2 text-sm'>
            &copy; {new Date().getFullYear()} Book Store. All
            rights reserved.
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
    </div>
  );
}
