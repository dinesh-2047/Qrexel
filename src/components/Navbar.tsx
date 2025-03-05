import React from 'react';
import { Link } from 'react-router-dom';
import { Scan } from 'lucide-react';
import { FiAlertCircle } from 'react-icons/fi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import webLogo from '../utils/favicon.svg';
import { FiMenu, FiX } from 'react-icons/fi';

export default function Navbar({
  darkMode,
  toggleDarkMode,
}: {
  darkMode: boolean;
  toggleDarkMode: () => void;
}) {
  const [isSignedIn, setIsSignedIn] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const toggleSignIn = () => {
    setIsSignedIn(!isSignedIn);
  };

  return (
    <React.Fragment>
      <header
        className={`flex items-center justify-between p-4 ${
          darkMode ? 'bg-[#2d3a47]' : 'bg-[#ff5a92]'
        }`}
      >
        <div className='flex items-center space-x-2'>
          <Link to='/' className='flex items-center space-x-2'>
            <img alt='Logo' className='h-8' src={webLogo} />
            <span className='text-xl font-bold'>Qrexel</span>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className='lg:hidden text-white text-2xl'
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FiX /> : <FiMenu />}
        </button>

        {/* Desktop Navigation */}
        <nav className='hidden lg:flex space-x-4 text-sm'>
          <Link to='/' className='text-white hover:text-gray-300'>
            Home
          </Link>
          <a className='text-white hover:text-gray-300' href='#'>
            Generate
          </a>
          <a className='text-white hover:text-gray-300' href='#'>
            Scan
          </a>
          <Link to='/qrcode' className='text-white hover:text-gray-300'>
            About QR Codes
          </Link>
          <a className='text-white hover:text-gray-300' href='#'>
            Community
          </a>
          <Link
            to='/scanner'
            className='flex items-center space-x-1 text-white hover:text-gray-300'
          >
            <Scan className='w-5 h-5' />
            <span>Scanner</span>
          </Link>
        </nav>

        {/* Actions */}
        <div className='hidden lg:flex items-center space-x-3'>
          <button type='button' className='text-white' onClick={toggleDarkMode}>
            <FontAwesomeIcon icon={darkMode ? faSun : faMoon} />
          </button>
          <Link to='/report' className='relative group flex items-center'>
            <span className='absolute bottom-[-30px] right-0 whitespace-nowrap rounded-md bg-red-600 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100'>
              Report Issue
            </span>
            <FiAlertCircle
              size={32}
              className='text-red-600 cursor-pointer transition-transform transform hover:scale-110'
            />
          </Link>
          <Link to='/signup'>
          <button
            type='button'
            className='text-white bg-[#00d084] px-4 py-1 rounded'
            onClick={toggleSignIn}
          >
            {isSignedIn ? 'Sign Out' : 'Sign In / Sign Up'}
          </button>
          </Link>
        </div>
      </header>

      {/* Mobile Menu */}
      {isOpen && (
        <nav className='lg:hidden flex flex-col items-center bg-[#ff5a92] dark:bg-[#2d3a47] py-4 space-y-4'>
          <Link
            to='/'
            className='text-white hover:text-gray-300'
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <a
            className='text-white hover:text-gray-300'
            href='#'
            onClick={() => setIsOpen(false)}
          >
            Generate
          </a>
          <a
            className='text-white hover:text-gray-300'
            href='#'
            onClick={() => setIsOpen(false)}
          >
            Scan
          </a>
          <Link
            to='/qrcode'
            className='text-white hover:text-gray-300'
            onClick={() => setIsOpen(false)}
          >
            About QR Codes
          </Link>
          <a
            className='text-white hover:text-gray-300'
            href='#'
            onClick={() => setIsOpen(false)}
          >
            Community
          </a>
          <Link
            to='/scanner'
            className='flex items-center space-x-1 text-white hover:text-gray-300'
            onClick={() => setIsOpen(false)}
          >
            <Scan className='w-5 h-5' />
            <span>Scanner</span>
          </Link>
          <button type='button' className='text-white' onClick={toggleDarkMode}>
            <FontAwesomeIcon icon={darkMode ? faSun : faMoon} />
          </button>
          <button
            type='button'
            className='text-white bg-[#00d084] px-4 py-1 rounded'
            onClick={toggleSignIn}
          >
            {isSignedIn ? 'Sign Out' : 'Sign In / Sign Up'}
          </button>
        </nav>
      )}
    </React.Fragment>
  );
}
