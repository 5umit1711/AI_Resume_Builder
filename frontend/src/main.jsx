import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ClerkProvider } from "@clerk/clerk-react";
import { Toaster } from "react-hot-toast";
import ResumeProvider from "./context/resumeContext.jsx";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <Toaster />
      <ResumeProvider>
        <App />
      </ResumeProvider>
    </ClerkProvider>
  </React.StrictMode>
);
