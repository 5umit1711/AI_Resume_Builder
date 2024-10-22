import { ResumeContext } from "@/context/resumeContext";
import React, { useContext, useEffect, useState } from "react";
import PersonalDetail from "./forms/PersonalDetail";
import { Button } from "./ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Summary from "./forms/Summary";
import Experience from "./forms/Experience";
import Education from "./forms/Education";
import Skill from "./forms/Skill";
import MyResume from "./MyResume";
import { useNavigate, useParams } from "react-router-dom";

const FormSection = () => {
  const [formIndex, setFormIndex] = useState(1);
  const navigate = useNavigate();
  const {_id} = useParams();

  return (
    <div>
      <div className="flex flex-row-reverse gap-3">
        <Button
          onClick={() => setFormIndex(formIndex + 1)}
        >
          Next <ArrowRight />{" "}
        </Button>
        {formIndex >= 2 ? (
          <Button onClick={() => setFormIndex(formIndex - 1)}>
            <ArrowLeft />
          </Button>
        ) : null}
      </div>
      {formIndex === 1 ? (
        <PersonalDetail setFormIndex={setFormIndex} formIndex={formIndex} />
      ) : null}
      {formIndex === 2 ? <Summary setFormIndex={setFormIndex} formIndex={formIndex}/> : null}

      {formIndex === 3 ? <Experience setFormIndex={setFormIndex} formIndex={formIndex}/> : null}

      {formIndex === 4 ? <Education setFormIndex={setFormIndex} formIndex={formIndex}/> : null}

      {formIndex === 5 ? <Skill setFormIndex={setFormIndex} formIndex={formIndex}/> : null}


      {formIndex === 6 ? navigate(`/myresume/${_id}/view`) : null}


    </div>
  );
};

export default FormSection;
