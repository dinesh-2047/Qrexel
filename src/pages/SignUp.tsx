import React, { useState } from 'react';
import { ThemeContext, ThemeContextType } from '../contexts/Themeprovider';

function SignUp() {
  const {
    theme,
  }: {
    theme: string;
    toggleTheme: () => void;
  } = React.useContext<ThemeContextType>(ThemeContext);

  const [isSignedIn, setIsSignedIn] = useState(false);
  const toggleSignIn = () => {
    setIsSignedIn(!isSignedIn);
  };

  return (
    <>
      <div
        className={`h-screen w-full flex flex-col justify-start items-center gap-4 rounded-md ${
          theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-black'
        }`}
      >
        {isSignedIn ? (
          <form
            className={`flex flex-col mt-20 space-y-3 border shadow-lg px-16 py-9 rounded-md hover:bg-slate-200 ${
              theme === 'dark' ? 'bg-gray-700 hover:bg-slate-600' : ''
            }`}
          >
            <h1 className='text-center text-3xl mb-4'>Sign Up</h1>
            <input
              className='text-lg p-2 w-sm'
              type='text'
              placeholder='Name'
            />
            <input className='text-lg p-2' type='email' placeholder='Email' />
            <input
              className='text-lg p-2'
              type='password'
              placeholder='Password'
            />
            <input
              className='text-lg p-2'
              type='password'
              placeholder='Confirm Password'
            />
            <button className='text-xl bg-pink-500 rounded-sm py-2'>
              Sign Up
            </button>
            <button onClick={toggleSignIn}>
              Already I have an account{' '}
              <span className='underline text-blue-800'>Login</span>
            </button>
          </form>
        ) : (
          <form
            className={`flex flex-col mt-20 space-y-3 border shadow-lg p-9 rounded hover:bg-slate-200 ${
              theme === 'dark' ? 'bg-gray-700 hover:bg-slate-600' : ''
            }`}
          >
            <h1 className='text-center text-3xl mb-4'>Login</h1>
            <input className='text-lg p-2' type='email' placeholder='Email' />
            <input
              className='text-lg p-2'
              type='password'
              placeholder='Password'
            />
            <button className='text-xl bg-pink-500 rounded-sm py-2'>
              Login
            </button>
            <button onClick={toggleSignIn}>
              Don't have an account{' '}
              <span className='underline text-blue-800'>Sign Up</span>
            </button>
          </form>
        )}
      </div>
    </>
  );
}

export default SignUp;
