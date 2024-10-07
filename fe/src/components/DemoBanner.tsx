import Link from "next/link";

export const DemoBanner = () => (
  <header className="sticky top-0 z-50 bg-white p-4 text-lg font-normal text-gray-900 flex items-center justify-between border-b border-gray-200">
    <div className="flex items-center space-x-3">
      <button className="flex flex-col focus:outline-none mr-8">
        <div className="h-1 w-6 bg-gray-900 mb-1 transition-transform"></div>
        <div className="h-1 w-6 bg-gray-900 mb-1"></div>
        <div className="h-1 w-6 bg-gray-900 transition-transform"></div>
      </button>

      <div className="flex items-center space-x-8">
        <ul className="flex space-x-4">
          <li>
            <Link href="/" className="hover:text-indigo-100">
              <p className="text-base text-gray-900">Home</p>
            </Link>
          </li>
          <li>
            <Link href="/about" className="hover:text-indigo-100">
              <p className="text-base text-gray-900">About</p>
            </Link>
          </li>
        </ul>
      </div>
    </div>

   
    <div className="flex items-center space-x-3">
      <img
        src="https://randomuser.me/api/portraits/men/75.jpg"
        alt="Profile"
        width={40}
        height={40}
        className="rounded-full"
      />
    </div>
  </header>
);
