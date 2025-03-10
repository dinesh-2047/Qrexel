import React, { useState, useEffect } from 'react';
import { ThemeContext, ThemeContextType } from '../contexts/Themeprovider';

export default function Hero({
  handleShowHero,
}: {
  handleShowHero: () => void;
}) {
  const { theme } = React.useContext<ThemeContextType>(ThemeContext);

  const fullTitle = 'Welcome to Qrexel 🚀';
  const [titleText, setTitleText] = useState('');
  const [titleIndex, setTitleIndex] = useState(0);

  const fullSubtitle =
    'Build modern, fast, and beautiful QR codes with ease. For professionals, students, and hobbyists.';
  const [subtitleText, setSubtitleText] = useState('');
  const [subtitleIndex, setSubtitleIndex] = useState(0);

  React.useEffect(() => {
    setTitleIndex(0);
    setSubtitleIndex(0);
    setTitleText('');
    setSubtitleText('');
  }, []);

  useEffect(() => {
    if (titleIndex < fullTitle.length) {
      const timeout = setTimeout(() => {
        setTitleText(fullTitle.slice(0, titleIndex + 1));
        setTitleIndex(titleIndex + 1);
      }, 100);
      return () => clearTimeout(timeout);
    } else if (subtitleIndex < fullSubtitle.length) {
      const timeout = setTimeout(() => {
        setSubtitleText(fullSubtitle.slice(0, subtitleIndex + 1));
        setSubtitleIndex(subtitleIndex + 1);
      }, 50);
      return () => clearTimeout(timeout);
    } else {
      setTimeout(() => {
        handleShowHero();
      }, 3000);
    }
  }, [titleIndex, subtitleIndex]);

  return (
    <section
      className={`relative flex flex-col items-center justify-center text-center ${
        theme === 'dark'
          ? 'bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e]'
          : 'bg-gradient-to-r from-blue-500 to-purple-600'
      } text-white py-20 px-6 h-screen`}
    >
      <h1 className='text-4xl md:text-6xl font-bold mb-4'>
        {titleText}
        <span className='animate-blink'>|</span>
      </h1>

      <p className='text-lg md:text-xl mb-6 max-w-4xl'>
        {subtitleText}
        <span className='animate-blink'>|</span>
      </p>

      <button
        className='bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-gray-100 transition animate-bounce'
        onClick={handleShowHero}
      >
        Get Started
      </button>
    </section>
  );
}
