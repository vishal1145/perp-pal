"use client";

import { DropdownSearchProps } from '@/types/type';
import React, { useState, useCallback  } from 'react';

const DropdownSearch: React.FC<DropdownSearchProps> = ({ filter, options, filterOptionSelect }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
 
  const toggleDropdown = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  const handleCheckboxChange = (id: string) => {
    const newSelection = selectedOption === id ? null : id;
    setSelectedOption(newSelection);
    filterOptionSelect(newSelection);
  };

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  }, []);

  // Updated filtering logic
  const filteredOptions = Array.isArray(options) 
    ? options.filter(option => 
        typeof option.name === 'string' && option.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <>
      <button
        id="dropdownSearchButton"
        onClick={toggleDropdown}
        aria-expanded={isOpen}
        className="text-black-light w-full focus:outline-none font-medium rounded-lg text-sm px-2 py-2.5 flex items-center justify-between"
      >
        <span>{filter}</span>
        <svg className="w-2.5 h-2.5 ms-3 flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? "m1 5 4-4 4 4" : "m1 1 4 4 4-4"} />
        </svg>
      </button>

      {isOpen && (
        <div id="dropdownSearch" className="z-10 bg-white rounded-lg shadow w-full dark:bg-gray-700">
          <div className="p-3 fontSize-filter font-normal text-gray-500">
            <label htmlFor="input-group-search" className="sr-only">Search</label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                </svg>
              </div>
              <input
                type="text"
                id="input-group-search"
                className="block w-full p-2 ps-10 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
          </div>
          <ul className="h-48 px-3 pb-3 overflow-y-auto" aria-labelledby="dropdownSearchButton">
            {filteredOptions.map(item => (
              <li key={item.id}>
                <div className="flex items-center ps-2 font-normal rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                  <input
                    id={`${filter}checkbox-item-${item.id}`}
                    type="checkbox"
                    checked={item.id === selectedOption}
                    onChange={() => handleCheckboxChange(item.id)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"
                  />
                  <label htmlFor={`${filter}checkbox-item-${item.id}`} className="w-full py-2 ms-2 text-sm text-gray-500 break-words">
                    {item.name}
                  </label>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default DropdownSearch;
