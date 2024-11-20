'use client'
import { Banner } from '@/components/Banner'
import React,{useEffect,useState} from 'react'
import { FaPen } from 'react-icons/fa'
import axios from 'axios'
import { FaChartBar, FaClipboardList, FaClipboardCheck } from 'react-icons/fa'
import CustomCardLoader from '@/components/CustomCardLoader';
import { FilterLoader } from '@/data/data';
import { Bar } from 'react-chartjs-2'
import { useRouter } from 'next/navigation';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js'
  import { userProfile,setUserProfile,userProfileLoading } from '@/data/functions'

  ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)
 const ProfileUser = () => {
  const [aboutData, setAboutData] = useState({ about: " " });
  const [usernameData, setUsernameData] = useState({ username: "" });
  const [addressData,setAddressData] = useState({address : ""})
  const [newAboutData, setNewAboutData] = useState("");
  const [newAddressData, setNewAddressData] = useState("");
  const [newUsernameData, setNewUsernameData] = useState("");
  const [editAboutMode, setEditAboutMode] = useState(false);
  const [editUsernameMode, setEditUsernameMode] = useState(false);
  const [monthData, setMonthData] = useState([]);
const router = useRouter();
const[todayAssesment, setTodayAssesment]    = useState(0);
const[user, setUser] = useState(null);
const [loading, setLoading] = useState<boolean>(true);
const userId = userProfile?._id ?? null; 
const [showAll, setShowAll] = useState(false);
const [loadingUserData, setLoadingUserData] = useState();
const toggleShowAll = () => {
  setShowAll(!showAll);
};


useEffect(() => {
  if (userId) {
    axios.put(`${process.env.NEXT_PUBLIC_API_URI}/users/about/${userId}`)
      .then(response => {
      
        setAboutData(response.data)
        setUsernameData(response.data)
        setAddressData(response.data);
        setLoading(false)
      })
      .catch(error => console.error('Error fetching about data:', error))
  }
}, [userId])
const [barData, setBarData] = useState({
  labels: [],
  datasets: [{
    // label: 'Lines of Code',
    data: [],
    backgroundColor: 'rgba(54, 162, 235, 0.6)',
    borderColor: 'rgba(54, 162, 235, 1)',
    borderWidth: 1,
  }],
})
    

const barOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
      y: {
          beginAtZero: true,
          title: {
              display: true,
              // text: 'Lines of Code',
          },
          ticks: {
            stepSize: 1, // Ensure values are shown in steps of 1
            callback: function (value: any) {
              return Number.isInteger(value) ? value : null; // Show only integers
            },
          },
        
      },
      x: {
          title: {
              display: true,
              text: 'Months',
          },
      },
  },
  plugins: {
      legend: {
          display: false
      }
  }
};


      

      const [statisticsData, setStatisticsData] = useState({
        projectView: 0,
        totalInterview: 0,
        totalProblemSolved: 0,
      });
      useEffect(()=>{
        axios.get(`${process.env.NEXT_PUBLIC_API_URI}/users/statistics`)
        .then((response)=>{
          setStatisticsData(response.data)
        }) .catch((error) => {
          console.error('Error fetching about data:', error);
        });
      },[])


  

   
