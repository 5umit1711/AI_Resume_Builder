import React, { useContext, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { ResumeContext } from "@/context/resumeContext";
import { BrainCog, LoaderCircle } from "lucide-react";
import { updateResume } from "./../../../hooks/userApi";
import { useParams } from "react-router-dom";
import chatSession from "./../../../hooks/googleApi";

const Summary = () => {
  const { _id } = useParams();
  const { resumeInfo, setResumeInfo } = useContext(ResumeContext);
  const [summary, setSummary] = useState();
  const [loading, setLoading] = useState(false);
  const [aiSummary, setAISummary] = useState([]);

  const onSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    await updateResume(_id, { summary: summary });
    setLoading(false);
  };

  const generateAISummary = async () => {
    setLoading(true);
    const prompt = `Job title: ${resumeInfo.jobTitle}. Based on job title give me summary
    for my resume within 4-5 lines in JSON format with field experience level and summary 
    with experience level for fresher, mid level and experienced`;
    const res = await chatSession.sendMessage(prompt);
    const formattedResponse = `[${res.response.text()}]`;
    setAISummary(JSON.parse(formattedResponse));
    setLoading(false);
  };

  useEffect(() => {
    summary &&
      setResumeInfo({
        ...resumeInfo,
        summary: summary,
      });
  }, [summary]);

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-purple-300 border-t-4 mt-4">
      <h2 className="font-black text-lg">Summary</h2>
      <p>Add summary to the job title</p>

      <form className="mt-4" onSubmit={onSave}>
        <div className="flex justify-between items-center">
          <label>Add Summary</label>
          <Button 
            onClick = {generateAISummary}
            variant="outline"
            type="button"
            className="border-lime-200 text-primary flex gap-2"
          >
            <BrainCog />
            Generate
          </Button>
        </div>
        <Textarea
          className="mt-4"
          defaultValue={resumeInfo?.summary}
          onChange={(e) => setSummary(e.target.value)}
          required
        />

        <div className="mt-2 flex justify-end">
          <Button type="submit">
            {loading && <LoaderCircle className="animate-spin" />}
            Save
          </Button>
        </div>
      </form>

      <div>
      {aiSummary && <div> 
        <h2 className="font-bold text-lg">Suggestion from AI</h2>
          {aiSummary.map((item, index)=>{
            return <div className="my-5">
              <h2 className="m-1 font-bold">Level : {item?.experience_level}</h2>
              <p className="m-1">{item?.summary}</p>
            </div>
          })}
        </div>}
      </div>
    </div>
  );
};

export default Summary;
