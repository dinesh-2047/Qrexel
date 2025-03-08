import React from 'react';
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaGithub,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const BrandName = 'Qrexel';

  return (
    <footer className='bg-gray-900 text-white py-10 px-6 md:px-20 w-full'>
      <div className='max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left'>
        {/* Brand and Description */}
        <div>
          <h2 className='text-2xl font-bold'>{BrandName}</h2>
          <p className='text-gray-400 mt-2'>
            Creating amazing QR codes for using in the modern World.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className='text-xl font-semibold'>Quick Links</h3>
          <ul className='mt-2 space-y-2'>
            <li>
              <Link to='/' className='text-gray-400 hover:text-white'>
                Home
              </Link>
            </li>
            <li>
              <Link to='/qrcode' className='text-gray-400 hover:text-white'>
                About
              </Link>
            </li>
            <li>
              <a href='#' className='text-gray-400 hover:text-white'>
                Services
              </a>
            </li>
            <li>
              <a href='#' className='text-gray-400 hover:text-white'>
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Social Media Links */}
        <div>
          <h3 className='text-xl font-semibold'>Follow Us</h3>
          <div className='flex justify-center md:justify-start mt-2 space-x-4'>
            <a
              href='#'
              className='text-gray-400 hover:text-white text-2xl'
              target='_blank'
              rel='noopener noreferrer'
            >
              <FaFacebook />
            </a>
            <a
              href='#'
              className='text-gray-400 hover:text-white text-2xl'
              target='_blank'
              rel='noopener noreferrer'
            >
              <FaTwitter />
            </a>
            <a
              href='#'
              className='text-gray-400 hover:text-white text-2xl'
              target='_blank'
              rel='noopener noreferrer'
            >
              <FaInstagram />
            </a>
            <a
              href='#'
              className='text-gray-400 hover:text-white text-2xl'
              target='_blank'
              rel='noopener noreferrer'
            >
              <FaLinkedin />
            </a>
            <a
              href='https://github.com/dinesh-2047/Qrexel'
              className='text-gray-400 hover:text-white text-2xl'
              target='_blank'
              rel='noopener noreferrer'
            >
              <FaGithub />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright Text */}
      <div className='mt-8 text-center text-gray-500'>
        <p>
          &copy; {new Date().getFullYear()} {BrandName}. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
