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

  const handleSubmit = async(e) => {
    e.preventDefault();  

    if (!formData.name || !formData.email || !formData.query) {
      alert('Please fill out all fields.');
      return;
    }

    setSnackbar({ message: "We will connect you shortly", type: "success" });

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URI}contactus`, {formData});
    } catch (error) {
      console.log(error);
    }
 
    setFormData({
      name: '',
      email: '',
      query: ''
    })
  };
  
  return (
    <footer className="bg-gray-200 " style={{ backgroundColor: "rgb(243 244 246)" }} >
      {
        snackbar.message && <Snackbar type={snackbar.type} message={snackbar.message} onClose={()=>setSnackbar({type:'', message:''})}/>
      }
      <div className=" px-2 sm:px-4 py-0 sm:py-8 w-full">
        <div className="flex flex-col sm:flex-row justify-between sm:gap-8 px-4 p-[32px] ">
        <div>
          <div className="text-2xl mb-2 font-bold tracking-tight text-gray-900">
      Services
      </div>
            <ul className="font-light text-gray-500">
            <li className="mb-2">
  <a href="https://preppal.club/e-paper/Create--a--test--on--Chemical--Reactions--and--Equations--with--problems--for--solving" target="_blank" className="hover:underline">
    Create a paper on Chemical Reactions and Equations with problems for solving.
  </a>
</li>
<li className="mb-2">
  <a href="https://preppal.club/e-paper/Create--a--test--on--Probability--and--Statistics--Concepts" target="_blank" className="hover:underline">
    Create a paper on Probability and Statistics Concepts for exercises effectively.
  </a>
</li>
<li className="mb-2">
  <a href="https://preppal.club/e-paper/Create--a--test--on--Quadratic--Equations" target="_blank" className="hover:underline">
    Create a papaer on Quadratic Equations with methods for practice and solution.
  </a>
</li>
<li className="mb-2">
  <a href="https://preppal.club/e-paper/Create--a--test--on--Trigonometric--Ratios" target="_blank" className="hover:underline">
    Create a test paper on Trigonometric Ratios for mastering concepts & formulas.
  </a>
</li>
<li className="mb-2">
  <a href="https://preppal.club/e-paper/Create--a--test--on--Chemical--Reactions--and--Equations--with--problems--for--solving" target="_blank" className="hover:underline">
    Create a paper on Chemical Reactions and Equations with problems for solving.
  </a>
</li>
<li className="mb-2">
  <a href="https://preppal.club/e-paper/Create--a--test--on--Surface--Area--and--Volume--of--Solids" target="_blank" className="hover:underline">
    Create a test on Surface Area and Volume of Solids for comprehensive practice.
  </a>
</li>
<li className="mb-2">
  <a href="https://preppal.club/e-paper/Create--a--test--on--Linear--Equations--in--Two--Variables" target="_blank" className="hover:underline">
    Create a test paper on Linear Equations in Two Variables for practice effectively.
  </a>
</li>
<li className="mb-2">
  <a href="https://preppal.club/e-paper/Create--a--test--on--Laws--of--Motion--and--Gravitation" target="_blank" className="hover:underline">
    Create test paper on Laws of Motion and Gravitation for understanding deeply.
  </a>
</li>
<li className="mb-2">
  <a href="https://preppal.club/e-paper/Create--a--test--on--Algebraic--Expressions--and--Identities" target="_blank" className="hover:underline">
    Create test on Algebraic Expressions and Identities for thorough understanding.
  </a>
</li>
<li className="mb-2">
  <a href="https://preppal.club/e-paper/Create--a--test--on--Reflection--and--Refraction--of--Light" target="_blank" className="hover:underline">
    Create test paper on Reflection and  Refraction of Light for  practical  application.
  </a>
</li>


       
            </ul>
          </div>
         
          <div>
<hr className='mb-4 mt-4 text-2xl font-bold tracking-tight text-gray-900 block sm:hidden'/>

          <div className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
      Legal
      </div>
            <ul className="font-light text-gray-500">
            <li className="mb-2">
                <a href="https://preppal.club/blogs/about-us/" target="_blank" className="hover:underline">
                  About us
                </a>
              </li>
                <li className="mb-2">
                <a href="https://preppal.club/how-it-work" target='_blank' className="hover:underline">
                  How it works
                </a>
              </li>
            
              <li className="mb-2">
                <a href="https://preppal.club/blogs/" target='_blank' className="hover:underline">
                  Blogs
                </a>
              </li>

<hr className='mb-4 mt-4 text-2xl font-bold tracking-tight text-gray-900'/>

              <div className="text-2xl mb-4 font-bold tracking-tight text-gray-900">
      Contact us
      </div>

           
      <form onSubmit={handleSubmit} className="space-y-4">
      <li className="mb-2 flex flex-col sm:flex-row gap-4">
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