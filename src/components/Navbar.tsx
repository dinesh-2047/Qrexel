import { Link } from "react-router-dom";
import { QrCode, Scan } from "lucide-react";
import { FiAlertCircle } from "react-icons/fi";
export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm dark:bg-gray-800 dark:text-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <QrCode className="w-8 h-8 text-indigo-600" />
            <span className="text-xl font-bold">Qrexel</span>
          </Link>
          <Link to="/report" className=" relative group flex items-center">
            <div className="absolute top-1/2 right-20 transform -translate-y-1/2 flex flex-col items-center">
              <span className="absolute bottom-[-30px] right-0 whitespace-nowrap rounded-md bg-red-600 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
                Report Issue
              </span>
              <FiAlertCircle
                size={32}
                className="text-red-600 cursor-pointer transition-transform transform hover:scale-110"
              />
            </div>
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
