import mongoose from "mongoose";

const experienceSchema = new mongoose.Schema({
  title: { type: String },
  companyName: { type: String },
  state: { type: String },
  city: { type: String },
  startDate: { type: Date },
  endDate: { type: Date },
  workSummary: { type: String },
});

const educationSchema = new mongoose.Schema({
  universityName: { type: String },
  degree: { type: String },
  startDate: { type: String },
  endDate: { type: String },
  description: { type: String },
});

const skillSchema = new mongoose.Schema({
  name: { type: String },
  rating: { type: Number},
})

const resumeSchema = new mongoose.Schema(
  {
    userEmail: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    address: {
      type: String,
    },
    jobTitle: {
      type: String,
    },
    phoneNo: {
      type: String,
    },
    email: {
      type: String,
    },
    summary: {
      type: String,
    },
    experience: [experienceSchema],
    education: [educationSchema],
    skills: [skillSchema],
  },
  { timestamps: true }
);

const Resume = mongoose.model("resume", resumeSchema);

export default Resume;
