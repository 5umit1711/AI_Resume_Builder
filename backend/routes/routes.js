import express from "express";
import Resume from "../model/resumeModel.js";

const router = express.Router();

router.post("/create-resume", async (req, res) => {
  try {
    const newResume = await Resume(req.body);
    const resume = await newResume.save();

    res.send({
      _id: resume._id,
      success: true,
      message: "Title added successfully",
    });
  } catch (error) {
    console.log(error);
  }
});

router.post("/get-resume", async (req, res) => {
  try {
    const { userEmail } = req.body;
    const resumes = await Resume.find({ userEmail }).sort({ createdAt: -1 });
    return res.send({
      succcess: true,
      data: resumes,
    });
  } catch (error) {
    console.log(error);
  }
});

router.get("/getById/:id", async(req, res)=>{
  try {
    const id = req.params.id;
    const resume = await Resume.findById(id);

    res.send({
      success: true,
      message: "Saved Successfully",
      resume: resume,
    });
  } catch (error) {
    console.log(error);
  }
});

router.post("/update-resume/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const resume = await Resume.findByIdAndUpdate(id, data, { new: true });

    res.send({
      success: true,
      message: "Saved Successfully",
      data: resume,
    });
  } catch (error) {
    console.log(error);
  }
})



router.post("/update-exp/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { experience } = req.body;

    const resume = await Resume.findById(id);
    experience.forEach((element) => {
      resume.experience.push(element);
    });

    const newResume = await resume.save();

    return res.send({
      success: true,
      message: "Success",
      data: newResume,
    });
  } catch (error) {
    console.log(error);
  }
})

router.post("/update-education/:id", async(req,res)=>{
  try {
    const id = req.params.id;
    const {educationList} = req.body;

    const resume = await Resume.findById(id);
    educationList?.forEach((element) => {
      resume.education.push(element);
    });

    const newResume = await resume.save();

    return res.send({
      success: true,
      message: "Success",
      data: newResume,
    });

  } catch (error) {
    console.log(error);
  }
})

router.post("/update-skills/:id", async(req,res)=>{
  try {
    const id = req.params.id;
    const {skillList} = req.body;

    const resume = await Resume.findById(id);
    skillList?.forEach((element) => {
      resume.skills.push(element);
    });

    const newResume = await resume.save();

    return res.send({
      success: true,
      message: "Success",
      data: newResume,
    });

  } catch (error) {
    console.log(error);
  }
})

router.delete("/delete/:id", async(req,res)=>{
    try{
      const id = req.params.id;
      await Resume.findByIdAndDelete(id);

      res.send({
        success: true,
        message: "Resume deleted successfully",
      })
    }catch(error){
      console.log(error);
    }
})

export default router;
