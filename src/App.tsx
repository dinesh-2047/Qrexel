import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Scanner from "./pages/Scanner";
import Report from "./pages/Report";
import QrCodes  from "./components/ui/QrCodes ";
import Loader from "./pages/Loader";

function App() {
  const [showimg ,setShowimg] = useState(true)
      useEffect(()=>{
          setTimeout(() => {
              setShowimg(false);
          }, 3000);
      },[])

  return (
    <div>
      {
        showimg?
        <Loader/>:
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 relative transition-all duration-300">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/scanner" element={<Scanner />} />
            <Route path="/report" element={<Report />} />
            <Route path="/qrcode" element={<QrCodes />} />
          </Routes>
        </main>
        <Toaster position="bottom-right" />
      </div>
    </BrowserRouter>
        }
    </div>
    
  );
}

export default App;
