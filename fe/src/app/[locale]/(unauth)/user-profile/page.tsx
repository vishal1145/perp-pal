"use client";
import axios from "axios";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { FaPen } from "react-icons/fa";
import { FaClipboardCheck, FaClipboardList } from "react-icons/fa";

import { Banner } from "@/components/Banner";
import CustomCardLoader from "@/components/CustomCardLoader";
import { setUserProfile, userProfile } from "@/data/functions";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
const ProfileUser = () => {
  const [aboutData, setAboutData] = useState({ about: " " });
  const [usernameData, setUsernameData] = useState({ username: "" });
  const [profileImage, setProfileImage] = useState<string|null>(null);


  const [addressData, setAddressData] = useState({ address: "" });
  const [newAboutData, setNewAboutData] = useState<string>("");

  const [newAddressData, setNewAddressData] = useState("");
  const [newUsernameData, setNewUsernameData] = useState("");
  const [editAboutMode, setEditAboutMode] = useState(false);
  const [editUsernameMode, setEditUsernameMode] = useState(false);
  const [monthData, setMonthData] = useState([]);
  const router = useRouter();
  const [todayAssesment, setTodayAssesment] = useState(0);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState<boolean>(true);
  const userId = userProfile?._id ?? null;
  console.log("useerid", userId);
  const [showAll, setShowAll] = useState(false);
  const [loadingUserData, setLoadingUserData] = useState();
  const [file, setFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  const [imageUrl, setImageUrl] = useState(
    `/assets/profileImage/profileImage_${userId}.png`
  );

  const notEditUserData = ()=>{
     setEditUsernameMode(false)  ;
     setImagePreview(null);
     setFile(null);
  }

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  useEffect(() => {
    if (userId) {
      axios
        .put(`${process.env.NEXT_PUBLIC_API_URI}/users/about/${userId}`)
        .then((response) => {
          setAboutData(response.data);
          setUsernameData(response.data);
          setAddressData(response.data);
          setLoading(false);
        })
        .catch((error) => console.error("Error fetching about data:", error));
    }
  }, [userId]);
  const [barData, setBarData] = useState({
    labels: [],
    datasets: [
      {
        // label: 'Lines of Code',
        data: [],
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  });

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
        },
        ticks: {
          stepSize: 1,
          callback: function (value: any) {
            return Number.isInteger(value) ? value : null;
          },
        },
      },
      x: {
        title: {
          display: true,
          text: "Months",
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const [statisticsData, setStatisticsData] = useState({
    projectView: 0,
    totalInterview: 0,
    totalProblemSolved: 0,
  });
  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URI}/users/statistics`)
      .then((response) => {
        setStatisticsData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching about data:", error);
      });
  }, []);

  function isCreatedAtToday(createdAt: any) {
    console.log("createdAt", createdAt);
    const today = new Date();
    const todayStr = today.toISOString().split("T")[0];
    const createdAtDate = new Date(createdAt);
    const createdAtStr = createdAtDate.toISOString().split("T")[0];
    return todayStr === createdAtStr;
  }
  const [profile, setProfile] = useState<any[]>([]);

  const name = userProfile?.username ?? null;
  console.log(userId);
  useEffect(() => {
    if (!userId) return; // Avoid API call until userId is available

    const fetchProfileData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URI}/users/assesments/${userId}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );
        const data = await response.json();

        setProfile(data.userAssesments);

        const monthCounts = new Map();
        data.userAssesments.forEach((assessment) => {
          const date = new Date(assessment.createdAt);
          const month = date.toLocaleString("default", { month: "short" });

          monthCounts.set(month, (monthCounts.get(month) || 0) + 1);
        });
        const monthOrder = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ];

        // Normalize the month names in the monthCounts to ensure consistency
        const normalizedMonthCounts = Array.from(
          monthCounts,
          ([month, count]) => {
            // Normalize months like 'Sept' to 'Sep'
            const normalizedMonth = month === "Sept" ? "Sep" : month;
            return { month: normalizedMonth, count };
          }
        );

        // Sort the monthDataArray based on the index in monthOrder
        const monthDataArray = normalizedMonthCounts.sort(
          (a, b) => monthOrder.indexOf(a.month) - monthOrder.indexOf(b.month)
        );

        setMonthData(monthDataArray);

        setLoading(false);
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
  const totalAssessments = profile.length;

  // const goTOResult = (id:string,)=>{
  //   router.push(`/result-screen?id=${encodeURIComponent(id)}`);
  // }

  const goTOResult = (id: string, title: string) => {
    router.push(
      `/result-screen?id=${encodeURIComponent(id)}&title=${encodeURIComponent(title)}`
    );
  };

  useEffect(() => {
    setBarData({
      labels: monthData.map((item) => item.month),
      datasets: [
        {
          // label: 'Lines of Code',
          data: monthData.map((item) => item.count),
          backgroundColor: "rgba(54, 162, 235, 0.6)",
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 1,
        },
      ],
    });
  }, [monthData]);

  const handleSaveAbout = () => {
    const aboutToSave =
      newAboutData.trim() === ""
        ? "This is about section"
        : newAboutData.trim();

    if (userId && aboutToSave) {
      setLoading(true);
      axios
        .put(`${process.env.NEXT_PUBLIC_API_URI}/users/about/${userId}`, {
          about: aboutToSave,
        })
        .then((response) => {
          setAboutData(response.data);
          setEditAboutMode(false);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error saving about data:", error);
          setLoading(false);
        });
    } else {
      alert("Please enter valid about data");
    }
  };

  const handleSaveData = () => {
    if (file) {
      profileImageUpdate(file); // Ensure 'e' is passed properly here
    }
    if (userId && (newUsernameData.trim() || newAddressData.trim())) {
      setLoading(true);

      axios
        .put(`${process.env.NEXT_PUBLIC_API_URI}/users/about/${userId}`, {
          username: newUsernameData?.trim() || "",
          address: newAddressData?.trim() || "",
        })
        .then((response) => {
          setUserProfile(response.data);
          setUsernameData(response.data);
          setAddressData(response.data);
          setEditUsernameMode(false);
          setLoading(false);
        })
        .catch((error) => console.error("Error saving user data:", error));
    } else {
      alert("Please enter valid username and address");
    }
  };

  const handleEditUsername = () => {
    setNewUsernameData(usernameData.username);
    setNewAddressData(addressData.address);
    setEditUsernameMode(true);
  };

  const handleEditAbout = () => {
    setNewAboutData(aboutData.about);
    setEditAboutMode(true);
  };


  const imageChange = (e)=>{
    const file = e?.target?.files?.[0];
    if (!file) return;
    setFile(file);
    setImagePreview(URL.createObjectURL(file));
  }

  const profileImageUpdate = async ( ) => {
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("userId", userId); // Pass the userId to the backend

    setUploading(true);

    try {
      const response = await axios.post("/api/users/userprofile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        setImageUrl(`/assets/profileImage/profileImage_${userId}.png`);
        setProfileImage(imagePreview);
        setImagePreview(null);
        setFile(null);
      } else {
        alert(response.data.error || "Failed to upload image.");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Error uploading image.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      <Banner notMainPage={true} loadingUserData={loadingUserData} />
      {/* <Banner notMainPage={false} /> */}
      <div className="bg-white">
        <div className="container mx-auto px-3 py-4">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
            <div className="col-span-1 md:col-span-3">
              <div className="grid grid-cols-1 gap-6">
                {loading ? (
                  <div className="flex items-center rounded-lg bg-gray-100 p-4 text-center shadow-lg">
                    <CustomCardLoader
                      viewBox="0 0 380 350"
                      className="text-3xl text-gray-700"
                      rectW="100%"
                      rectH="380"
                    />
                  </div>
                ) : (
                  <div className="relative rounded-lg bg-gray-100 p-6 shadow-lg">
                    <button
                      type="button"
                      className="absolute right-3 top-3 text-gray-500 hover:text-blue-500"
                      onClick={handleEditUsername}
                    >
                      <FaPen className="size-4" />
                    </button>
                    <div className="text-center">
                   
            
 
                    <img
  src={
    profileImage != null
      ? profileImage
      : userProfile?.profileImage == null
      ? "/assets/profileImage.jpg" :
      userProfile.profileImage.startsWith("p")
      ? `${userProfile.profileImage.substring(6)}`
      : userProfile.profileImage
  }
  alt="Profile"
  className="mx-auto w-24 h-24 rounded-full"
/>

 
 

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

                          <div
                            style={{
                              display: "flex",
                              justifyContent: "flex-start",
                              gap: "8px", // You can adjust the gap between elements
                              marginTop: "8px",
                              flexDirection: "column", // Arrange items vertically
                              alignItems: "center", // Center the items horizontally
                            }}
                          >
                            <input
                              className="w-full p-1 pl-2 text-sm"
                              type="file"
                              accept="image/*"
                              onChange={(e) => imageChange(e)}
                              disabled={uploading} // Disable input while uploading
                            />
                            <label
                              htmlFor="fileInput"
                              className="cursor-pointer"
                            >
                              <img
                                src={
                                  imagePreview ? imagePreview : "/assets/profileImage.jpg"
                                }
                                alt="Profile pic"
                                className="w-10 h-10 mx-auto rounded-full"
                              />
                            </label>
                            <div className="text-sm text-center">
                              Update image
                            </div>
                          </div>
                          <div className="mt-4">
                            <button
                              type="button"
                              className="rounded-md bg-cyan-600 px-4 py-1 text-sm text-white"
                              onClick={handleSaveData}
                            >
                              Save
                            </button>
                            <button
                              type="button"
                              className="ml-2 rounded-md bg-gray-300 px-4 py-1 text-sm text-gray-700"
                              onClick={notEditUserData} // Cancel edit
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <h2 className="text-md mt-4 font-semibold">
                            {usernameData.username || "Default Username"}
                          </h2>
                          <p className="text-sm text-gray-500">
                            {addressData.address || "Default Address"}
                          </p>
                        </>
                      )}
 
                    </div>
                   
                  </div>
                )}

                {loading ? (
                  <div className="flex items-center rounded-lg bg-gray-100 p-4 text-center shadow-lg">
                    <CustomCardLoader
                      viewBox="0 0 380 200"
                      className="text-3xl text-gray-700"
                      rectW="100%"
                      rectH="200"
                    />
                  </div>
                ) : (
                  <div className="relative rounded-lg bg-gray-100 p-6 shadow-lg">
                    <button
                      type="button"
                      className="absolute right-3 top-3 text-gray-500 hover:text-cyan-600"
                      onClick={handleEditAbout}
                    >
                      <FaPen className="size-4" />
                    </button>
                    <h3 className="text-md mb-4 text-center font-semibold">
                      About Me
                    </h3>
                    {editAboutMode ? (
                      <div>
                        <textarea
                          className="mt-2 w-full rounded-lg border border-gray-300 p-2 text-sm"
                          value={newAboutData}
                          placeholder="Write something about yourself..."
                          onChange={(e) => setNewAboutData(e.target.value)}
                          rows={4}
                        />
                        <div className="mt-4">
                          {/* {newAboutData?.trim() && ( // Safe check for undefined */}
                          <button
                            type="button"
                            className="rounded-md bg-cyan-600 px-4 py-1 text-sm text-white"
                            onClick={handleSaveAbout}
                          >
                            Save
                          </button>
                          {/* )} */}
                          <button
                            type="button"
                            className="ml-2 rounded-md bg-gray-300 px-4 py-1 text-sm text-gray-700"
                            onClick={() => setEditAboutMode(false)} // Cancel edit
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <p className="mt-2 text-sm text-gray-500">
                        {aboutData.about || "This is about section"}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="col-span-1 space-y-6 md:col-span-9">
              {loading ? (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {/* <div className="bg-gray-100 rounded-lg shadow-lg p-4 text-center flex items-center">
                      <CustomCardLoader viewBox="0 0 380 75" className="text-3xl text-gray-700" rectW="100%" rectH="90" />
                    </div>
                     */}
                  <div className="flex items-center rounded-lg bg-gray-100 p-4 text-center shadow-lg">
                    <CustomCardLoader
                      viewBox="0 0 380 75"
                      className="text-3xl text-gray-700"
                      rectW="100%"
                      rectH="90"
                    />
                  </div>

                  <div className="flex items-center rounded-lg bg-gray-100 p-4 text-center shadow-lg">
                    <CustomCardLoader
                      viewBox="0 0 380 75"
                      className="text-3xl text-gray-700"
                      rectW="100%"
                      rectH="90"
                    />
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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

                  <div className="flex items-center rounded-lg bg-gray-100 p-4 text-center shadow-lg">
                    <div className="mr-5 flex items-start">
                      <FaClipboardList className="text-3xl text-gray-700" />
                    </div>
                    <div className="flex flex-col items-center justify-center">
                      <h3 className="text-md font-semibold text-gray-500">
                        Total Assessments
                      </h3>
                      <p className="text-xl font-bold">{totalAssessments}</p>
                    </div>
                  </div>

                  {/* Card for Today Assessments */}
                  <div className="flex items-center rounded-lg bg-gray-100 p-4 text-center shadow-lg">
                    <div className="mr-5 flex items-start">
                      <FaClipboardCheck className="text-3xl text-gray-700" />
                    </div>
                    <div className="flex flex-col items-center justify-center">
                      <h3 className="text-md font-semibold text-gray-500">
                        Today Assessments
                      </h3>
                      <p className="text-xl font-bold">{todayAssesment}</p>
                    </div>
                  </div>
                </div>
              )}

              {loading ? (
                <div className="flex items-center rounded-lg bg-gray-100 p-4 text-center shadow-lg">
                  <CustomCardLoader
                    viewBox="0 0 380 100"
                    className="text-3xl text-gray-700"
                    rectW="100%"
                    rectH="310"
                  />
                </div>
              ) : (
                <div className="rounded-lg bg-gray-100 p-6 shadow-lg">
                  <h3 className="text-md font-semibold">Total data</h3>

                  <div className="mt-4" style={{ height: "200px" }}>
                    <Bar data={barData} options={barOptions} />
                  </div>
                </div>
              )}

              {loading ? (
                <div className="flex items-center rounded-lg bg-gray-100 p-4 text-center shadow-lg">
                  <CustomCardLoader
                    viewBox="0 0 380 55"
                    className="text-3xl text-gray-700"
                    rectW="100%"
                    rectH="70"
                  />
                </div>
              ) : (
                <div className="rounded-lg bg-gray-100 p-6 shadow-lg">
                  <h3 className="text-md font-semibold">History</h3>
                  <ul className="mt-4">
                    {profile && Array.isArray(profile) && profile.length > 0 ? (
                      (showAll ? profile : profile.slice(0, 5)).map(
                        (job, index) => {
                          let correctCount = 0;
                          let incorrectCount = 0;
                          let notAttemptedCount = 0;

                          job.questions?.forEach((q) => {
                            const answer = q.questionId?.answer; 
                            if (!q.userSelectAns || q.userSelectAns === "") {
                              notAttemptedCount++;
                            } else {
                              if (q.userSelectAns === answer) {
                                correctCount++;
                              } else {
                                incorrectCount++;
                              }
                            }
                          });

                          const totalQuestions = job.questions?.length || 0;

                          return (
                            <li
                              key={index}
                              className="flex justify-between py-4 text-gray-500 cursor-pointer hover:text-cyan-600 "
                              style={{ borderBottom: "1px solid #e2e2e2" }}
                            >
                              <div className="flex flex-col w-full">
                                <div className="flex justify-between">
                                  <span
                                    className="text-sm font-medium"
                                    onClick={() =>
                                      goTOResult(job._id, job.paperTitle)
                                    }
                                  >
                                    {job.paperTitle}
                                  </span>
                                  <span className="text-sm ">
                                    {new Date(
                                      job.createdAt
                                    ).toLocaleDateString()}
                                  </span>
                                </div>

                                <div className="flex justify-between mt-1 text-gray-400 text-sm w-60">
                                  <span>Total- {totalQuestions}</span> |
                                  <span>Correct- {correctCount}</span> |
                                  <span>Incorrect- {incorrectCount}</span>
                                </div>
                              </div>
                            </li>
                          );
                        }
                      )
                    ) : (
                      <li>No history available</li>
                    )}
                  </ul>
                  {profile && profile.length > 5 && (
                    <button
                      type="button"
                      onClick={toggleShowAll}
                      className="mt-4 font-semibold text-cyan-600"
                    >
                      {showAll ? "Show Less" : "View All"}
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileUser;