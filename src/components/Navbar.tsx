import React from 'react';
import { Link } from 'react-router-dom';
import { QrCode, Scan } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm dark:bg-gray-800 dark:text-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <QrCode className="w-8 h-8 text-indigo-600" />
            <span className="text-xl font-bold">Qrexel</span>
          </Link>

          <div className="flex items-center space-x-4">
            <Link
              to="/scanner"
              className="flex items-center space-x-1 dark:text-white text-gray-600 hover:text-indigo-600"
            >
              <Scan className="w-5 h-5" />
              <span>Scanner</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}