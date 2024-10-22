import React, { useContext } from "react";
import { ResumeContext } from "@/context/resumeContext";

const PreviewSection = ({ data }) => {
  const { resumeInfo : contextResumeInfo } = useContext(ResumeContext);

  const resumeInfo = data || contextResumeInfo || {};

  return (
    <div className="p-6 bg-white shadow-xl rounded-lg border border-gray-200 mx-auto max-w-4xl">
      <div className="text-center mb-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-1">
          {resumeInfo.firstName || "First Name"} {resumeInfo.lastName || "Last Name"}
        </h1>
        <h2 className="text-xl font-medium text-gray-600 italic mb-1">
          {resumeInfo.jobTitle || "Job Title"}
        </h2>
        <p className="text-md text-gray-500">{resumeInfo.address || "Address"}</p>
      </div>

      <div className="flex justify-center gap-6 mb-4 text-gray-600">
        <p className="text-sm font-medium">{resumeInfo.phoneNo || "Phone Number"}</p>
        <p className="text-sm font-medium">{resumeInfo.email || "Email"}</p>
      </div>

      <hr className="border-gray-300 mb-5" />

      {/* Summary Section */}
      <section className="mb-6">
        <h3 className="text-2xl font-semibold text-gray-900 mb-2 pb-1 border-b border-gray-200">
          Summary
        </h3>
        <p className="text-gray-700 text-md">{resumeInfo.summary || "Summary goes here..."}</p>
      </section>

      {/* Professional Experience Section */}
      <section className="mb-6">
        <h3 className="text-2xl font-semibold text-gray-900 mb-2 pb-1 border-b border-gray-200">
          Professional Experience
        </h3>
        {resumeInfo.experience &&
          resumeInfo.experience.map((item, index) => (
            <div
              key={index}
              className="bg-gray-50 p-4 mb-4 border border-gray-300 rounded-lg shadow-md"
            >
              <h4 className="text-lg font-bold text-gray-800 mb-1">
                {item.title || "Job Title"}
              </h4>
              <div className="flex justify-between text-gray-600 mb-1">
                <div>
                  <p className="font-medium text-gray-700">{item.companyName || "Company Name"}</p>
                  <p className="text-sm">{item.state || "State"}, {item.city || "City"}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm">{item.startDate || "Start Date"} - {item.endDate || "End Date"}</p>
                </div>
              </div>
              <p className="text-gray-700 text-sm">{item.workSummary || "Work Summary"}</p>
            </div>
          ))}
      </section>

      {/* Education Section */}
      <section className="mb-6">
        <h3 className="text-2xl font-semibold text-gray-900 mb-2 pb-1 border-b border-gray-200">
          Education
        </h3>
        {resumeInfo.education &&
          resumeInfo.education.map((item, index) => (
            <div
              key={index}
              className="bg-gray-50 p-4 mb-4 border border-gray-300 rounded-lg shadow-md"
            >
              <h4 className="text-lg font-bold text-gray-800 mb-1">
                {item.universityName || "University Name"}
              </h4>
              <div className="flex justify-between text-gray-600 mb-1">
                <div>
                  <p className="font-medium text-gray-700">{item.degree || "Degree"}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm">{item.startDate || "Start Date"} - {item.endDate || "End Date"}</p>
                </div>
              </div>
              <p className="text-gray-700 text-sm">{item.description || "Description"}</p>
            </div>
          ))}
      </section>

      {/* Skills Section */}
      <section>
        <h3 className="text-2xl font-semibold text-gray-900 mb-2 pb-1 border-b border-gray-200">
          Skills
        </h3>
        <div className="grid grid-cols-2 gap-4">
          {resumeInfo.skills &&
            resumeInfo.skills.map((skill, index) => (
              <div key={index} className="flex items-center mb-3">
                <span className="text-sm font-semibold text-gray-800 mr-3">
                  {skill.name || "Skill Name"}
                </span>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="h-full rounded-full bg-blue-600"
                    style={{ width: `${skill.rating ? skill.rating * 20 : 0}%` }}
                  ></div>
                </div>
              </div>
            ))}
        </div>
      </section>
    </div>
  );
};

export default PreviewSection;
