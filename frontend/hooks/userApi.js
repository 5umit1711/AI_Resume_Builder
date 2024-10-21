import axiosClient from "./GlobalApi.js";
import toast from "react-hot-toast";

const createResume = async (data)=>{
    try {
        const res = await axiosClient.post("/api/create-resume", data);
    } catch (error) {
        console.error("Error creating resume:", error); 
    }
};

const getResume = async(userEmail)=>{
    try {
        const {data} = await axiosClient.post("/api/get-resume", {userEmail});
        return data;
    } catch (error) {
        console.log("Error in fetching resume: ", error);
    }
}

const updateResume = async(_id, updatedData)=>{
    try {
        const {data} = await axiosClient.post(`api/update-resume/${_id}`, updatedData);
        toast.success("Saved successfully")
        return data;
    }catch(error){
        console.log("Error in updating", error);
    }
}

const updateExp = async(_id, experience)=>{
    try {
        const {data} = await axiosClient.post(`api/update-exp/${_id}`, {experience});
        toast.success("Saved successfully")
        return data;
    } catch (error) {
        console.log("Error in updating experience: ", error);
    }
}

const updateEducation = async(_id, education)=>{
    try {
        const {data} = await axiosClient.post(`api/update-education/${_id}`, {
            educationList: education
        });
        toast.success("Saved successfully")
        return data;
    } catch (error) {
        console.log("Error in updating experience: ", error);
    }
}

const updateSkills = async(_id, skillList)=>{
    try {
        const {data} = await axiosClient.post(`api/update-skills/${_id}`, {skillList});
        toast.success("Saved successfully")
        return data;
    } catch (error) {
        console.log("Error in updating experience: ", error);
    }
}

const getResumeById = async(_id)=>{
    try {
        const {data} = await axiosClient.get(`api/getById/${_id}`);
        return data;
    } catch (error) {
        console.log("Error in updating experience: ", error);
    }
}

const deleteResume = async(_id)=>{
    try {
        const {data} = await axiosClient.delete(`api/delete/${_id}`);
        toast.error("Deleted")
    } catch (error) {
        console.log("Error in deleting ", error);
    }
}

export {createResume, getResume, updateResume, updateExp, updateEducation, updateSkills,
    getResumeById, deleteResume
};