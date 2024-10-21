import React, { useContext, useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ResumeContext } from "@/context/resumeContext";
import { useParams } from "react-router-dom";
import { updateResume } from "./../../../hooks/userApi";
import { LoaderCircle } from "lucide-react";

const PersonalDetail = ({ formIndex, setFormIndex }) => {
  const { _id } = useParams();
  const { resumeInfo, setResumeInfo } = useContext(ResumeContext);
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
    setResumeInfo({
      ...resumeInfo,
      [name]: value,
    });
  };

  const handleSave = async (e) => {
    setLoading(true);
    e.preventDefault();
    await updateResume(_id, data);
    setLoading(false);
    setFormIndex(formIndex + 1);
  };

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-purple-300 border-t-4 mt-4">
      <h2 className="font-black text-lg">Personal Details</h2>
      <p>Get started</p>

      <form onSubmit={handleSave}>
        <div className="grid grid-cols-2 mt-3 gap-2">
          <div>
            <label className="text-sm">First Name</label>
            <Input required name="firstName" defaultValue={resumeInfo.firstName} onChange={handleInput} />
          </div>
          <div>
            <label className="text-sm">Last Name</label>
            <Input required name="lastName" defaultValue={resumeInfo.lastName} onChange={handleInput} />
          </div>
          <div className="col-span-2">
            <label className="text-sm">Job Title</label>
            <Input required name="jobTitle" defaultValue={resumeInfo.jobTitle} onChange={handleInput} />
          </div>
          <div className="col-span-2">
            <label className="text-sm">Address</label>
            <Input required name="address" defaultValue={resumeInfo.address} onChange={handleInput} />
          </div>
          <div>
            <label className="text-sm">E-mail</label>
            <Input required name="email" defaultValue={resumeInfo.email} onChange={handleInput} />
          </div>
          <div>
            <label className="text-sm">Phone Number</label>
            <Input required name="phoneNo" defaultValue={resumeInfo.phoneNo} onChange={handleInput} />
          </div>
        </div>
        <div className="mt-2 flex justify-end">
          <Button type="submit" disabled={loading}>
            {loading && <LoaderCircle className="animate-spin" />}
            Save
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PersonalDetail;
