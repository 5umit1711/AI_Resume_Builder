import { useUser } from "@clerk/clerk-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddResume from "./AddResume";
import { getResume } from "./../../hooks/userApi";
import ResumeCardItem from "./ResumeItem";

function DashBoard() {
  const { isSignedIn, user } = useUser();
  const [resumeList, setResumeList] = useState([]);
  const navigate = useNavigate();
  

  useEffect(() => {
    if (!isSignedIn) {
      navigate("/");
      return;
    }
    user && GetResumeList();
  });

  const GetResumeList = async () => {
    try {
      const res = await getResume(user?.primaryEmailAddress?.emailAddress);
      setResumeList(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-6 md:px-10 lg:px-32">
      <h2 className="text-3xl font-bold">My Resume</h2>
      <p className="mt-2 mb-2 text-xl text-slate-800">
        Create and download Resume for your next job
      </p>

      <div className="grid grid-cols-2 gap-10 md:grid-cols-3 lg:grid-cols-4">
        <AddResume />
        {resumeList?.map((resume, index) => (
          <ResumeCardItem resume={resume} key={index} refresh={GetResumeList}/>
        ))}
      </div>
    </div>
  );
}

export default DashBoard;
