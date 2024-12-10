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
    setFormData({
      name: '',
      email: '',
      query: ''
    })
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URI}contactus`, {formData});
    } catch (error) {
      console.log(error);
    }
 
 
  };
  
  return (
    <footer className="bg-gray-200 " style={{ backgroundColor: "rgb(243 244 246)" }} >
      {
        snackbar.message && <Snackbar type={snackbar.type} message={snackbar.message} onClose={()=>setSnackbar({type:'', message:''})}/>
      }
      <div className="px-2  sm:px-4 py-0 sm:py-8 w-full">
        <div className="flex flex-col  md:flex-col-2 lg:gap-16 lg:flex-row sm:gap-8 px-4 p-[32px] ">
        <div className=' '>
          <div className="text-2xl mb-[1.5rem] font-bold tracking-tight text-gray-900">
      Services
      </div>
      <ul className="font-light text-gray-500">
  <li className="mb-2">
    <a href="https://preppal.club/e-paper/Generate-a-test-on-Chemical-Reactions-and-Equations-with-problems-for-solving." target="_blank" className="hover:underline">
      Generate a test on Chemical Reactions and Equations with problem-solving exercises.
    </a>
  </li>
  <li className="mb-2">
    <a href="https://preppal.club/e-paper/Design-a-practice-paper-on-Probability-and-Statistics-Concepts-for-understanding." target="_blank" className="hover:underline">
      Design a practice paper on Probability and Statistics Concepts for understanding.
    </a>
  </li>
  <li className="mb-2">
    <a href="https://preppal.club/e-paper/Create-an-exercise-sheet-on-Quadratic-Equations-with-solution-methods-for-practice." target="_blank" className="hover:underline">
      Create an exercise sheet on Quadratic Equations with solution methods for practice.
    </a>
  </li>
  <li className="mb-2">
    <a href="https://preppal.club/e-paper/Develop-a-quiz-on-Trigonometric-Ratios-to-strengthen-your-knowledge-of-formulas." target="_blank" className="hover:underline">
      Develop a quiz on Trigonometric Ratios to strengthen your knowledge of formulas.
    </a>
  </li>
  <li className="mb-2">
    <a href="https://preppal.club/e-paper/Solve-test-on-Chemical-Reactions-and-Equations-to-improve-problem-solving-skills." target="_blank" className="hover:underline">
      Solve test on Chemical Reactions and Equations to improve problem-solving skills.
    </a>
  </li>
  <li className="mb-2">
    <a href="https://preppal.club/e-paper/Build-a-practice-test-on-Surface-Area-and-Volume-of-Solids-for-practical-mastery." target="_blank" className="hover:underline">
      Build a practice test on Surface Area and Volume of Solids for practical mastery.
    </a>
  </li>
  <li className="mb-2">
    <a href="https://preppal.club/e-paper/Prepare-a-problem-set-on-Linear-Equations-in-Two-Variables-to-hone-your-skills." target="_blank" className="hover:underline">
      Prepare a problem set on Linear Equations in Two Variables to hone your skills.
    </a>
  </li>
  <li className="mb-2">
    <a href="https://preppal.club/e-paper/Design-a-comprehensive-test-on-Laws-of-Motion-and-Gravitation-for-in-depth-learning." target="_blank" className="hover:underline">
      Design a comprehensive test on Laws of Motion and Gravitation for in-depth learning.
    </a>
  </li>
  <li className="mb-2">
    <a href="https://preppal.club/e-paper/Generate-a-test-on-Algebraic-Expressions-and-Identities-for-a-strong-grasp-of-the-topic." target="_blank" className="hover:underline">
      Generate a test on Algebraic Expressions and Identities for a strong grasp of the topic.
    </a>
  </li>
  <li className="mb-2">
    <a href="https://preppal.club/e-paper/Prepare-a-quiz-on-Reflection-and-Refraction-of-Light-to-test-your-conceptual-knowledge." target="_blank" className="hover:underline">
      Prepare a quiz on Reflection and Refraction of Light to test your conceptual knowledge.
    </a>
  </li>
  <li className="mb-2">
    <a href="https://preppal.club/e-paper/Design-a-test-on-Circles-and-Their-Properties-for-developing-a-solid-foundation-in-geometry." target="_blank" className="hover:underline">
      Design a test on Circles and Their Properties for developing a solid foundation in geometry.
    </a>
  </li>
  <li className="mb-2">
    <a href="https://preppal.club/e-paper/Create-a-problem-paper-set-on-Coordinate-Geometry-to-master-spatial-relationships." target="_blank" className="hover:underline">
      Create a problem paper set on Coordinate Geometry to master spatial relationships.
    </a>
  </li>
  <li className="mb-2">
    <a href="https://preppal.club/e-paper/Generate-a-quiz-on-Exponents-and-Radicals-to-enhance-your-understanding-of-powers-and-roots." target="_blank" className="hover:underline">
      Generate a quiz on Exponents to enhance your understanding of powers and roots.
    </a>
  </li>
</ul>


          </div>

  
          <div >
<hr className='mb-4 mt-4 text-2xl font-bold tracking-tight text-gray-900 block lg:hidden'/>

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
            
           

<hr className='my-[1.5rem] text-2xl font-bold tracking-tight text-gray-900'/>

              <div className="text-2xl mb-[1.5rem] font-bold tracking-tight text-gray-900">
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