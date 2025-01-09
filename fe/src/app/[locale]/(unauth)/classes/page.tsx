'use client'
import React from "react";
import Button from '@/components/Button';

import { useRouter } from "next/navigation";
const Schedule = () => {
  const Router = useRouter();
  const handleClick = () => {
    Router.push('/confirmed-classes')
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">

      <header className="text-center mb-8">
        <h1 className="text-2xl font-bold">
          Schedule Your <span className="text-cyan-500">FREE Math Class</span>
        </h1>
        <p className="text-cyan-500 font-medium mt-2">Limited spots left!</p>

      </header>


      <div className="  p-6 w-full max-w-3xl">



        <div className="mb-6">
          <h3 className="text-lg font-medium mb-4">Select a Time</h3>
          <div className="grid grid-cols-3 gap-4">
            <button
              className="px-4 py-2 rounded border bg-cyan-500 text-white hover:bg-cyan-600"
            >
              11:00 AM
            </button>
            <button
              className="px-4 py-2 rounded border bg-gray-100 text-gray-700 hover:bg-cyan-100"
            >
              12:00 PM
            </button>
            <button
              className="px-4 py-2 rounded border bg-gray-100 text-gray-700 hover:bg-cyan-100"
            >
              1:00 PM
            </button>
            <button
              className="px-4 py-2 rounded border bg-gray-100 text-gray-700 hover:bg-cyan-100"
            >
              2:00 PM
            </button>
            <button
              className="px-4 py-2 rounded border bg-gray-100 text-gray-700 hover:bg-cyan-100"
            >
              3:00 PM
            </button>
            <button
              className="px-4 py-2 rounded border bg-gray-100 text-gray-700 hover:bg-cyan-100"
            >
              4:00 PM
            </button>


            <button
              className="px-4 py-2 rounded border bg-gray-100 text-gray-700 hover:bg-cyan-100"
            >
              5:00 PM
            </button>
            <button
              className="px-4 py-2 rounded border bg-gray-100 text-gray-700 hover:bg-cyan-100"
            >
              6:00 PM
            </button>
            <button
              className="px-4 py-2 rounded border bg-gray-100 text-gray-700 hover:bg-cyan-100"
            >
              7:00 PM
            </button>
          </div>
        </div>



        <Button
          label="Confirm Slot"
          onClick={handleClick}
          variant="primary"
          buttonSize="large"
          className="w-full "
        />
      </div>
    </div>
  );
};

export default Schedule;
