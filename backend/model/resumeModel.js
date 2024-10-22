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
      default: "",
    },
    lastName: {
      type: String,
      default: "",
    },
    address: {
      type: String,
      default: "",
    },
    jobTitle: {
      type: String,
      default: "",
    },
    phoneNo: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      default: "",
    },
    summary: {
      type: String,
      default: "",
    },
    experience: [experienceSchema],
    education: [educationSchema],
    skills: [skillSchema],
  },
  { timestamps: true }
);

const Resume = mongoose.model("resume", resumeSchema);

export default Resume;
