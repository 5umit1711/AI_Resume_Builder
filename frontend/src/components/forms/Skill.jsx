import React, { useContext, useEffect, useState } from "react";
import { Input } from "../ui/input";
import "@smastrom/react-rating/style.css";
import { Rating } from "@smastrom/react-rating";
import { Button } from "../ui/button";
import { LoaderCircle } from "lucide-react";
import { ResumeContext } from "@/context/resumeContext";
import { updateSkills } from "./../../../hooks/userApi";
import { useParams } from "react-router-dom";

const Skill = ({formIndex, setFormIndex}) => {
  const {_id} = useParams();
  const [skillList, setSkillList] = useState([
    {
      name: "",
      rating: 0,
    },
  ]);
  const {resumeInfo, setResumeInfo} = useContext(ResumeContext)
  const [loading, setLoading] = useState(false);

  const handleChange = (index, name, value) => {
    const newEntry = [...skillList];
    newEntry[index] = {
      ...newEntry[index],
      [name]: value,
    };
    setSkillList(newEntry);
  };

  const addNewSkill = () => {
    setSkillList([
      ...skillList,
      {
        name: "",
        rating: 0,
      },
    ]);
  };

  const removeNewSkill = () => {
    const updatedList = [...skillList];
    updatedList.pop();
    setSkillList(updatedList);
  };

  const handleSave = () => {
    setLoading(true);
    const res = updateSkills(_id, skillList);
    setFormIndex(formIndex+1);
    setLoading(false);
  };

  useEffect(()=>{
    resumeInfo && setSkillList(resumeInfo.skills)
  }, [])

  useEffect(()=>{
    setResumeInfo({
      ...resumeInfo,
      skills: skillList,
    })
  }, [skillList])

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-purple-300 border-t-4 mt-4">
      <h2 className="font-black text-lg">Skills</h2>
      <p>Add Your top skills</p>

      {skillList.map((item, index) => (
        <div key={index} className="flex justify-between">
          <div>
            <label htmlFor="" className="text-sm">
              Name
            </label>
            <Input
              onChange={(e) => handleChange(index, "name", e.target.value)}
              value={item.name} // Add value prop here
            />
          </div>
          <Rating
            style={{ maxWidth: 250 }}
            value={item.rating} // Correct prop here
            className="mt-2"
            onChange={(v) => handleChange(index, "rating", v)}
          />
        </div>
      ))}

      <div className="flex justify-between mt-3">
        <Button
          variant="outline"
          className="bg-slate-300 text-primary"
          onClick={addNewSkill}
        >
          + Add more skills
        </Button>
        <Button
          variant="outline"
          className="bg-slate-300 text-primary"
          onClick={removeNewSkill}
        >
          Remove
        </Button>
        <Button disabled={loading} onClick={handleSave}>
          {loading && <LoaderCircle className="animate-spin" />}
          Save
        </Button>
      </div>
    </div>
  );
};

export default Skill;
