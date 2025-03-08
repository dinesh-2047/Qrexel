import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Scanner from './pages/Scanner';
import Report from './pages/Report';
import QrCodes from './components/ui/QrCodes .tsx';
import Loader from './pages/Loader';
import Footer from './components/Footer';
import NotFound from './pages/NotFound';
import SignUp from './pages/SignUp';

const App: React.FC = () => {
  const [showImg, setShowImg] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowImg(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <React.Fragment>
      {showImg ? (
        <Loader />
      ) : (
        <BrowserRouter>
          <Navbar />
          <div className='min-h-screen'>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/scanner' element={<Scanner />} />
              <Route path='/report' element={<Report />} />
              <Route path='/qrcode' element={<QrCodes />} />
              <Route path='*' element={<NotFound />} />
              <Route path='/signup' element={<SignUp />} />
            </Routes>
            <Toaster position='bottom-right' />
          </div>
          <Footer />
        </BrowserRouter>
      )}
    </React.Fragment>
  );
};

export default App;
