import React, { createContext, useState } from "react";

export const ResumeContext = createContext();

const ResumeProvider = ({ children }) => {
  const [resumeInfo, setResumeInfo] = useState({
    firstName: "",
    lastName: "",
  });

  return (
    <ResumeContext.Provider value={{ resumeInfo, setResumeInfo }}>
      {children}
    </ResumeContext.Provider>
  );
};

export default ResumeProvider;
