import React, { useRef, useEffect, useState } from 'react';
import React, { useRef, useEffect, useState} from 'react'
import QRCodeStyling from 'qr-code-styling'
import { useStore } from '../store/useStore';
import toast from 'react-hot-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faDownload, faShareAlt, faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import webLogo from "../utils/logo-qrexel.png"

export default function Home() {
  const { currentQR, setCurrentQR } = useStore();
  const qrRef = useRef<HTMLDivElement>(null);
  const qrCode = useRef<QRCodeStyling>();
  const [darkMode, setDarkMode] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode); // Toggle dark mode state
  };

  const toggleSignIn = () => {
    setIsSignedIn(!isSignedIn); // Toggle sign-in state
  };


  const [colorDark, setColorDark] = useState("#000000");
  const [colorLight, setColorLight] = useState("#ffffff");
  const [errorCorrection, setErrorCorrection] = useState("M");
  const [inputs, setInputs] = useState<string[]>([""]);
  const [qrCodes, setQrCodes] = useState<string[]>([]);

  useEffect(() => {
    qrCode.current = new QRCodeStyling({
      width: currentQR.width,
      height: currentQR.height,
      data: currentQR.data || 'https://stackblitz.com',
      dotsOptions: {
        color: colorDark,
        type: 'rounded'
      },
      backgroundOptions: {
        color: colorLight,
      },
      imageOptions: {
        crossOrigin: 'anonymous',
        margin: 10
      }
    });

    if (qrRef.current) {
      qrCode.current.append(qrRef.current);
    }
  }, []);

  useEffect(() => {
    if (qrCode.current) {
      qrCode.current.update({
        data: currentQR.data,
        dotsOptions: { color: colorDark },
        backgroundOptions: { color: colorLight },
      });
    }
  }, [currentQR, colorDark, colorLight]);

  const handleDownload = async () => {
    if (!qrCode.current) return;
    const blob = await qrCode.current.getRawData();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'qr-code.png';
    a.click();
    toast.success('QR code downloaded successfully');
  };

  const handleChange = (index: number, value: string) => {
    const updatedInputs = [...inputs];
    updatedInputs[index] = value;
    setInputs(updatedInputs);
  };

  const addInputField = () => {
    setInputs([...inputs, ""]);
  };

  const generateCustomizedBatchQR = async () => {
    const generatedQRs = inputs.map((input) => {
      const qr = new QRCodeStyling({
        width: currentQR.width,
        height: currentQR.height,
        data: input,
        dotsOptions: { color: colorDark },
        backgroundOptions: { color: colorLight },
        qrOptions: { errorCorrectionLevel: errorCorrection as "L" | "M" | "Q" | "H" }
      });

      return new Promise<string>((resolve) => {
        qr.getRawData().then((blob) => {
          const url = URL.createObjectURL(blob);
          resolve(url);
        });
      });
    });

    const qrData = await Promise.all(generatedQRs);
    setQrCodes(qrData);
  };

  return (

    <div className="max-w-4xl mx-auto dark:text-white">
      <div className="grid md:grid-cols-2 gap-8">
        {/* QR Code Customization Section */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">QR Code Content</h2>
          <select
            className="w-full p-2 border rounded dark:text-black"
            value={currentQR.type}
            onChange={(e) => setCurrentQR({ type: e.target.value as any })}
          >
            <option value="text">Text</option>
            <option value="url">URL</option>
            <option value="wifi">WiFi</option>
            <option value="vcard">Contact (vCard)</option>
          </select>

          <textarea
            className="w-full p-2 border rounded h-32 dark:text-black"
            placeholder="Enter your content here..."
            value={currentQR.data}
            onChange={(e) => setCurrentQR({ data: e.target.value })}
          />

          <h2 className="text-xl font-semibold">Customization</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">Dot Color</label>
              <input
                type="color"
                value={colorDark}
                onChange={(e) => setColorDark(e.target.value)}
                className="w-full h-10 p-1 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Background Color</label>
              <input
                type="color"
                value={colorLight}
                onChange={(e) => setColorLight(e.target.value)}
                className="w-full h-10 p-1 border rounded"
              />
            </div>
          </div>

          <label className="block text-sm font-medium">Error Correction</label>
          <select
            className="w-full p-2 border rounded"
            value={errorCorrection}
            onChange={(e) => setErrorCorrection(e.target.value)}
          >
            <option value="L">Low (L)</option>
            <option value="M">Medium (M)</option>
            <option value="Q">Quartile (Q)</option>
            <option value="H">High (H)</option>
          </select>
        </div>

        {/* QR Code Display Section */}
        <div className="space-y-6">
          <div className="bg-white p-8 rounded-lg shadow-sm border flex flex-col items-center">
            <div ref={qrRef} className="mb-6" />
            <button
              onClick={handleDownload}
              className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
              <Download className="w-4 h-4" />
              <span>Download</span>
            </button>
          </div>
        </div>
      </div>

      {/* Batch QR Code Generator */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold">Batch QR Code Generator</h2>

        {inputs.map((input, index) => (
          <input
            key={index}
            type="text"
            value={input}
            onChange={(e) => handleChange(index, e.target.value)}
            placeholder="Enter URL or text"
            className="w-full p-2 border rounded mt-2"
          />
        ))}

        <button
          onClick={addInputField}
          className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          + Add Another
        </button>

        <button
          onClick={generateCustomizedBatchQR}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Generate Custom QR Codes
        </button>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
          {qrCodes.map((qr, index) => (
            <img key={index} src={qr} alt={`QR ${index + 1}`} className="border p-2" />
          ))}
        </div>
      </div>
    </div>
  );
}

    <div className={darkMode ? 'dark' : ''}>
    <div className={`min-h-screen flex flex-col ${darkMode ? 'bg-[#1a2b3a]' : 'bg-white'} overflow-auto`}>
      <header className={`flex items-center justify-between p-4 ${darkMode ? 'bg-[#2d3a47]' : 'bg-[#ff5a92]'}`}>
        <div className="flex items-center space-x-2">
          <img
            alt="Logo"
            className="w-24 h-8" // Adjusted logo size
            src={webLogo} // Assuming the logo is in the same folder as the component
          />
        </div>
        <nav className="flex space-x-4 text-sm">
          <a className="text-white hover:text-gray-300" href="#">Generate</a>
          <a className="text-white hover:text-gray-300" href="#">Scan</a>
          <a className="text-white hover:text-gray-300" href="#">About QR Codes</a>
          <a className="text-white hover:text-gray-300" href="#">Community</a>
        </nav>
        <div className="flex items-center space-x-3">
          <button className="text-white" onClick={toggleDarkMode}>
            <FontAwesomeIcon icon={darkMode ? faSun : faMoon} />
          </button>
          <button className="text-white bg-[#00d084] px-4 py-1 rounded" onClick={toggleSignIn}>
            {isSignedIn ? 'Sign Out' : 'Sign In / Sign Up'}
          </button>
        </div>
      </header>

      <main className="flex-grow overflow-y-auto max-w-4xl mx-auto p-4">
        <h1 className={`text-2xl font-semibold text-center mb-4 ${darkMode ? 'text-[#0099cc]' : 'text-[#006400]'}`}>
          Free QR Code Generator
        </h1>
        <p className={`text-center text-lg mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Create dynamic, trackable, and well-designed QR Codes—forever free and always reliable.
        </p>

        <div className={`flex flex-col md:flex-row p-4 rounded-lg shadow-lg ${darkMode ? 'bg-[#1a2b3a]' : 'bg-[#f0f0f0]'}`}>
          <div className="flex-1 pr-3">
            <div className="flex space-x-3 mb-4">
              <button onClick={() => setCurrentQR({ type: "url" })} className={`flex-1 py-2 border border-gray-300 rounded ${darkMode ? 'bg-[#444f58]' : 'bg-white'} hover:bg-[#00d084] hover:text-white`}>
                URL
              </button>
              <button onClick={() => setCurrentQR({ type: "vcard" })} className={`flex-1 py-2 border border-gray-300 rounded ${darkMode ? 'bg-[#444f58]' : 'bg-[#f0f0f0]'} hover:bg-[#00d084] hover:text-white`}>
                Contact
              </button>
              <button onClick={() => setCurrentQR({ type: "text" })} className={`flex-1 py-2 border border-gray-300 rounded ${darkMode ? 'bg-[#444f58]' : 'bg-[#f0f0f0]'} hover:bg-[#00d084] hover:text-white`}>
                Plain Text
              </button>
              <button onClick={() => setCurrentQR({ type: "wifi" })} className={`flex-1 py-2 border border-gray-300 rounded ${darkMode ? 'bg-[#444f58]' : 'bg-[#f0f0f0]'} hover:bg-[#00d084] hover:text-white`}>
                Wifi
              </button>
            </div>
            <div className={`bg-white p-4 rounded-lg border border-gray-300 ${darkMode ? 'bg-[#2e3b44]' : ''}`}>
              <label className={`block mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Redirect to an existing web URL</label>
              <input
                className={`w-full p-2 border border-gray-300 rounded mb-2 ${darkMode ? 'bg-[#3c4a55] text-white' : ''}`}
                placeholder="Enter URL"
                type="text"
                value={currentQR.data}
                onChange={(e) => setCurrentQR({ data: e.target.value })}
              />
              <p className={`text-sm mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Try something like https://example.com/
              </p>
              <div className="flex items-center">
                <input className="mr-2" id="gps-tracking" type="checkbox" />
                <label className={`text-gray-700 ${darkMode ? 'text-gray-300' : ''}`} htmlFor="gps-tracking">
                  Enable GPS tracking
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="text-[#00d084] ml-1" />
                </label>
              </div>
            </div>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center py-4">
            <p className={`text-center mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              To enable tracking, 
              <a className="text-[#00d084]" href="#">create a Dynamic QR Code</a>
            </p>

            {/* QR Code Display */}
            <div
              className="w-40 h-40 border border-gray-300 rounded mb-3"
              style={{ backgroundColor: currentQR.backgroundColor, color: currentQR.dotColor }}
            >
              <div ref={qrRef} className="flex justify-center items-center h-full">{`QR Code`}</div>
            </div>

            {/* Color Pickers */}
            <div className="flex flex-col space-y-3 items-center">
              <div className="w-40">
                <label className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Text Color</label>
                <input
                  type="color"
                  value={currentQR.dotColor}
                  onChange={(e) => setCurrentQR({ dotColor: e.target.value })}
                  className="mt-2 w-full"
                />
              </div>
              <div className="w-40">
                <label className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Background Color</label>
                <input
                  type="color"
                  value={currentQR.backgroundColor}
                  onChange={(e) => setCurrentQR({ backgroundColor: e.target.value })}
                  className="mt-2 w-full"
                />
              </div>
            </div>

            <div className="flex space-x-3 mt-4">
              <button className="bg-[#00d084] text-white px-4 py-1 rounded">Save</button>
              <button onClick={handleDownload} className="bg-[#f0f0f0] text-[#006400] px-4 py-1 rounded">
                <FontAwesomeIcon icon={faDownload} />
              </button>
              <button className="bg-[#f0f0f0] text-[#006400] px-4 py-1 rounded">
                <FontAwesomeIcon icon={faShareAlt} />
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer Section */}
      <footer className="bg-[#2d3a47] text-white text-center py-2 mt-4">
        <p>&copy; 2025 Developed by dinesh-2047</p>
      </footer>
    </div>
  </div>
  )
};
