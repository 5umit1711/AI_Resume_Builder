import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button } from "./ui/button";
import PreviewSection from "./PreviewSection";
import { RWebShare } from "react-web-share";
import html2pdf from 'html2pdf.js';
import { ResumeContext } from "@/context/resumeContext";
import { getResumeById } from "./../../hooks/userApi";

const MyResume = () => {
  const { resumeInfo, setResumeInfo } = useContext(ResumeContext);
  const { _id } = useParams();

  useEffect(()=>{
    const fetchResume = async()=>{
      const data = await getResumeById(_id);
      setResumeInfo(data.resume)
    }
    
    fetchResume();
  },[]);

  const handleDownload = () => {
    const element = document.getElementById('print');
    const options = {
      margin: 0.5,
      filename: 'resume.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    html2pdf().from(element).set(options).save(); 
  };

  return (
    <div className="mt-8 mx-2 md:mx-20 lg:mx-36">
      <div className=" mx-2 md:mx-20 lg:mx-36">
        <div id="not-print">
          <h2 className="text-center text-3xl font-medium">
            Congrats!. Download and share that resume with the world
          </h2>
          <div className="flex justify-between my-10 px-40">
            <Button onClick={handleDownload}>Download</Button>
            <RWebShare
              data={{
                text: "Hello everyone. This is my resume.",
                url:
                  import.meta.env.VITE_BASE_URL + "myresume/" + _id + "/view",
                title: "My Resume",
              }}
              onClick={() => console.log("shared successfully!")}
            >
              <Button>Share</Button>
            </RWebShare>
          </div>
        </div>
      </div>

      <div id="print">
        <PreviewSection resumeInfo={resumeInfo}/>
      </div>
    </div>
  );
};

export default MyResume;
