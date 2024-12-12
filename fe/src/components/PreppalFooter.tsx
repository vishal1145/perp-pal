import React, { useState } from 'react'
import axios from 'axios';
import Snackbar from './snackbar';

const PreppalFooter = () => {
  const [snackbar, setSnackbar] = useState({ message: "", type: "" });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    query: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.query) {
      alert('Please fill out all fields.');
      return;
    }

    setSnackbar({ message: "We will connect you shortly", type: "success" });
    setFormData({
      name: '',
      email: '',
      query: ''
    })
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URI}contactus`, { formData });
    } catch (error) {
      console.log(error);
    }


  };

  return (
    <footer className="bg-gray-200 " style={{ backgroundColor: "rgb(243 244 246)" }} >
      {
        snackbar.message && <Snackbar type={snackbar.type} message={snackbar.message} onClose={() => setSnackbar({ type: '', message: '' })} />
      }
      <div className="px-2  sm:px-4 py-0 md:py-8 w-full">
        <div className="grid grid-cols lg:grid-cols-2 lg:gap-16 lg:flex-row sm:gap-8 px-4 p-[32px] ">
          <div className=' '>
            <div className="text-2xl mb-[1.5rem] font-bold tracking-tight text-gray-900">
              Services
            </div>

            <ul className="font-light text-gray-500">

              <li className="mb-2">
                <a href="https://preppal.club/e-paper/Prepare--test--on--Linear--Equations--in--Two--Variables--to--hone--your--kills." target="_blank" className="hover:underline">
                  Prepare test on Linear Equations in Two Variables to hone your skills.
                </a>
              </li>
              <li className="mb-2">
                <a href="https://preppal.club/e-paper/Design--test--on--Laws--of--Motion--and--Gravitation--for--in-depth--learning." target="_blank" className="hover:underline">
                  Design test on Laws of Motion and Gravitation for in-depth learning.
                </a>
              </li>
              <li className="mb-2">
                <a href="https://preppal.club/e-paper/Generate-a-test-on-Algebraic-Expressions-and-Identities-for-a-strong-grasp-of-the-topic." target="_blank" className="hover:underline">
                  Generate a test on Algebraic Expressions and Identities.
                </a>
              </li>
              <li className="mb-2">
                <a href="https://preppal.club/e-paper/Prepare--a--quiz--on--Reflection--and--Refraction--of--Light." target="_blank" className="hover:underline">
                  Prepare a quiz on Reflection and Refraction of Light.
                </a>
              </li>

              <li className="mb-2">
                <a href="https://preppal.club/e-paper/Create--quiz--on--Coordinate--Geometry--to--master--spatial--relationship." target="_blank" className="hover:underline">
                  Create quiz on Coordinate Geometry to master spatial relationship.
                </a>
              </li>

              <li className="mb-2">
                <a href="https://preppal.club/e-paper/Create--a--test--paper--on--Chemical--Reactions--and--Equations." target="_blank" className="hover:underline">
                  Create a test paper on Chemical Reactions and Equations.
                </a>
              </li>
            </ul>


          </div>


          <div >
            <hr className='mb-4 mt-4 text-2xl font-bold tracking-tight text-gray-900 block lg:hidden' />

            <div className="mb-[1.5rem] text-2xl font-bold tracking-tight text-gray-900">
              Legal
            </div>
            <ul className="font-light text-gray-500">
              <li className="mb-2">
                <a href="https://preppal.club/blogs/about-us/" target="_blank" className="hover:underline">
                  About us
                </a>
              </li>
              <li className="mb-2">
                <a href="https://preppal.club/blogs/" target='_blank' className="hover:underline">
                  Blogs
                </a>
              </li>
              <li className="mb-2">
                <a href="https://preppal.club/how-it-work" target='_blank' className="hover:underline">
                  How it works
                </a>
              </li>



              <hr className='my-[1.5rem] text-2xl font-bold tracking-tight text-gray-900' />

              <div className="text-2xl mb-[1.5rem] font-bold tracking-tight text-gray-900">
                Contact us
              </div>


              <form onSubmit={handleSubmit} className="space-y-4">
                <li className="mb-2 flex flex-col lg:flex-row gap-4">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="focus:outline-none focus:ring-2 focus:ring-black h-9 rounded px-2 border border-gray-200"
                    placeholder="Name"
                    required
                  />
                  <input
                    type="text"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="focus:outline-none focus:ring-2 focus:ring-black h-9 rounded px-2 border border-gray-200"
                    placeholder="Email or phone"
                    required
                  />
                </li>

                <li className="mb-2">
                  <textarea
                    name="query"
                    value={formData.query}
                    onChange={handleChange}
                    className="focus:outline-none focus:ring-2 focus:ring-black h-40 rounded p-2 w-full border border-gray-200"
                    placeholder="Enter your query here..."
                    required
                  />
                </li>

                <li className="mb-2">
                  <button
                    type="submit"
                    className="  w-full cursor-pointer rounded-lg border border-gray-500 bg-transparent px-5 py-2 text-sm font-medium hover:bg-gray-200 focus:outline-none"
                    style={{
                      border: '1px solid rgb(226, 226, 226)',
                      color: 'rgb(107 114 128)',
                    }}
                  >
                    Submit
                  </button>
                </li>
              </form>

            </ul>
          </div>


        </div>

      </div>
    </footer>

  )
}

export default PreppalFooter