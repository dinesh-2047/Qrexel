import React, { useRef, useEffect } from 'react';
import QRCodeStyling from 'qr-code-styling';
import { useStore } from '../store/useStore';
import toast from 'react-hot-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { ThemeContext, ThemeContextType } from '../contexts/Themeprovider';
import faviconImage from '../../public/favicon/favicon.svg';

export default function Home() {
  const { theme } = React.useContext<ThemeContextType>(ThemeContext);
  const { currentQR, setCurrentQR } = useStore();
  const qrRef = useRef<HTMLDivElement>(null);
  const qrCode = useRef<QRCodeStyling>();

  useEffect(() => {
    qrCode.current = new QRCodeStyling({
      width: currentQR.width,
      height: currentQR.height,
      data: currentQR.data || 'Welcome to Qrexel',
      dotsOptions: {
        color: currentQR.dotColor,
        type: 'rounded',
      },
      backgroundOptions: {
        color: currentQR.backgroundColor,
      },
      imageOptions: {
        crossOrigin: 'anonymous',
        margin: 10,
      },
    });

    qrCode.current.append(qrRef.current!);
  }, []);

  useEffect(() => {
    if (qrCode.current) {
      qrCode.current.update({
        data: currentQR.data || 'Welcome to Qrexel',
        dotsOptions: { color: currentQR.dotColor },
        backgroundOptions: { color: currentQR.backgroundColor },
      });
    }
  }, [currentQR]);

  const handleDownload = async () => {
    if (!qrCode.current) return;

    const blob = await qrCode.current.getRawData();
    const img = new Image();
    img.src = URL.createObjectURL(blob);

    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      if (!ctx) return;

      const padding = 40; // Outer padding
      const border = 10; // Border thickness
      const innerPadding = 20; // Padding inside the border
      const qrSize = currentQR.width;

      const totalSize = qrSize + 2 * (padding + border + innerPadding);

      canvas.width = totalSize;
      canvas.height = totalSize;

      // **1️⃣ Outer Background (Padding Area)**
      ctx.fillStyle = currentQR.backgroundColor; // White outer padding
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // **2️⃣ Border**
      ctx.fillStyle = currentQR.dotColor; // Black border
      ctx.fillRect(
        padding,
        padding,
        totalSize - 2 * padding,
        totalSize - 2 * padding
      );

      // **3️⃣ Inner Padding (Inside the border)**
      ctx.fillStyle = currentQR.backgroundColor; // White padding inside the border
      ctx.fillRect(
        padding + border,
        padding + border,
        totalSize - 2 * (padding + border),
        totalSize - 2 * (padding + border)
      );

      // **4️⃣ Draw QR Code in the center**
      ctx.drawImage(
        img,
        padding + border + innerPadding,
        padding + border + innerPadding,
        qrSize,
        qrSize
      );

      // **7️⃣ Download the QR Code**
      const finalURL = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = finalURL;
      a.download = 'qr-code.png';
      a.click();

      toast.success('QR code downloaded successfully');
    };
  };

  return (
    <div className={`${theme === 'dark' ? 'dark' : ''}`}>
      <div
        className={`min-h-screen flex flex-col ${
          theme === 'dark' ? 'bg-slate-900' : 'bg-white'
        } overflow-auto pt-10 px-4`}
      >
        <main className='flex-grow max-w-4xl mx-auto p-4'>
          <h1
            className={`text-2xl font-semibold text-center mb-4 ${
              theme === 'dark' ? 'text-[#0099cc]' : 'text-[#006400]'
            }`}
          >
            Free QR Code Generator
          </h1>
          <p
            className={`text-center text-lg mb-6 ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}
          >
            Create dynamic, trackable, and well-designed QR Codes—forever free
            and always reliable.
          </p>

          <div
            className={`flex flex-col md:flex-row p-4 rounded-lg shadow-lg gap-4 ${
              theme === 'dark'
                ? 'bg-slate-900 border-2 border-gray-300 shadow-xs shadow-white'
                : 'bg-[#f0f0f0]'
            }`}
          >
            <div className='flex-1'>
              <div className='grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4'>
                {['URL', 'Contact', 'Plain Text', 'Wifi'].map((type) => (
                  <button
                    key={type}
                    type='button'
                    onClick={() => setCurrentQR({ type: type.toLowerCase() })}
                    className={`py-2 border border-gray-300 rounded text-center ${
                      theme === 'dark' ? 'bg-[#444f58]' : 'bg-white'
                    } hover:bg-[#00d084] hover:text-white`}
                  >
                    {type}
                  </button>
                ))}
              </div>

              <div
                className={`p-4 rounded-lg border border-gray-300 ${
                  theme === 'dark' ? 'bg-[#2e3b44]' : 'bg-white'
                }`}
              >
                <label
                  className={`block mb-2 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}
                >
                  Redirect to an existing web URL
                </label>
                <input
                  className={`w-full p-2 border border-gray-300 rounded mb-2 ${
                    theme === 'dark' ? 'bg-[#3c4a55] text-white' : ''
                  }`}
                  placeholder='Enter URL'
                  type='text'
                  onChange={(e) =>
                    setCurrentQR(
                      e.target.value === ''
                        ? { data: 'Welcome to Qrexel' }
                        : { data: e.target.value }
                    )
                  }
                />
              </div>
            </div>

            <div className='flex-1 flex flex-col items-center py-4'>
              <div className='max-w-full max-h-full border border-gray-300 rounded flex items-center justify-center overflow-hidden'>
                <div
                  ref={qrRef}
                  className='max-w-full max-h-full flex justify-center items-center p-5'
                ></div>
              </div>
              <div className='flex flex-col space-y-3 items-center w-full mt-4'>
                <div className='w-full max-w-xs'>
                  <label
                    className={`text-sm ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}
                  >
                    Text Color
                  </label>
                  <input
                    type='color'
                    value={currentQR.dotColor}
                    onChange={(e) => setCurrentQR({ dotColor: e.target.value })}
                    className='mt-2 w-full'
                  />
                </div>
                <div className='w-full max-w-xs'>
                  <label
                    className={`text-sm ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}
                  >
                    Background Color
                  </label>
                  <input
                    type='color'
                    value={currentQR.backgroundColor}
                    onChange={(e) =>
                      setCurrentQR({ backgroundColor: e.target.value })
                    }
                    className='mt-2 w-full'
                  />
                </div>
              </div>
              <div className='flex space-x-3 mt-4'>
                <button
                  type='button'
                  onClick={handleDownload}
                  className='bg-[#00d084] text-white px-4 py-1 rounded'
                >
                  <FontAwesomeIcon icon={faDownload} /> Download
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
