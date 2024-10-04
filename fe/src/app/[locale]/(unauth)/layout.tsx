// import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';
import { FaSearch } from 'react-icons/fa';
import { DemoBanner } from '@/components/DemoBanner';
// import { LocaleSwitcher } from '@/components/LocaleSwitcher';
// import { BaseTemplate } from '@/templates/BaseTemplate';

export default function Layout(props: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  unstable_setRequestLocale(props.params.locale);
  const t = useTranslations('RootLayout');

  return (
    <>
      <DemoBanner />
      {/* <div className="bg-white p-8 mb-6 rounded-lg  flex justify-center">
  <input
    type="text"
    placeholder="Take a note..."
    className="w-full max-w-2xl p-2 border border-gray-300 rounded-lg shadow-lg focus:outline-none focus:ring-2 "
  />
</div> */}
 
 <div className="flex justify-center items-center mt-6 mb-6"> {/* Flex container */}
      <div className="relative w-full max-w-2xl ">
        <input
          type="text"
          placeholder="Search..."
          className="bg-gray-100 w-full max-w-2xl p-4 pl-10 border border-gray-300 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
          <FaSearch className="text-gray-400" />
        </span>
      </div>
    </div>

     
   
{/* Cards Grid */}
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mx-4 md:mx-8">
  {/* Card 1 */}
  <div className="bg-gray-100 p-6 rounded-lg shadow-md flex flex-col">
    <h2 className="text-xl font-semibold mb-4">Video Tools</h2>
    <a href="https://videogen.io" className="text-blue-600 hover:underline">
      videogen.io
    </a>
  </div>

  {/* Card 2 */}
  <div className="bg-gray-100 p-6 rounded-lg shadow-md flex flex-col">
    <h2 className="text-xl font-semibold mb-4">Algo Web</h2>
    <p className="text-gray-700">https://www.quicknode.com</p>
  </div>

  {/* Card 3 */}
  <div className="bg-gray-100 p-6 rounded-lg shadow-md flex flex-col">
    <h2 className="text-xl font-semibold mb-4">Gen AI</h2>
    <p className="text-gray-700">Backpropagation</p>
    <a href="https://playground.tensorflow.org" className="text-blue-600 hover:underline">
      playground.tensorflow.org
    </a>
  </div>

  {/* Card 4 with more content */}
  <div className="bg-gray-100 p-6 rounded-lg shadow-md flex flex-col">
    <h2 className="text-xl font-semibold mb-4">Exploration</h2>
    <p className="text-gray-700 mb-2">
      This card contains additional information and some longer text to demonstrate varying heights in the grid layout.
      Feel free to add as much content as needed, and the card will expand accordingly.
    </p>
    <a href="https://github.com/black-forest-labs/flux" className="text-blue-600 hover:underline">
      https://github.com/black-forest-labs/flux
    </a>
  </div>
</div>
      {/* <BaseTemplate
        leftNav={(
          <>
            <li>
              <Link
                href="/"
                className="border-none text-gray-700 hover:text-gray-900"
              >
                {t('home_link')}
              </Link>
              <Link
                href="/mylist/"
                className="border-none text-gray-700 hover:text-gray-900"
              >
                my list
              </Link>
            </li>
            <li>
              <Link
                href="/about/"
                className="border-none text-gray-700 hover:text-gray-900"
              >
                {t('about_link')}
              </Link>
            </li>
            <li>
              <Link
                href="/counter/"
                className="border-none text-gray-700 hover:text-gray-900"
              >
                {t('counter_link')}
              </Link>
            </li>
            <li>
              <Link
                href="/portfolio/"
                className="border-none text-gray-700 hover:text-gray-900"
              >
                {t('portfolio_link')}
              </Link>
            </li>
            <li>
              <a
                className="border-none text-gray-700 hover:text-gray-900"
                href="https://github.com/ixartz/Next-js-Boilerplate"
              >
                GitHub
              </a>
            </li>
          </>
        )}
        rightNav={(
          <>
            <li>
              <Link
                href="/sign-in/"
                className="border-none text-gray-700 hover:text-gray-900"
              >
                {t('sign_in_link')}
              </Link>
            </li>

            <li>
              <Link
                href="/sign-up/"
                className="border-none text-gray-700 hover:text-gray-900"
              >
                {t('sign_up_link')}
              </Link>
            </li>

            <li>
              <LocaleSwitcher />
            </li>
          </>
        )}
      >
        <div className="py-5 text-xl [&_p]:my-6">{props.children}</div>
      </BaseTemplate> */}
    </>
  );
}
