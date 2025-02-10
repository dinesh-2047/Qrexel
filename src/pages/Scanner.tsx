import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Scanner() {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      // In a real implementation, we would use a QR code scanning library
      // to decode the image and extract the content
      toast.success('QR Code uploaded! (Scanning functionality to be implemented)');
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg']
    },
    maxFiles: 1
  });

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white p-8 rounded-lg shadow-sm border">
        <h1 className="text-2xl font-bold mb-6">QR Code Scanner</h1>
        
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors
            ${isDragActive ? 'border-indigo-600 bg-indigo-50' : 'border-gray-300 hover:border-indigo-600'}`}
        >
          <input {...getInputProps()} />
          <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
          <p className="text-lg text-gray-600">
            {isDragActive
              ? 'Drop the QR code image here...'
              : 'Drag and drop a QR code image here, or click to select'}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Supports PNG, JPG, JPEG
          </p>
        </div>
      </div>
    </div>
  );
}