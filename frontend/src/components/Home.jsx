import React, { useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const { user, isSignedIn, isLoaded } = useUser();


  return (
    <div className="min-h-[520px] bg-gradient-to-r from-blue-400 to-purple-500 flex flex-col items-center justify-center text-white p-6">
      <h1 className="text-4xl font-bold mb-4 drop-shadow-lg">
          {user ? `Welcome ${user?.firstName}` : `Welcome`}
      </h1>
      <p className="text-lg mb-8 drop-shadow-md">
        Ready to build your perfect resume?
      </p>
      <button className="bg-white text-blue-600 font-semibold py-2 px-4 rounded-lg shadow-lg hover:bg-gray-100 transition-all duration-300"
      onClick={()=> {
        if(isSignedIn){
          navigate("/dashboard");
        }else{
          navigate("/login");
        }
      }}>
        Get Started
      </button>
    </div>
  );
};

export default Home;
