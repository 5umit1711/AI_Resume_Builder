import { Loader2, PlusSquare } from "lucide-react";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { useUser } from "@clerk/clerk-react";
import { createResume } from "./../../hooks/userApi";
import { useNavigate } from "react-router-dom";

const AddResume = () => {
  const { user } = useUser();
  const [openDialog, setOpenDialog] = useState(false);
  const [resumeTitle, setResumeTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onCreate = async() => {
    setLoading(true);
    const data = {
      title: resumeTitle,
      userEmail: user?.primaryEmailAddress?.emailAddress,
      userName: user?.fullName,
    };

    try {
      await createResume(data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
    setOpenDialog(false);
  };

  return (
    <div>
      <div
        className=" mt-6 p-16 py-28  border-2 border-slate-400 border-dashed flex 
      items-center justify-center bg-slate-200 h-[280px] hover:shadow-md hover:scale-105
      cursor-pointer"
        onClick={() => setOpenDialog(true)}
      >
        <PlusSquare />
      </div>

      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create a new resume</DialogTitle>
            <DialogDescription>
              <p className="my-2 font-semibold text-black">
                Add title for the resume
              </p>
              <Input
                className="mt-4 text-black"
                placeholder="Title"
                onChange={(e) => setResumeTitle(e.target.value)}
              />
            </DialogDescription>
            <div className="flex gap-4 justify-end pt-3">
              <Button
                variant="destructive"
                onClick={() => setOpenDialog(false)}
              >
                Cancel
              </Button>
              <Button
                disabled={!resumeTitle || loading}
                onClick={() => onCreate()}
              >
                {loading ? <Loader2 className="animate-spin mr-1"/> : <></>}
                Create
              </Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddResume;
