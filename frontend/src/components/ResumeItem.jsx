import { Notebook } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { deleteResume } from "./../../hooks/userApi";


const ResumeCardItem = ({ resume, refresh }) => {

  const onDelete = async()=>{
    await deleteResume(resume._id);
    refresh();
  }

  return (
    <div
      className="relative mt-6 p-16 py-28 flex flex-col justify-between items-center
      h-[280px] w-[215px] border border-primary rounded-lg
      hover:scale-105 transition-all hover:shadow-md bg-gradient-to-b from-pink-100 via-purple-200 to-blue-200"
    >
      <Link to={`/dashboard/resume/${resume._id}/edit`} className="flex flex-col items-center">
        <img src="./images.png" width={80} height={80} alt="Resume thumbnail" />
        <div className="absolute bottom-0 left-0 w-full bg-red-500 text-white py-2 text-center rounded-b-lg">
          <h2 className="font-semibold">{resume.title}</h2>
        </div>
      </Link>

      <button
        className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition-colors z-20"
        aria-label="Delete resume"
        onClick={onDelete}
      >
        <MdDelete size={24} />
      </button>
    </div>
  );
};

export default ResumeCardItem;
