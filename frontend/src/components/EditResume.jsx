import React, { useContext, useEffect} from "react";
import { useParams } from "react-router-dom";
import PreviewSection from "./PreviewSection";
import FormSection from "./FormSection";
import { getResumeById } from "./../../hooks/userApi";
import { ResumeContext } from "@/context/resumeContext";

const EditResume = () => {
  const { resumeInfo, setResumeInfo } = useContext(ResumeContext);
  const { _id } = useParams();

  useEffect(()=>{
    const fetchResume = async()=>{
      const data = await getResumeById(_id);
      setResumeInfo(data.resume)
      data = data.resume;
    }
    
    fetchResume();
  },[]);
  
  return (
      <div className="grid grid-cols-1 md:grid-cols-2 p-10 gap-8">
        <FormSection />
        <PreviewSection resumeInfo={resumeInfo}/>
      </div>
  );
};

export default EditResume;
