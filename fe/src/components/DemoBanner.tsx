import Link from 'next/link';

export const DemoBanner = () => (
  <header className="sticky top-0 z-50 bg-gray-900 p-4 text-lg font-semibold text-gray-100 flex items-center justify-between">
    {/* Logo */}
    
    
    <div className="flex items-center space-x-3">
      <button
        
          className="flex flex-col  focus:outline-none mr-8"
        >
          <div className={`h-1 w-6 bg-gray-100 mb-1 transition-transform '}`}></div>
          <div className={`h-1 w-6 bg-gray-100 mb-1 `}></div>
          <div className={`h-1 w-6 bg-gray-100 transition-transform `}></div>
        </button>

      <img
        src="data:image/png;base64,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"
        alt="Keep Logo"
        width={40}
        height={40}
        className=""
      />
      <p className="text-2xl font-bold" style={{ lineHeight: "1.2" }}>Keep</p>
    </div>

  <div>Live Demo of Next.js Boilerplate -
    {' '}
    <Link href="/sign-up">Explore the Authentication</Link></div>

    {/* Profile Image */}
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
