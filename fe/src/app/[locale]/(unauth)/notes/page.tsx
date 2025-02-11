'use client';
import React, { useState, useEffect } from 'react';
import { Banner } from '@/components/Banner';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Footer from '@/components/Footer';
import PreppalFooter from "@/components/PreppalFooter";
// import CustomCardLoader from "@/components/CustomCardLoader";
import SubjectWiseLearning from '@/components/SubjectWiseLearning';


interface Board {
  _id: string;
  name: string;
  image: string;
  color: string;
  publishStatus: string;
}

interface ClassItem {
  _id: string;
  className: string;
  color: string;
  boardIds: {
    _id: string;
    name: string;
  }[];
  publishStatus: string;
}

interface Subject {
  _id: string;
  subjectName: string;
  image: string;
  color: string;
  content: string;
  publishStatus: string;
}

const BoardPage = () => {
  const [selectedBoard, setSelectedBoard] = useState<string | null>(null);
  const [loadingUserData, setLoadingUserData] = useState<boolean>(false);
  const [boards, setBoards] = useState<Board[]>([]);
  const [classes, setClasses] = useState<ClassItem[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [filteredClasses, setFilteredClasses] = useState<ClassItem[]>([]);
  const router = useRouter();
  const boardId = boards.find(cls => cls.name == selectedBoard)?._id
  const classId = classes.find(cls => cls.className === selectedClass)?._id;
  const handleClassClick = (className: string) => {
    setSelectedClass(className);
    const selectedClassObj = classes.find(cls => cls.className === className);
    if (selectedClassObj) {
      sessionStorage.setItem('classId', selectedClassObj._id);
    }
  }
  const handleSubjectClick = (subject: Subject) => {
    if (selectedClass && selectedBoard) {
      setSelectedSubject(subject.subjectName);
      sessionStorage.setItem('subjectId', subject._id);
      sessionStorage.setItem('className', selectedClass);
      sessionStorage.setItem('content', subject.content || '');
      sessionStorage.setItem('boardName', selectedBoard);
      const boardNameFormatted = (selectedBoard ?? "").replace(/\s+/g, '-');
      const classNameFormatted = selectedClass.replace(/\s+/g, '-');
      const subjectNameFormatted = subject.subjectName.replace(/\s+/g, '-');
      router.push(`/${boardNameFormatted}/${classNameFormatted}/${subjectNameFormatted}`);
    } else {
      console.log('No class selected');
    }
  };





  useEffect(() => {
    const fetchBoards = async () => {
      setLoadingUserData(true);
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_Tutor_API_URI}/board/getBoard`);
        const data = await res.json();
        // Filter boards by publishStatus
        const publishedBoards = data.boards.filter((board: Board) => board.publishStatus === 'published');
        setBoards(publishedBoards);

      } catch (error) {
        setLoading(false);
        console.error('Error fetching boards:', error);
      } finally {
        setLoading(false);
        setLoadingUserData(false);
      }
    };

    fetchBoards();
  }, []);


  useEffect(() => {
    const fetchClasses = async () => {

      setLoading(true);
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_Tutor_API_URI}/class/getClass`);
        const data = await res.json();
        // Filter classes by publishStatus
        const publishedClasses = data.classes.filter((cls: ClassItem) => cls.publishStatus === 'published');

        setClasses(publishedClasses);

        if (selectedBoard) {
          const filtered = classes.filter((cls: { boardIds: { _id: string; name: string; }[]; }) =>
            cls.boardIds.some((board: { _id: string; name: string; }) => board._id === selectedBoard || board.name === selectedBoard)
          );

          setFilteredClasses(filtered);
        } else {
          setFilteredClasses(data.classes);
        }
      } catch (error) {
        console.error('Error fetching classes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchClasses();
  }, [selectedBoard]);

  useEffect(() => {
    const fetchSubjects = async () => {
      if (selectedClass) {
        setLoading(true);
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_Tutor_API_URI}/subject/getSubject/?classId=${classId}&boardId=${boardId}`);
          const data = await res.json();
          // Filter subjects by publishStatus
          const publishedSubjects = data.subjects.filter((subject: Subject) => subject.publishStatus === 'published');
          setSubjects(publishedSubjects);
        } catch (error) {
          console.error('Error fetching subjects:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchSubjects();
  }, [selectedClass]);

  const renderNavigation = () => {
    let navigationText = '';
    if (selectedBoard) navigationText += `${selectedBoard} &nbsp; > &nbsp;`;
    if (selectedClass) navigationText += `  ${selectedClass} &nbsp; > &nbsp;`;
    if (selectedSubject) navigationText += ` ${selectedSubject} &nbsp; > &nbsp;`;


    return (
      <div className="text-lg font-medium text-gray-900 mt-4 max-w-6xl mx-auto p-4">
        {selectedBoard && (
          <span>
            <span
              onClick={() => { setSelectedBoard(null); setSelectedClass(null); }}
              className="cursor-pointer hover:underline"
            >
              {selectedBoard} &gt;

            </span>

            {!selectedClass && (
              <span
                onClick={() => { setSelectedBoard(null); setSelectedClass(null); }}
                className="cursor-pointer hover:underline mx-1"
              >
                Change Board
              </span>
            )}
          </span>
        )}

        {selectedClass && (
          <span>
            <span
              onClick={() => { setSelectedClass(null); }}
              className="cursor-pointer hover:underline"
            >
              {selectedClass} &gt;
            </span>
            <span
              onClick={() => setSelectedClass(null)}
              className="cursor-pointer hover:underline mx-1"
            >
              Change Class
            </span>
          </span>
        )}

        {selectedSubject && (
          <span>
            <span className="mx-1">&gt;</span>
            <span className="cursor-pointer">
              {selectedSubject}
            </span>
          </span>
        )}
      </div>


    );
  };
  useEffect(() => {

    sessionStorage.removeItem('boardId');
    sessionStorage.removeItem('boardName')
  }, []);

  return (
    <div className="min-h-screen">
      <Banner notMainPage={true} loadingUserData={loadingUserData} />
      <div className="py-24 mb-7 bg-teal-700 relative overflow-hidden min-h-[400px] flex items-center">
        {/* Left side decorative elements */}
        <div className="absolute left-8 top-12">
          <div className="w-12 h-16 flex items-end">
            <div className="w-4 h-14 bg-pink-400/90 rounded-full relative">
              <div className="absolute -top-2 left-1/2 w-8 h-8 bg-pink-400/90 rounded-full transform -translate-x-1/2"></div>
            </div>
          </div>
        </div>

        {/* Left bottom flower */}
        <div className="absolute left-20 bottom-24">
          <div className="w-10 h-16 flex flex-col items-center">
            <div className="w-8 h-8 bg-purple-300 rounded-full"></div>
            <div className="w-2 h-12 bg-emerald-500 rounded-full"></div>
          </div>
        </div>

        {/* Left tulip flower */}
        <div className="absolute left-4 bottom-32">
          <div className="w-8 h-20 flex flex-col items-center">
            <div className="w-6 h-10 bg-yellow-400 rounded-lg"></div>
            <div className="w-2 h-14 bg-emerald-500 rounded-full"></div>
          </div>
        </div>

        {/* Right top potted plant */}
        <div className="absolute right-8 top-8">
          <div className="w-16 h-20 relative">
            <div className="absolute bottom-0 w-12 h-12 bg-yellow-400 rounded-lg"></div>
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
              <div className="flex gap-1">
                <div className="w-2 h-4 bg-pink-400 rounded-full"></div>
                <div className="w-2 h-6 bg-pink-400 rounded-full"></div>
                <div className="w-2 h-4 bg-pink-400 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Right side flower */}
        <div className="absolute right-24 bottom-28">
          <div className="w-10 h-20 flex flex-col items-center">
            <div className="w-8 h-10 bg-blue-400 rounded-full"></div>
            <div className="w-2 h-14 bg-emerald-500 rounded-full"></div>
          </div>
        </div>

        {/* Floating circles */}
        <div className="absolute right-16 top-24">
          <div className="w-4 h-4 bg-yellow-200 rounded-full"></div>
        </div>
        <div className="absolute right-32 bottom-20">
          <div className="w-3 h-3 bg-white rounded-full"></div>
        </div>
        <div className="absolute left-32 top-20">
          <div className="w-3 h-3 bg-white/70 rounded-full"></div>
        </div>

        <div className="text-center px-4 relative z-10 w-full">
          <h1 className="text-3xl font-extrabold">
            <span className="block tracking-tight text-white text-4xl sm:text-5xl mb-2">
              A garden of knowledge,
            </span>
            <span className="block tracking-tight text-white text-3xl sm:text-4xl">
              you can visit anytime.
            </span>
          </h1>
          <p className="text-white/90 font-light text-lg mt-6 max-w-2xl mx-auto">
            The perfect place for every student to learn and grow.<br />
            Let learning bloom with our guided practice and support.
          </p>

          <button className="mt-8 px-8 py-3 bg-white rounded-full font-medium hover:bg-emerald-50 transition-colors">
            Explore More
          </button>
        </div>

        {/* Bottom wave decoration with softer curve */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0 100C160 60 400 20 720 40C1040 60 1280 80 1440 90V100H0V100Z"
              fill="white"
            />
          </svg>
        </div>

        {/* Background pattern */}
        {/* Bottom wave decoration with softer curve */}
        <div className="absolute bottom-0 left-0 right-0 hidden sm:block">
          <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0 100C160 60 400 20 720 40C1040 60 1280 80 1440 90V100H0V100Z"
              fill="white"
            />
          </svg>
        </div>

      </div>



      <div className="px-4 sm:px-8  mb-8">

        {renderNavigation()}

        {!selectedBoard ? (
          <>
            <div className='mb-16 text-center'>
              <h2 className="text-3xl tracking-tight font-bold text-gray-900">We propose the best boards</h2>
              <p className='text-lg text-gray-500 mt-2'>Choose from India's leading educational boards for your academic excellence</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
              {loading ? (
                // Custom loader for board cards
                Array(6).fill(0).map((_, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center text-center animate-pulse"
                  >
                    {/* Icon Circle Loader */}
                    <div className="w-24 h-24 rounded-full bg-gray-200 mb-4"></div>

                    {/* Text Content Loader */}
                    <div className="space-y-3 w-full">
                      <div className="h-6 bg-gray-200 rounded w-32 mx-auto"></div>
                      <div className="h-4 bg-gray-200 rounded w-48 mx-auto"></div>
                      <div className="h-4 bg-gray-200 rounded w-40 mx-auto"></div>
                    </div>
                  </div>
                ))
              ) : (
                boards.map((board, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      setSelectedBoard(board.name);
                      sessionStorage.setItem('boardId', board._id);
                      sessionStorage.setItem('boardName', board.name)
                    }}
                    className="flex flex-col items-center text-center cursor-pointer group"
                  >
                    {/* Icon Circle */}
                    <div
                      className="w-24 h-24 rounded-full bg-yellow-100 flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
                    >
                      <Image
                        src={`${process.env.NEXT_PUBLIC_IMAGE_URI}${board.image}`}
                        alt={`${board.name} Logo`}
                        className="w-12 h-12 object-contain"
                        width={48}
                        height={48}
                      />
                    </div>

                    {/* Text Content */}
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {board.name}
                    </h3>
                    <p className="text-gray-500 text-sm max-w-xs">
                      Access comprehensive study materials and resources for {board.name} curriculum
                    </p>
                  </div>
                ))
              )}
            </div>
          </>
        ) : null}

        {selectedBoard && !selectedSubject && !selectedClass && (
          <div className="max-w-6xl mx-auto px-4">
            {/* Header Section */}
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900">Class Selection</h2>
              <p className="text-lg text-gray-500 mt-2">
                Choose your class to begin your learning journey
              </p>
            </div>

            {/* Classes Grid or Empty State */}
            {loading ? (
              // Loading skeleton
              Array(6).fill(0).map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="bg-gray-50 rounded-xl p-8 flex flex-col items-center">
                    <div className="w-16 h-16 bg-gray-200 rounded-lg mb-4"></div>
                    <div className="h-5 bg-gray-200 rounded w-24 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-32"></div>
                  </div>
                </div>
              ))
            ) : filteredClasses.length > 0 ? (
              // Existing classes grid
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {filteredClasses.map((classItem, index) => {
                    const bgColors = ['#E8FFF7', '#F5E6FF', '#FFF4E6'];
                    const bgColor = bgColors[index % 3];

                    return (
                      <div
                        key={classItem._id}
                        onClick={() => handleClassClick(classItem.className)}
                        className="bg-opacity-40 rounded-xl p-8 hover:shadow-lg transition-all cursor-pointer group"
                        style={{ backgroundColor: bgColor }}
                      >
                        <div className="flex flex-col items-start">
                          {/* Icon Container */}
                          <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-4">
                            {index % 3 === 0 ? (
                              <svg className="w-4 h-4 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                              </svg>
                            ) : index % 3 === 1 ? (
                              <svg className="w-4 h-4 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                              </svg>
                            ) : (
                              <svg className="w-4 h-4 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            )}
                          </div>

                          {/* Text Content */}
                          <h3 className="text-lg font-medium text-gray-900 mb-2">
                            {classItem.className}
                          </h3>
                          <p className="text-sm text-gray-600 mb-4">
                            {index % 3 === 0
                              ? 'Build strong foundations with interactive learning materials'
                              : index % 3 === 1
                                ? 'Master key concepts with detailed study guides'
                                : 'Prepare thoroughly with practice resources'
                            }
                          </p>

                          {/* Arrow */}
                          <div className="mt-auto">
                            <svg className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                          </div>

                        </div>
                      </div>
                    );
                  })}
                </div>
                {/* Description Section */}
                <div className="mt-12 text-center">
                  <div className="text-gray-500 text-base max-w-6xl mx-auto bg-gray-100 p-6 rounded-lg shadow-md">

                    <p className="mt-2 text-gray-600">
                      Start by selecting a <span className="text-indigo-500 font-medium">class level</span> that best fits your learning journey. Once selected, you can proceed to choose a subject and explore interactive resources.
                      <br />
                      <span className="inline-flex items-center gap-1 text-green-600 font-semibold">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        Personalized Learning Journey
                      </span>
                    </p>

                    <div className="mt-4 flex gap-4">
                      {/* <!-- Class Selection --> */}
                      <div className="flex-1 bg-white p-4 border rounded-lg text-center shadow">
                        <span className="block text-lg font-medium text-indigo-600">🏫 Class Selection</span>
                        <p className="text-gray-500 text-sm mt-1">Choose your class to access relevant subjects and resources.</p>
                      </div>

                      {/* <!-- Subj/ect Selection --> */}
                      <div className="flex-1 bg-white p-4 border rounded-lg text-center shadow">
                        <span className="block text-lg font-medium text-green-600">📚 Subject Selection</span>
                        <p className="text-gray-500 text-sm mt-1">Pick a subject tailored to your interests and learning needs.</p>
                      </div>

                      {/* <!-- Interactive Learning --> */}
                      <div className="flex-1 bg-white p-4 border rounded-lg text-center shadow">
                        <span className="block text-lg font-medium text-blue-600">🚀 Interactive Learning</span>
                        <p className="text-gray-500 text-sm mt-1">Engage with quizzes, videos, and practice exercises.</p>
                      </div>
                    </div>

                    <p className="mt-4 text-gray-600">
                      Need to change your selection? No worries! You can always come back and update your choices.
                      <span className="text-indigo-600 font-medium">Your learning journey starts here! 🚀</span>
                    </p>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-3 px-4">
                <div className="max-w-md mx-auto">
                  {/* Illustration */}
                  <div className="mb-8 relative">
                    <div className="w-32 h-32 bg-teal-100 rounded-full mx-auto flex items-center justify-center">
                      <svg className="w-16 h-16 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                    {/* Decorative elements */}
                    <div className="absolute top-0 left-1/2 -translate-x-20 w-4 h-4 bg-yellow-200 rounded-full"></div>
                    <div className="absolute bottom-0 right-1/2 translate-x-24 w-6 h-6 bg-purple-200 rounded-full"></div>
                  </div>

                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    No Classes Available Yet
                  </h3>

                  <p className="text-gray-600 mb-6">
                    We're currently working on adding classes for {selectedBoard}.
                    Check back soon or explore other boards!
                  </p>

                  {/* Action Cards */}
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="p-4 bg-white rounded-lg border border-gray-200 text-center">
                      <span className="block text-2xl mb-2">🎯</span>
                      <h4 className="font-medium text-gray-900">Coming Soon</h4>
                      <p className="text-sm text-gray-500">New classes being added</p>
                    </div>
                    <div className="p-4 bg-white rounded-lg border border-gray-200 text-center">
                      <span className="block text-2xl mb-2">📚</span>
                      <h4 className="font-medium text-gray-900">Stay Tuned</h4>
                      <p className="text-sm text-gray-500">More content on the way</p>
                    </div>
                  </div>

                  {/* Action Button */}
                  <button
                    onClick={() => setSelectedBoard(null)}
                    className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 transition-colors"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Explore Other Boards
                  </button>
                </div>
              </div>
            )}


          </div>
        )}
        {selectedBoard && !selectedSubject && !selectedClass && filteredClasses.length === 0 && (
          <SubjectWiseLearning
            selectedClass={selectedClass}
            classes={classes}
            loading={loading}
          />
        )}


        {selectedBoard && selectedClass && !selectedSubject && (
          <div className="max-w-6xl mx-auto px-4">
            {/* Header Section */}
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900">Subject Selection</h2>
              <p className="text-lg text-gray-500 mt-2">
                Choose a subject to start your learning journey
              </p>
            </div>

            {/* Subjects Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {loading ? (
                // Loading skeleton
                Array(6).fill(0).map((_, index) => (
                  <div key={index} className="animate-pulse">
                    <div className="bg-gray-50 rounded-xl p-6 flex flex-col items-start">
                      <div className="w-12 h-12 bg-gray-200 rounded-lg mb-4"></div>
                      <div className="h-5 bg-gray-200 rounded w-24 mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-32 mb-4"></div>
                      <div className="h-4 bg-gray-200 rounded w-5"></div>
                    </div>
                  </div>
                ))
              ) : (
                subjects.map((subject) => (
                  <div
                    key={subject._id}
                    onClick={() => handleSubjectClick(subject)}
                    className="p-6 rounded-xl cursor-pointer transition-all hover:shadow-md group border border-teal-300"
                    style={{ backgroundColor: '#F8F9FC' }}
                  >
                    <div className="flex flex-col items-start h-full">
                      {/* Icon */}
                      <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                        <img
                          src={`${process.env.NEXT_PUBLIC_IMAGE_URI}${subject.image}`}
                          alt={subject.subjectName}
                          className="w-8 h-8 object-contain"
                        />
                      </div>

                      {/* Title */}
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        {subject.subjectName}
                      </h3>

                      {/* Description based on subject */}
                      <p className="text-sm text-gray-600 mb-4">
                        {subject.subjectName.toLowerCase().includes('math')
                          ? 'Master mathematical concepts through step-by-step solutions'
                          : subject.subjectName.toLowerCase().includes('science')
                            ? 'Explore scientific concepts with interactive lessons'
                            : subject.subjectName.toLowerCase().includes('english')
                              ? 'Enhance language skills with comprehensive materials'
                              : subject.subjectName.toLowerCase().includes('social')
                                ? 'Discover history and civics through engaging content'
                                : 'Access comprehensive study materials and resources'
                        }
                      </p>

                      {/* Features list */}
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-sm text-gray-500">
                          <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Interactive lessons
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Practice exercises
                        </div>
                      </div>

                      {/* Arrow */}
                      <div className="mt-auto">
                        <svg className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>


          </div>
        )}

      </div>

      <PreppalFooter />
      <Footer />
    </div>
  );
};

export default BoardPage;
