import { useRef, useEffect } from 'react';
import QRCodeStyling from 'qr-code-styling';
import { useStore } from '../store/useStore';
import toast from 'react-hot-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMapMarkerAlt,
  faDownload,
  faShareAlt,
} from '@fortawesome/free-solid-svg-icons';

export default function Home({ darkMode }: { darkMode: boolean }) {
  const { currentQR, setCurrentQR } = useStore();
  const qrRef = useRef<HTMLDivElement>(null);
  const qrCode = useRef<QRCodeStyling>();

  useEffect(() => {
    qrCode.current = new QRCodeStyling({
      width: currentQR.width,
      height: currentQR.height,
      data: currentQR.data || 'https://stackblitz.com',
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
        data: currentQR.data,
        dotsOptions: { color: currentQR.dotColor },
        backgroundOptions: { color: currentQR.backgroundColor },
      });
    }
  }, [currentQR]);

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

  return (
    <div className={`${darkMode ? 'dark' : ''}`}>
      <div
        className={`min-h-screen flex flex-col ${
          darkMode ? 'bg-[#1a2b3a]' : 'bg-white'
        } overflow-auto  pt-10`}
      >
        <main className='flex-grow overflow-y-auto max-w-4xl mx-auto p-4'>
          <h1
            className={`text-2xl font-semibold text-center mb-4 ${
              darkMode ? 'text-[#0099cc]' : 'text-[#006400]'
            }`}
          >
            Free QR Code Generator
          </h1>
          <p
            className={`text-center text-lg mb-6 ${
              darkMode ? 'text-gray-300' : 'text-gray-600'
            }`}
          >
            Create dynamic, trackable, and well-designed QR Codes—forever free
            and always reliable.
          </p>

          <div
            className={`flex flex-col md:flex-row p-4 rounded-lg shadow-lg ${
              darkMode ? 'bg-[#1a2b3a]' : 'bg-[#f0f0f0]'
            }`}
          >
            <div className='flex-1 pr-3'>
              <div className='flex space-x-3 mb-4'>
                <button
                  type='button'
                  onClick={() => setCurrentQR({ type: 'url' })}
                  className={`flex-1 py-2 border border-gray-300 rounded ${
                    darkMode ? 'bg-[#444f58]' : 'bg-white'
                  } hover:bg-[#00d084] hover:text-white`}
                >
                  URL
                </button>
                <button
                  type='button'
                  onClick={() => setCurrentQR({ type: 'vcard' })}
                  className={`flex-1 py-2 border border-gray-300 rounded ${
                    darkMode ? 'bg-[#444f58]' : 'bg-[#f0f0f0]'
                  } hover:bg-[#00d084] hover:text-white`}
                >
                  Contact
                </button>
                <button
                  type='button'
                  onClick={() => setCurrentQR({ type: 'text' })}
                  className={`flex-1 py-2 border border-gray-300 rounded ${
                    darkMode ? 'bg-[#444f58]' : 'bg-[#f0f0f0]'
                  } hover:bg-[#00d084] hover:text-white`}
                >
                  Plain Text
                </button>
                <button
                  type='button'
                  onClick={() => setCurrentQR({ type: 'wifi' })}
                  className={`flex-1 py-2 border border-gray-300 rounded ${
                    darkMode ? 'bg-[#444f58]' : 'bg-[#f0f0f0]'
                  } hover:bg-[#00d084] hover:text-white`}
                >
                  Wifi
                </button>
              </div>
              <div
                className={`bg-white p-4 rounded-lg border border-gray-300 ${
                  darkMode ? 'bg-[#2e3b44]' : ''
                }`}
              >
                <label
                  className={`block mb-2 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}
                >
                  Redirect to an existing web URL
                </label>
                <input
                  className={`w-full p-2 border border-gray-300 rounded mb-2 ${
                    darkMode ? 'bg-[#3c4a55] text-white' : ''
                  }`}
                  placeholder='Enter URL'
                  type='text'
                  value={currentQR.data}
                  onChange={(e) => setCurrentQR({ data: e.target.value })}
                />
                <p
                  className={`text-sm mb-4 ${
                    darkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}
                >
                  Try something like https://example.com/
                </p>
                <div className='flex items-center'>
                  <input className='mr-2' id='gps-tracking' type='checkbox' />
                  <label
                    className={`text-gray-700 ${
                      darkMode ? 'text-gray-300' : ''
                    }`}
                    htmlFor='gps-tracking'
                  >
                    Enable GPS tracking
                    <FontAwesomeIcon
                      icon={faMapMarkerAlt}
                      className='text-[#00d084] ml-1'
                    />
                  </label>
                </div>
              </div>
            </div>

            <div className='flex-1 flex flex-col items-center justify-center py-4'>
              <p
                className={`text-center mb-3 ${
                  darkMode ? 'text-gray-300' : 'text-gray-600'
                }`}
              >
                To enable tracking,
                <a className='text-[#00d084]' href='#'>
                  create a Dynamic QR Code
                </a>
              </p>

              {/* QR Code Display */}
              <div
                className='w-40 h-40 border border-gray-300 rounded mb-3'
                style={{
                  backgroundColor: currentQR.backgroundColor,
                  color: currentQR.dotColor,
                }}
              >
                <div
                  ref={qrRef}
                  className='flex justify-center items-center h-full scale-[0.5]'
                >{`QR Code`}</div>
              </div>

              {/* Color Pickers */}
              <div className='flex flex-col space-y-3 items-center'>
                <div className='w-40'>
                  <label
                    className={`text-sm ${
                      darkMode ? 'text-gray-300' : 'text-gray-700'
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
                <div className='w-40'>
                  <label
                    className={`text-sm ${
                      darkMode ? 'text-gray-300' : 'text-gray-700'
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
                  className='bg-[#00d084] text-white px-4 py-1 rounded'
                >
                  Save
                </button>
                <button
                  type='button'
                  onClick={handleDownload}
                  className='bg-[#f0f0f0] text-[#006400] px-4 py-1 rounded'
                >
                  <FontAwesomeIcon icon={faDownload} />
                </button>
                <button
                  type='button'
                  className='bg-[#f0f0f0] text-[#006400] px-4 py-1 rounded'
                >
                  <FontAwesomeIcon icon={faShareAlt} />
                </button>
              </div>
            </div>
          </div>
        </main>

        {/* Footer Section */}
        <footer className='bg-[#2d3a47] text-white text-center py-2 mt-4'>
          <p>&copy; 2025 Developed by dinesh-2047</p>
        </footer>
      </div>
    </div>
  );
}
