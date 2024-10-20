import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Database, Wrench } from 'lucide-react';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-gray-900 text-blue-300 p-4 border-b border-blue-500">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold flex items-center">
          <Database className="mr-2" />
          Sci-Fi Race Database
        </Link>
        <div className="space-x-4">
          <Link to="/" className="hover:text-blue-100 flex items-center">
            <Home className="mr-1" size={20} />
            Home
          </Link>
          <Link to="/workshop" className="hover:text-blue-100 flex items-center">
            <Wrench className="mr-1" size={20} />
            Workshop
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;