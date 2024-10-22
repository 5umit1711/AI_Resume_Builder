import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PreviewSection from "./PreviewSection";
import FormSection from "./FormSection";
import { getResumeById } from "./../../hooks/userApi";
import { ResumeContext } from "@/context/resumeContext";

const EditResume = () => {
  const { resumeInfo, setResumeInfo } = useContext(ResumeContext);
  const { _id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const data = await getResumeById(_id);
        if (data && data.resume) {
          setResumeInfo(data.resume);
        } else {
          setError("Resume data not found");
        }
      } catch (err) {
        setError("Error fetching resume");
        console.error("Failed to fetch resume:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchResume();
  }, [_id, setResumeInfo]);

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 p-10 gap-8">
      <FormSection />
      <PreviewSection resumeInfo={resumeInfo} />
    </div>
  );
};

export default EditResume;
