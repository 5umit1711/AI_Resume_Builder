import React, { useEffect } from "react";
import { SignIn, useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const { isSignedIn } = useUser();

  useEffect(() => {
    if (isSignedIn) {
      navigate("/dashboard");
    }
  }, [isSignedIn, navigate]);

  if (isSignedIn) {
    return null; 
  }

  return (
    <div className="flex justify-center items-center mt-12">
      <SignIn />
    </div>
  );
};

export default Login;
