import React, { useCallback, useState, useEffect, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, Download } from 'lucide-react';
import toast from 'react-hot-toast';
import QRCodeStyling from 'qr-code-styling';

//USED CLOUDINARY TO STORE THE IMAGE
// FROM WHIICH THE URL IS FETCHED
// URL IS CONVERTED TO QR USING QR CODE STYLING

export default function Scanner() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [qrCode, setQrCode] = useState<QRCodeStyling | null>(null);
  const qrRef = useRef<HTMLDivElement | null>(null);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setIsUploading(true);

      // reset imageUrl b4 processing the image url
      setImageUrl(() => null);
      // setQrCode(() => null);

      // clears the prev qr code
      if (qrRef.current) {
        qrRef.current.innerHTML = '';
      }

      // prepare FormData for file upload
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', '{PRESET_NAME}'); //replace with your preset value

      try {
        // upload the file to Cloudinary
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/{PUBLIC_NAME}/upload`, // replace the public url with yours
          {
            method: 'POST',
            body: formData,
          }
        );

        const data = await response.json();
        if (data.secure_url) {
          const imageUrl = data.secure_url; //converting the image-->url
          setImageUrl(imageUrl); // set the uploaded image URL
          toast.success('Image uploaded successfully!');

          // using the url and converting it to qr code
          const qrCodeInstance = new QRCodeStyling({
            width: 300,
            height: 300,
            data: imageUrl || 'https://stackblitz.com',
            dotsOptions: {
              color: '#000000',
              type: 'square',
            },
            cornersSquareOptions: {
              type: 'dot',
            },
            cornersDotOptions: {
              type: 'rounded',
            },
            backgroundOptions: {
              color: '#ffffff',
            },
            imageOptions: {
              crossOrigin: 'anonymous',
              margin: 10,
            },
          });

          setQrCode(qrCodeInstance); // set the generated QR code
        } else {
          toast.error('Image upload failed. Please try again.');
        }
      } catch (error: any) {
        toast.error('Error uploading image: ' + error.message);
      } finally {
        setIsUploading(false);
      }
    }
  }, []);

  // qppend qr code to the dom
  useEffect(() => {
    if (qrCode && qrRef.current) {
      qrCode.append(qrRef.current);
    }
  }, [qrCode]);

  // download the qr
  const handleDownload = (e: React.MouseEvent) => {
    e.preventDefault();
    if (qrCode) {
      qrCode.download();
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg'],
    },
    maxFiles: 1,
  });

  return (
    <div className='max-w-2xl mx-auto h-full md:p-20'>
      <div className='bg-white p-8 rounded-lg shadow-sm border '>
        <h1 className='text-2xl font-bold mb-6'>QR Code Scanner</h1>

        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors
            ${
              isDragActive
                ? 'border-indigo-600 bg-indigo-50'
                : 'border-gray-300 hover:border-indigo-600'
            }`}
        >
          <input {...getInputProps()} />
          <Upload className='w-12 h-12 mx-auto mb-4 text-gray-400' />
          <p className='text-lg text-gray-600'>
            {isDragActive
              ? 'Drop the QR code image here...'
              : 'Drag and drop a QR code image here, or click to select'}
          </p>
          <p className='text-sm text-gray-500 mt-2'>Supports PNG, JPG, JPEG</p>
        </div>

        {/* display uploaded image */}
        {imageUrl && (
          <div className='mt-6'>
            <h2 className='text-xl font-semibold'>Uploaded QR Code Image</h2>
            <img
              src={imageUrl}
              alt='Uploaded QR code'
              className='mt-4 rounded-lg shadow-md w-full'
            />
          </div>
        )}

        {/* loading upload animation*/}
        {isUploading && (
          <div className='mt-4 text-center text-gray-600'>Uploading...</div>
        )}

        {/* display the qr code */}
        <div className='mt-6 text-center' id='qr-code' ref={qrRef}></div>

        {/*download button */}
        {qrCode && (
          <div className='mt-6 text-center'>
            <button
              onClick={handleDownload}
              className='flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700'
            >
              <Download className='w-4 h-4' />
              <span>Download</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
