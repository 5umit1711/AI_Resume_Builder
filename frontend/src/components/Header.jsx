import React from "react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { UserButton, useUser } from "@clerk/clerk-react";

const Header = () => {
  const { user, isSignedIn, isLoaded } = useUser();

  return (
    <div id="not-print">
      <div className="flex justify-between items-center px-4 py-2 bg-gray-100 text-white shadow-md">
      <Link to="/">
      <img src="/logo.svg" alt="Logo" className="h-12 w-12" />
      </Link>
      <div className="flex items-center space-x-4">
        {isSignedIn ? (
          <>
            <Link to="/dashboard">
              <Button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">Dashboard</Button>
            </Link>
            <UserButton />
          </>
        ) : (
          <Link to="/login">
            <Button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">Get Started</Button>
          </Link>
        )}
      </div>
    </div>
    </div>
    
  );
};

export default Header;
