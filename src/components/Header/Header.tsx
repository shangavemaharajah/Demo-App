import React, { useState } from 'react';
import { Search, HelpCircle, Bell } from 'lucide-react';
import { z } from 'zod';

interface HeaderProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

// Define a zod schema for search term validation
const searchSchema = z.string().min(0).max(50).regex(/^[a-zA-Z0-9\s]*$/, {
  message: 'Search term can only contain letters, numbers, and spaces',
});

const Header: React.FC<HeaderProps> = ({ searchTerm, setSearchTerm }) => {
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    const result = searchSchema.safeParse(value);
    if (result.success) {
      setError(null);
      setSearchTerm(value);
    } else {
      setError(result.error.errors[0].message);
      // You can also choose to not update the searchTerm state when invalid
    }
  };

  return (
    <header className="bg-white border-b border-gray-100 px-6 py-4 shadow-sm">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">
          Demo<span className="text-red-500">App</span>
        </h1>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search borrowers..."
              value={searchTerm}
              onChange={handleChange}
              className={`pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64 transition-all duration-200 ${
                error ? 'border-red-500' : 'border-gray-200'
              }`}
              aria-label="Search borrowers"
            />
          </div>
          {error && (
            <p className="text-red-500 text-xs mt-1 absolute top-full left-0">
              {error}
            </p>
          )}
          <button
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
            aria-label="Help"
          >
            <HelpCircle className="w-5 h-5" />
          </button>
          <button
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-lg transition-colors relative"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
