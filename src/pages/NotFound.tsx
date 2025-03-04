import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

interface NotFoundProps {
  darkMode?: boolean;
}

const NotFound: React.FC<NotFoundProps> = ({ darkMode = false }) => {
  const navigate = useNavigate();

  return (
    <div
      className={`flex flex-col items-center justify-center h-screen px-6 transition-all duration-300 text-center ${
        darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
      }`}
    >
      <motion.h1
        className={`text-8xl md:text-9xl font-bold ${
          darkMode ? 'text-red-400' : 'text-red-500'
        }`}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        404
      </motion.h1>
      <motion.h2
        className='text-2xl md:text-4xl font-semibold mt-4'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
      >
        Oops! Page Not Found
      </motion.h2>
      <motion.p
        className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} mt-2`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.6 }}
      >
        The page you are looking for does not exist.
      </motion.p>
      <motion.button
        className={`mt-6 px-6 py-2 font-bold rounded-lg shadow-lg transition-all ${
          darkMode
            ? 'bg-blue-600 hover:bg-blue-800'
            : 'bg-blue-500 hover:bg-blue-700'
        } text-white`}
        onClick={() => navigate('/')}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.9 }}
      >
        Go Home
      </motion.button>
    </div>
  );
};

export default NotFound;
