import React, { useRef, useEffect } from 'react';
import QRCodeStyling from 'qr-code-styling';
import { Download } from 'lucide-react';
import { useStore } from '../store/useStore';
import toast from 'react-hot-toast';

export default function Home() {
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
        type: 'rounded'
      },
      backgroundOptions: {
        color: currentQR.backgroundColor,
      },
      imageOptions: {
        crossOrigin: 'anonymous',
        margin: 10
      }
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
    <div className="max-w-4xl mx-auto">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">QR Code Content</h2>
            <select
              className="w-full p-2 border rounded"
              value={currentQR.type}
              onChange={(e) => setCurrentQR({ type: e.target.value as any })}
            >
              <option value="text">Text</option>
              <option value="url">URL</option>
              <option value="wifi">WiFi</option>
              <option value="vcard">Contact (vCard)</option>
            </select>

            <textarea
              className="w-full p-2 border rounded h-32"
              placeholder="Enter your content here..."
              value={currentQR.data}
              onChange={(e) => setCurrentQR({ data: e.target.value })}
            />
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Customization</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Dot Color
                </label>
                <input
                  type="color"
                  value={currentQR.dotColor}
                  onChange={(e) => setCurrentQR({ dotColor: e.target.value })}
                  className="w-full h-10 p-1 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Background Color
                </label>
                <input
                  type="color"
                  value={currentQR.backgroundColor}
                  onChange={(e) => setCurrentQR({ backgroundColor: e.target.value })}
                  className="w-full h-10 p-1 border rounded"
                />
              </div>
            </div>
          </div>
        </div>

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
    </div>
  );
}