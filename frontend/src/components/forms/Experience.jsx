import React, { useContext, useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { ResumeContext } from "@/context/resumeContext";
import { updateExp } from "./../../../hooks/userApi";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { LoaderCircle } from "lucide-react";

const formField = {
  title: "",
  companyName: "",
  city: "",
  state: "",
  startDate: "",
  endDate: "",
  workSummary: "",
};

const Experience = () => {
  const { _id } = useParams();
  const [experienceList, setExperienceList] = useState([formField]);
  const { resumeInfo, setResumeInfo } = useContext(ResumeContext);
  const [loading, setLoading] = useState(false);

  const handleChange = (index, event) => {
    const newEntry = [...experienceList];
    const { name, value } = event.target;

    newEntry[index] = {
      ...newEntry[index],
      [name]: value,
    };
    setExperienceList(newEntry);
  };

  useEffect(()=>{
    resumeInfo && setExperienceList(resumeInfo.experience)
  }, [])

  const addNewExperience = () => {
    setExperienceList([...experienceList, formField]);
  };

  const handleSave = async () => {
    setLoading(true);
    const res = await updateExp(_id, experienceList);
    setLoading(false);
  };

  const removeNewExperience = () => {
    const updatedExperienceList = [...experienceList];
    updatedExperienceList.pop();
    setExperienceList(updatedExperienceList);
  };

  useEffect(() => {
    setResumeInfo({
      ...resumeInfo,
      experience: experienceList,
    });
  }, [experienceList]);

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-purple-300 border-t-4 mt-4">
      <h2 className="font-black text-lg">Work experience</h2>
      <p>Tell about your work experience</p>

      <div>
        {experienceList.map((item, index) => (
          <div>
            <div className="grid grid-cols-2 gap-3 mt-3">
              <div>
                <label htmlFor="" className="">
                  Position title
                </label>
                <Input
                  name="title"
                  onChange={(event) => handleChange(index, event)}
                  defaultValue={item?.title}
                />
              </div>
              <div>
                <label htmlFor="" className="">
                  Company Name
                </label>
                <Input
                  name="companyName"
                  onChange={(event) => handleChange(index, event)}
                  defaultValue={item?.companyName}

                />
              </div>
              <div>
                <label htmlFor="" className="">
                  City
                </label>
                <Input
                  name="city"
                  onChange={(event) => handleChange(index, event)}
                  defaultValue={item?.city}

                />
              </div>
              <div>
                <label htmlFor="" className="">
                  State
                </label>
                <Input
                  name="state"
                  onChange={(event) => handleChange(index, event)}
                  defaultValue={item?.state}

                />
              </div>
              <div>
                <label htmlFor="" className="">
                  Start date
                </label>
                <Input
                  name="startDate"
                  type="date"
                  onChange={(event) => handleChange(index, event)}
                  defaultValue={item?.startDate}

                />
              </div>
              <div>
                <label htmlFor="" className="">
                  End date
                </label>
                <Input
                  name="endDate"
                  type="date"
                  onChange={(event) => handleChange(index, event)}
                  defaultValue={item?.endDate}

                />
              </div>
              <div className="col-span-2">
                <label htmlFor="" className="">
                  Summary
                </label>
                <Textarea
                  name="workSummary"
                  onChange={(event) => handleChange(index, event)}
                  defaultValue={item?.workSummary}

                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between mt-3">
        <Button
          variant="outline"
          className="bg-slate-300 text-primary"
          onClick={addNewExperience}
        >
          + Add more experience
        </Button>
        <Button
          variant="outline"
          className="bg-slate-300 text-primary"
          onClick={removeNewExperience}
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

export default Experience;
