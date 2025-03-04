import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Scanner from './pages/Scanner';
import Report from './pages/Report';
import QrCodes from './components/ui/QrCodes ';
import Loader from './pages/Loader';
import Footer from './components/Footer';
import NotFound from './pages/NotFound';

function App() {
  const [darkMode, setDarkMode] = React.useState(false);
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const [showimg, setShowimg] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setShowimg(false);
    }, 3000);
  }, []);

  React.useEffect(() => {
    console.log('APP::: Navbar re-rendered due to darkMode change:', darkMode);
  }, [darkMode]);

  return (
    <React.Fragment>
      {showimg ? (
        <Loader />
      ) : (
        <BrowserRouter>
          <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
          <Routes>
            <Route path='/' element={<Home darkMode={darkMode} />} />
            <Route path='/scanner' element={<Scanner />} />
            <Route path='/report' element={<Report />} />
            <Route path='/qrcode' element={<QrCodes />} />
            <Route path='*' element={<NotFound darkMode={darkMode} />} />
          </Routes>
          <Toaster position='bottom-right' />
          <Footer />
        </BrowserRouter>
      )}
    </React.Fragment>
  );
}

export default App;