function isCreatedAtToday(createdAt:any) {
  console.log("createdAt", createdAt)
  const today = new Date();
  const todayStr = today.toISOString().split('T')[0];
  const createdAtDate = new Date(createdAt);   
  const createdAtStr = createdAtDate.toISOString().split('T')[0];   
  return todayStr === createdAtStr;
}
 





      const [profile, setProfile] = useState<any[]>([]); 
   
      const name = userProfile?.username ?? null;
      console.log(userId)
      useEffect(() => {
        if (!userId) return; // Avoid API call until userId is available
    
        const fetchProfileData = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URI}/users/assesments/${userId}`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                });
                const data = await response.json();
                
                setProfile(data.userAssesments); 

                const monthCounts = new Map();
                data.userAssesments.forEach(assessment => {
                    const date = new Date(assessment.createdAt);
                    const month = date.toLocaleString('default', { month: 'short' });
    
                    monthCounts.set(month, (monthCounts.get(month) || 0) + 1);
                });
                const monthOrder = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

                // Normalize the month names in the monthCounts to ensure consistency
                const normalizedMonthCounts = Array.from(monthCounts, ([month, count]) => {
                    // Normalize months like 'Sept' to 'Sep'
                    const normalizedMonth = month === 'Sept' ? 'Sep' : month;
                    return { month: normalizedMonth, count };
                });
        
                // Sort the monthDataArray based on the index in monthOrder
                const monthDataArray = normalizedMonthCounts.sort((a, b) => monthOrder.indexOf(a.month) - monthOrder.indexOf(b.month));
                
                setMonthData(monthDataArray);
    
               
setLoading(false)
                let val = 0;
                
        data.userAssesments.forEach((assessment: any) => {
          // Check if the assessment was created today
          if (isCreatedAtToday(assessment.createdAt)) {
            val++;
          }

         
        });
             

 
          
                  setTodayAssesment(val);
           
            } catch (error) {
                console.error("Error fetching history data:", error);
            }
        };
  
        fetchProfileData();  
    }, [userId]);  
    const totalAssessments = profile.length


    // const goTOResult = (id:string,)=>{
    //   router.push(`/result-screen?id=${encodeURIComponent(id)}`);
    // }

    const goTOResult = (id: string, title: string) => {
      router.push(`/result-screen?id=${encodeURIComponent(id)}&title=${encodeURIComponent(title)}`);
    };
    
    
    useEffect(() => {
      setBarData({
        labels: monthData.map(item => item.month),
        datasets: [
          {
            // label: 'Lines of Code',
            data: monthData.map(item => item.count),
            backgroundColor: 'rgba(54, 162, 235, 0.6)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
          },
        ],
      });
    }, [monthData]);
   
   
    const handleSaveAbout = () => {
      if (userId && newAboutData.trim()) {
        setLoading(true)
        axios.put(`${process.env.NEXT_PUBLIC_API_URI}/users/about/${userId}`, { about: newAboutData.trim() })
          .then(response => {
            setAboutData(response.data)
            setEditAboutMode(false)
            setLoading(false)
          })
          .catch(error => console.error('Error saving about data:', error))
      } else {
        alert('Please enter valid about data')
      }
    }
  
   
    const handleSaveData = () => {
      if (userId && (newUsernameData.trim() || newAddressData.trim())) {
        setLoading(true)
        axios
          .put(`${process.env.NEXT_PUBLIC_API_URI}/users/about/${userId}`, {
            username: newUsernameData?.trim() || "",
            address: newAddressData?.trim() || "",
          })
          .then(response => {
            setUsernameData(response.data)
            setAddressData(response.data)
            setEditUsernameMode(false)
            setLoading(false)
          })
          .catch(error => console.error('Error saving user data:', error))
      } else {
        alert('Please enter valid username and address')
      }
    }
  
    const handleEditUsername = () => {
      setNewUsernameData(usernameData.username);  
      setNewAddressData(addressData.address);
      setEditUsernameMode(true); 
    };
    
    const handleEditAbout = () => {
      setNewAboutData(aboutData.about);  
      setEditAboutMode(true);  
    };
    
  return (
    <>
    <div className='h-screen overflow-auto'>
      {/* <Banner notMainPage={false} /> */}
      <Banner notMainPage={true} loadingUserData={loadingUserData}/>
      <div className="bg-white min-h-screen p-4">
        <div className=" mx-auto py-8 px-4 pb-24">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            
            <div className="col-span-1 md:col-span-3">
              <div className="grid grid-cols-1 gap-6">
   
              {loading ? (
                  <div className="bg-gray-100 rounded-lg shadow-lg p-4 text-center flex items-center">
                  <CustomCardLoader viewBox="0 0 380 350" className="text-3xl text-gray-700" rectW="100%" rectH="310" />
                </div>
                ) : (
                <div className="bg-gray-100 rounded-lg shadow-lg p-6 relative">
                <button className="absolute top-3 right-3 text-gray-500 hover:text-blue-500" onClick={handleEditUsername}>
                    <FaPen className="h-4 w-4" />
                  </button>
                  <div className="text-center">
                    <img src="/assets/profileImage.jpg" alt="Profile" className="w-24 h-24 mx-auto rounded-full" />
                    {editUsernameMode ? (
                        <div>
                          <input
                            type="text"
                            className="w-full p-1 pl-2 mt-2 text-sm border border-gray-300 rounded-lg"
                            value={newUsernameData}  
                            onChange={(e) => setNewUsernameData(e.target.value)}
                          />
                          <input
                              type="text"
                              className="w-full p-1 pl-2 text-sm mt-2 border border-gray-300 rounded-lg"
                              value={newAddressData}
                              onChange={(e) => setNewAddressData(e.target.value)}
                              placeholder="Enter new address"
                            />
                          <div className="mt-4">
                            <button
                              className="bg-blue-500 text-white py-1 px-4 rounded-md text-sm"
                              onClick={handleSaveData}
                            >
                              Save
                            </button>
                            <button
                              className="ml-2 bg-gray-300 text-gray-700 py-1 px-4 rounded-md text-sm"
                              onClick={() => setEditUsernameMode(false)}  // Cancel edit
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                    ) : (
                      <>
                  <h2 className="text-md font-semibold mt-4">{usernameData.username || 'Default Username'}</h2>
                  <p className="text-gray-500 text-sm">{addressData.address || 'Default Address'}</p>
                  </>
                  )}
                  
                    
                    {/* <div className="mt-4">
                      <button className="bg-blue-500 text-white py-2 px-4 rounded-lg">Connect</button>
                      <button className="ml-2 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg">Message</button>
                    </div> */}
                  </div>
                  {/* <div className="flex justify-around mt-6">
                    <div>
                      <p className="text-md font-bold">{aboutData.class}</p>
                      <p className="text-gray-500 text-md">Class</p>
                    </div>
                   
                    <div>
                      <p className="text-md font-bold">{aboutData.preparation}</p>
                      <p className="text-gray-500 text-md">Preparing For</p>
                    </div>
                  </div> */}
                </div>
                  )}
           
           {loading ? (
                <div className="bg-gray-100 rounded-lg shadow-lg p-4 text-center flex items-center">
                <CustomCardLoader viewBox="0 0 380 200" className="text-3xl text-gray-700" rectW="100%" rectH="200" />
              </div>
                ) : (
                <div className="bg-gray-100 rounded-lg shadow-lg p-6 relative">
                <button className="absolute top-3 right-3 text-gray-500 hover:text-blue-500"   onClick={handleEditAbout}>
                    <FaPen className="h-4 w-4" />
                  </button>
                  <h3 className="text-md font-semibold text-center mb-4">About Me</h3>
                  {editAboutMode ? (
                    <div>
                      <textarea
                        className="w-full p-2 mt-2 border border-gray-300 rounded-lg text-sm"
                         value={newAboutData}
                         placeholder='Write something about yourself...'
                         onChange={(e) => setNewAboutData(e.target.value)}
                        rows={4}
                      />
                      <div className="mt-4">
                      {newAboutData?.trim() && ( // Safe check for undefined
        <button
          className="bg-blue-500 text-white py-1 px-4 rounded-md text-sm"
          onClick={handleSaveAbout}
        >
          Save
        </button>
      )}
                        <button
                          className="ml-2 bg-gray-300 text-gray-700 py-1 px-4 rounded-md text-sm"
                          onClick={() => setEditAboutMode(false)}  // Cancel edit
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-500 text-sm mt-2">{aboutData.about || "This is about section"}</p>
                  )}
                </div>
                 )} 
              </div>
            </div>

           
            <div className="col-span-1 md:col-span-9 space-y-6">

            {loading ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   
                    {/* <div className="bg-gray-100 rounded-lg shadow-lg p-4 text-center flex items-center">
                      <CustomCardLoader viewBox="0 0 380 75" className="text-3xl text-gray-700" rectW="100%" rectH="90" />
                    </div>
                     */}
                    <div className="bg-gray-100 rounded-lg shadow-lg p-4 text-center flex items-center">
                      <CustomCardLoader viewBox="0 0 380 75" className="text-3xl text-gray-700" rectW="100%" rectH="90" />
                    </div>
                    
                    <div className="bg-gray-100 rounded-lg shadow-lg p-4 text-center flex items-center">
                      <CustomCardLoader viewBox="0 0 380 75" className="text-3xl text-gray-700" rectW="100%" rectH="90" />
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Card for Project View */}
                    {/* <div className="bg-gray-100 rounded-lg shadow-lg p-4 text-center flex items-center">
                      <div className="flex items-start mr-5">
                        <FaChartBar className="text-3xl text-gray-700" />
                      </div>
                      <div className="flex flex-col justify-center items-center">
                        <h3 className="text-md font-semibold text-gray-500">Project View</h3>
                        <p className="text-xl font-bold">{statisticsData.projectView}</p>
                      </div>
                    </div> */}

                   
                    <div className="bg-gray-100 rounded-lg shadow-lg p-4 text-center flex items-center">
                      <div className="flex items-start mr-5">
                        <FaClipboardList className="text-3xl text-gray-700" />
                      </div>
                      <div className="flex flex-col justify-center items-center">
                        <h3 className="text-md font-semibold text-gray-500">Total Assessments</h3>
                        <p className="text-xl font-bold">{totalAssessments}</p>
                      </div>
                    </div>

                    {/* Card for Today Assessments */}
                    <div className="bg-gray-100 rounded-lg shadow-lg p-4 text-center flex items-center">
                      <div className="flex items-start mr-5">
                        <FaClipboardCheck className="text-3xl text-gray-700" />
                      </div>
                      <div className="flex flex-col justify-center items-center">
                        <h3 className="text-md font-semibold text-gray-500">Today Assessments</h3>
                        <p className="text-xl font-bold">{todayAssesment}</p>
                      </div>
                    </div>
                  </div>
                )}
           
           {loading ? (
                  <div className="bg-gray-100 rounded-lg shadow-lg p-4 text-center flex items-center">
                  <CustomCardLoader viewBox="0 0 380 100" className="text-3xl text-gray-700" rectW="100%" rectH="310" />
                </div>
                ) : (
              <div className="bg-gray-100 rounded-lg shadow-lg p-6">
                  <h3 className="text-md font-semibold">Total data</h3>
               
                  <div className="mt-4" style={{ height: '200px' }}>
     
                    <Bar data={barData} options={barOptions} />
                  </div>
                
                </div>
                )}


                {loading ? (
                  <div className="bg-gray-100 rounded-lg shadow-lg p-4 text-center flex items-center">
                  <CustomCardLoader viewBox="0 0 380 55" className="text-3xl text-gray-700" rectW="100%" rectH="70" />
                </div>
                ) : (

 <div className="bg-gray-100 rounded-lg shadow-lg p-6"> 
  <h3 className="text-md font-semibold">History</h3>
  <ul className="mt-4">
    {profile && Array.isArray(profile) && profile.length > 0 ? (
      (showAll ? profile : profile.slice(0, 5)).map((job, index) => {
        let correctCount = 0;
        let incorrectCount = 0;
        let notAttemptedCount = 0;
        
         job.questions?.forEach(q => {
          const correctAnswer = q.questionId?.correctAnswer;

       
          console.log("userSelectedans",q.userSelectAns)
          console.log("correctAns",correctAnswer)
          if (!q.userSelectAns || q.userSelectAns === "") {
            notAttemptedCount++;
          } else {
         
            if (q.userSelectAns === correctAnswer) {
              correctCount++;
            } else {
              incorrectCount++;
            }
          }
        });

        const totalQuestions = job.questions?.length || 0;
 
        return (
          <li key={index} className="flex justify-between py-4 text-gray-500 cursor-pointer hover:text-indigo-500 " style={{ borderBottom: '1px solid #e2e2e2' }}>
            <div className="flex flex-col w-full">
              <div className="flex justify-between">
                <span className="text-sm font-medium" onClick={() => goTOResult(job._id, job.paperTitle)}>
                  {job.paperTitle}
                </span>
                <span className="text-sm ">{new Date(job.createdAt).toLocaleDateString()}</span>
              </div>
              
              <div className="flex justify-between mt-1 text-gray-400 text-sm w-60">
  <span>Total- {totalQuestions}</span> |
  <span>Correct- {correctCount}</span> |
  <span>Incorrect- {incorrectCount}</span>
</div>

            </div>
            
          </li>
        );
      })
    ) : (
      <li>No history available</li>
    )}
  </ul>
  {profile && profile.length >5 && (
        <button
          onClick={toggleShowAll}
          className="mt-4 text-indigo-500 font-semibold"
        >
          {showAll ? 'Show Less' : 'View All'}
        </button>
      )}
</div>

                 )} 
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  )
}

export default ProfileUser
