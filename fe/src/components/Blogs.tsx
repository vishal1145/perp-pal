import React from 'react'
import img1 from "../../public/apple-touch-icon.png"
import img2 from "../../public/favicon-32x32.png"
import Image from 'next/image'
const Blogs = () => {
  return (
    <section className="bg-white mb-12 lg:mb-0 mt-4 lg:mt-0 lg:min-h-screen dark:bg-gray-900">
  <div className="px-4 mx-auto max-w-screen-xl   lg:px-6">
    <div className="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8">
      <h2 className="mb-4 text-3xl lg:text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
        Our Blog
      </h2>
      <p className="font-light text-gray-500 sm:text-xl dark:text-gray-400">
        We use an agile approach to test assumptions and connect with the needs
        of your audience early and often.
      </p>
    </div>
    <div className="grid gap-8 lg:grid-cols-2 px-2 lg:px-0 ">
      <article className="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
        <div className="flex justify-between items-center mb-5 text-gray-500">
          <span className="bg-primary-100 text-primary-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-primary-200 dark:text-primary-800">
            <svg
              className="mr-1 w-3 h-3"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z"
                clipRule="evenodd"
              />
              <path d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z" />
            </svg>
            Article
          </span>
          <span className="text-sm">December 5, 2024</span>
        </div>
        <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          <a  href="https://preppal.club/blogs/2024/12/01/smart-learning-and-benefits-of-using-customized-papers/"
            target='_blank'>Smart Learning and Benefits of Using Customized Papers</a>
        </h2>
        <p className="mb-5 font-light text-gray-500 dark:text-gray-400">
        smart learning is the future of education, blending technology with personalized strategies to optimize the learning process. At the heart of this approach is the use of customized papers, which …
        </p>
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
          <Image src={img2} className='w-7 h-7 rounded-full'  alt='img not found'/>

            <span className="font-medium dark:text-white">Preppal</span>
          </div>
          <a
           href="https://preppal.club/blogs/2024/12/01/smart-learning-and-benefits-of-using-customized-papers/"
           target='_blank'
            className="inline-flex items-center font-medium text-primary-600 dark:text-primary-500 hover:underline"
          >
            Read more
            <svg
              className="ml-2 w-4 h-4"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </a>
        </div>
      </article>


      <article className="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
        <div className="flex justify-between items-center mb-5 text-gray-500">
          <span className="bg-primary-100 text-primary-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-primary-200 dark:text-primary-800">
            <svg
              className="mr-1 w-3 h-3"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z"
                clipRule="evenodd"
              />
              <path d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z" />
            </svg>
            Article
          </span>
          <span className="text-sm">December 5, 2024 </span>
        </div>
        <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          <a href="https://preppal.club/blogs/2024/12/03/create-and-customize-your-perfect-practice-paper/" target='_blank'>Create and Customize Your Perfect Practice Paper with PrepPal</a>
        </h2>
        <p className="mb-5 font-light text-gray-500 dark:text-gray-400">
        Creating customized papers is a game-changer in modern education. With PrepPal, educators and students can design practice tests and study materials tailored to their specific needs. This flexibility ensures a …
        </p>
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Image src={img1} className='w-7 h-7 rounded-full'  alt='img not found'/>
            <span className="font-medium dark:text-white">Preppal</span>
          </div>
          <a
            href="https://preppal.club/blogs/2024/12/03/create-and-customize-your-perfect-practice-paper/"
            target='_blank'
            className="inline-flex items-center font-medium text-primary-600 dark:text-primary-500 hover:underline"
          >
            Read more
            <svg
              className="ml-2 w-4 h-4"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </a>
        </div>
      </article>
    </div>
  </div>
</section>

  )
}

export default Blogs