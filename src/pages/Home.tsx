import React, { useRef, useEffect, useState } from 'react';
import QRCodeStyling from 'qr-code-styling';
import { Download } from 'lucide-react';
import { useStore } from '../store/useStore';
import toast from 'react-hot-toast';

export default function Home() {
  const { currentQR, setCurrentQR } = useStore();
  const qrRef = useRef<HTMLDivElement>(null);
  const qrCode = useRef<QRCodeStyling>();

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
