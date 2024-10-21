import React, { useContext, useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { ResumeContext } from "@/context/resumeContext";
import { updateEducation } from "./../../../hooks/userApi";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { LoaderCircle } from "lucide-react";

const Education = () => {
  const [loading, setLoading] = useState(false);
  const { _id } = useParams();
  const { resumeInfo, setResumeInfo } = useContext(ResumeContext);
  const [educationList, setEducationList] = useState([
    {
      universityName: "",
      degree: "",
      startDate: "",
      endDate: "",
      description: "",
    },
  ]);

  const addEducation = () => {
    setEducationList([
      ...educationList,
      {
        universityName: "",
        degree: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ]);
  };

  const removeEducation = () => {
    const updatedEducationList = [...educationList];
    updatedEducationList.pop();
    setEducationList(updatedEducationList);
  };

  useEffect(()=>{
    resumeInfo && setEducationList(resumeInfo.education)
  }, [])

  const handleSave = async () => {
    setLoading(true);
    const res = await updateEducation(_id, educationList);
    setLoading(false);
  };

  const handleChange = (event, index) => {
    const newEntry = [...educationList];
    const { name, value } = event.target;

    newEntry[index] = {
      ...newEntry[index],
      [name]: value,
    };
    setEducationList(newEntry);
  };

  useEffect(() => {
    setResumeInfo({ ...resumeInfo, education: educationList });
  }, [educationList]);

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-purple-300 border-t-4 mt-4">
      <h2 className="font-black text-lg">Education</h2>
      <p>Add Your Qualifications</p>

      <div>
        {educationList.map((item, index) => (
          <div className="mt-2 grid grid-cols-2 gap-2">
            <div>
              <label htmlFor="">University Name</label>
              <Input
                name="universityName"
                onChange={(e) => handleChange(e, index)}
                defaultValue={item?.universityName}
              />
            </div>
            <div>
              <label htmlFor="">Degree Name</label>
              <Input
                name="degree"
                onChange={(e) => handleChange(e, index)}
                defaultValue={item?.degree}
              />
            </div>
            <div>
              <label htmlFor="">Start date</label>
              <Input
                name="startDate"
                type="date"
                onChange={(e) => handleChange(e, index)}
                defaultValue={item?.startDate}

              />
            </div>
            <div>
              <label htmlFor="">End date</label>
              <Input
                name="endDate"
                type="date"
                onChange={(e) => handleChange(e, index)}
                defaultValue={item?.endDate}

              />
            </div>
            <div className="col-span-2">
              <label htmlFor="">Description</label>
              <Textarea
                name="description"
                onChange={(e) => handleChange(e, index)}
                defaultValue={item?.description}

              />
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-3">
        <Button
          variant="outline"
          className="bg-slate-300 text-primary"
          onClick={addEducation}
        >
          + Add more education
        </Button>
        <Button
          variant="outline"
          className="bg-slate-300 text-primary"
          onClick={removeEducation}
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

export default Education;
