'use client';
import React, { useState, useEffect } from 'react';
import { Banner } from '@/components/Banner';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Footer from '@/components/Footer';
import PreppalFooter from "@/components/PreppalFooter";
import CustomCardLoader from "@/components/CustomCardLoader";
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
      <div className="text-lg font-medium text-gray-900 mt-4">
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
      <div className="py-14 mb-7 bg-[#B3EFFF]">

        <div className="text-center  px-4">
          <h1 className="text-3xl font-extrabold text-white">
            <span className="block  tracking-tight text-cyan-400 text-4xl sm:text-5xl">
              India’s Trusted Platform
            </span>
            <span className="block tracking-tight font-extrabold text-gray-900 text-3xl sm:text-4xl mt-1">
              for Doubt Solving & Practice
            </span>
          </h1>
          <p className=" text-gray-900 font-light text-lg mt-4">Unlock the best learning experience with tailored practice questions.<br />Join thousands of students achieving academic excellence</p>
        </div>

      </div>



      <div className="px-4 sm:px-8  mb-8">

        {renderNavigation()}

        {loading && !selectedBoard ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {Array(5)
              .fill(0)
              .map((_, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center rounded-lg bg-gray-100 p-4 text-center shadow-lg"
                >
                  <CustomCardLoader
                    className=''
                    viewBox="0 0 100 50"
                    rectW="90%"
                    rectH="90"
                  />
                </div>
              ))}
          </div>
        ) : !selectedBoard ? (
          <>
            <div className='mb-6'>
              <h1 className="text-3xl tracking-tight font-extrabold text-gray-900 text-center">Select Your Boards</h1>
              <p className='text-xl text-gray-500 text-center font-light'>Choose from india's leading educational board</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center">
              {boards.map((board, index) => (
                <div
                  key={index}
                  onClick={() => {
                    setSelectedBoard(board.name);
                    sessionStorage.setItem('boardId', board._id);
                    sessionStorage.setItem('boardName', board.name)
                  }}
                  className="relative cursor-pointer p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 mb-8"
                  style={{
                    backgroundImage: `url('/print_icon.png')`,
                    backgroundColor: board.color,
                    backgroundRepeat: 'repeat',
                    backgroundSize: '30px 30px',
                    backgroundPosition: 'center',
                  }}
                >

                  <div className="absolute inset-0 bg-black bg-opacity-30 rounded-xl"></div>

                  <div className="relative flex flex-col items-center justify-center">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_IMAGE_URI}${board.image}`}
                      alt={`${board.name} Logo`}
                      className="w-20 h-20 object-contain"
                      width={80}
                      height={80}
                    />

                    <h2 className="text-xl font-bold text-white text-center mt-4">
                      {board.name}
                    </h2>
                  </div>
                </div>
              ))}

            </div>


          </>
        ) : null}

        {selectedBoard && !selectedSubject && !selectedClass && (
          <div>
            <div className="flex flex-wrap gap-4 mt-3 w-full ">
              {filteredClasses.map((classItem) => (
                <div
                  key={classItem._id}
                  onClick={() => handleClassClick(classItem.className)}
                  style={{
                    backgroundImage: classItem.color.startsWith("linear-gradient")
                      ? classItem.color
                      : undefined,
                    backgroundColor: !classItem.color.startsWith("linear-gradient")
                      ? classItem.color
                      : undefined,
                  }}
                  className={`h-48 w-48 p-14 flex text-center items-center justify-center rounded-xl cursor-pointer text-white font-bold text-xl transition-transform duration-100 ease-in-out hover:scale-105 
                    }`}
                >
                  <p className="text-4xl">{classItem.className}</p>
                </div>
              ))}

            </div>
            <div className="mt-6 text-gray-800 mb-8">
              <p className="font-light text-gray-500 text-lg">
                Select the class you are interested in from the options above. Each class has a unique color scheme to help you easily identify them. Once you select a class, you will be able to proceed with selecting the subject associated with that class. Feel free to explore and choose the class that suits your learning needs. If you're unsure about the class to choose, you can always come back and change your selection later. Each class provides different sets of resources tailored to the curriculum, so make sure to select the right one for your studies. We are here to help you navigate through the learning process, and selecting the right class is the first step towards your success!
              </p>
            </div>



          </div>
        )}
        {!selectedClass && (
          <SubjectWiseLearning
            selectedClass={selectedClass}
            classes={classes}
            loading={loading}
          />
        )}


        {selectedClass && (
          <div>
            <div className="flex flex-wrap gap-7 mt-7 mb-10">
              {loading ? (
                <>

                  {Array(7)
                    .fill(0)
                    .map((_, index) => (
                      <div
                        key={index}
                        className="flex flex-col px-20 py-5 rounded-lg shadow-lg transition-transform duration-300 ease-in-out cursor-pointer"
                        style={{ backgroundColor: "#f3f3f3" }}
                      >
                        <CustomCardLoader
                          className="w-16 h-16 object-cover rounded-t-lg"
                          viewBox="0 0 300 50"
                          rectW="90%"
                          rectH="90"
                        />

                      </div>
                    ))}
                </>
              ) : (


                subjects && subjects.length > 0 ? (
                  subjects.map((subject) => (
                    <div
                      key={subject._id}
                      className="flex flex-col px-20 py-5 rounded-lg shadow-lg transition-transform duration-300 ease-in-out hover:scale-110 cursor-pointer"
                      style={{ backgroundColor: subject.color }}
                      onClick={() => handleSubjectClick(subject)}
                    >
                      <img
                        src={`${process.env.NEXT_PUBLIC_IMAGE_URI}${subject.image}`}
                        alt={subject.subjectName}
                        className="w-16 h-16 object-cover rounded-t-lg"
                      />
                      <p className="text-center text-sm font-semibold text-gray-500">
                        {subject.subjectName}
                      </p>
                    </div>
                  ))
                ) : (
                  <div>No subjects available</div>
                )

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
