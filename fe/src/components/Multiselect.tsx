"use client";

import { DropdownSearchProps } from '@/types/type';
import React, { useState } from 'react';

const DropdownSearch: React.FC<DropdownSearchProps> = (props) => {
  const { filter, options } = props;

  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<{ [key: string]: boolean }>({});
  const [searchQuery, setSearchQuery] = useState('');

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleCheckboxChange = (id: string) => {
    setSelectedOptions(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  // Filter options based on the search query
  const filteredOptions = options.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <button
        id="dropdownSearchButton"
        onClick={toggleDropdown}
        className="text-black-light w-full focus:outline-none font-medium rounded-lg text-sm px-2 py-2.5 text-center inline-flex items-center justify-between"
        type="button"
      >
        <span>{filter}</span>
        { !isOpen ? (
        <svg
          className="w-2.5 h-2.5 ms-3 flex-shrink-0"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="m1 1 4 4 4-4"
          />
        </svg>
      ) : (
        <svg
          className="w-2.5 h-2.5 ms-3 flex-shrink-0"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="m1 5 4-4 4 4"
          />
        </svg>
      )}
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div
          id="dropdownSearch"
          className="z-10 bg-white rounded-lg shadow w-full dark:bg-gray-700"
        >
          <div className="p-3 fontSize-filter text-gray-500  " >
          
        
            <label htmlFor="input-group-search" className="sr-only text-sm text-gray-500 break-words max-w-xs">
              Search
            </label>
            
            <div className="relative ">
              <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="text"
                id="input-group-search"
                className="block w-full p-2 ps-10   text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search... "
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
          </div>
          <ul
            className="h-48 px-3 pb-3 overflow-y-auto"
            aria-labelledby="dropdownSearchButton"
          >
            {filteredOptions.map(user => (
              <li key={user.id}>
                <div className="flex items-center ps-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600" >
                  <input
                    id={`${filter}checkbox-item-${user.id}`}
                    type="checkbox"
                    checked={!!selectedOptions[user.id]}
                    onChange={() => handleCheckboxChange(user.id)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"
                  />
                  <label
                    htmlFor={`${filter}checkbox-item-${user.id}`}
                    className="w-full py-2 ms-2   text-sm text-gray-500 break-words max-w-xs  rounded"
                    style={{

                    }}
                  >
                    {user.name}
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
