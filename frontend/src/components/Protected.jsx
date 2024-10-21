import React from "react";
import Header from "./Header";
import { useUser } from "@clerk/clerk-react";
import Home from "./Home";
import DashBoard from "./DashBoard";

const Protected = () => {
  const { isSignedIn } = useUser();
  return (
    <div>
      {isSignedIn ? <DashBoard /> : <Home />}
    </div>
  );
};

export default Protected;
