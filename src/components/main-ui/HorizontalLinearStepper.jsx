// import React, { useState } from "react";
// import Box from "@mui/material/Box";
// import Stepper from "@mui/material/Stepper";
// import Step from "@mui/material/Step";
// import StepLabel from "@mui/material/StepLabel";

// const steps = ["Step-1", "Step-2", "Step-3", "Step-4"];

// const CustomStepIcon = ({ index, active, onClick }) => {
//   const handleClick = () => {
//     onClick(index);
//   };

//   return (
//     <div
//       onClick={handleClick}
//       style={{
//         width: "24px",
//         height: "24px",
//         borderRadius: "50%",
//         backgroundColor: active ? "#d72a1c" : "#fff",
//         color: active ? "#fff" : "#d72a1c",
//         border: active ? "none" : "1px solid #d72a1c",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         cursor: "pointer",
//         position: "relative",
//         zIndex: 1,
//       }}
//     >
//       {index + 1}
//     </div>
//   );
// };

// export default function HorizontalLinearStepper( { activeStep, onChangeStep }) {

//   const handleStepClick = (step) => {
//     onChangeStep(step);
//   };

//   return (
//     <Box sx={{ width: "70%", marginTop: "-9px", marginBottom: "15px" }}>
//       <Stepper activeStep={activeStep} alternativeLabel>
//         {steps.map((_, index) => (
//           <Step key={index} sx={{ width: "20%" }}>
//             {" "}
//             <StepLabel
//               StepIconComponent={() => (
//                 <CustomStepIcon
//                   index={index}
//                   active={index === activeStep}
//                   onClick={handleStepClick}
//                 />
//               )}

//             />
//             {console.log("activeStep In HorizontalLinearStepper", activeStep)}
//           </Step>
//         ))}
//       </Stepper>
//     </Box>
//   );
// }

import React, { useState } from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import Box from "@mui/material/Box";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const steps = ["Step-1", "Step-2", "Step-3", "Step-4"];

const CustomStepIcon = ({ index, active, completed, onClick }) => {
  const handleClick = () => {
    onClick(index);
  };

  return (
    <div
      onClick={handleClick}
      style={{
        width: "24px",
        height: "24px",
        borderRadius: "50%",
        backgroundColor: completed ? "#d72a1c" : active ? "#d72a1c" : "#fff",
        color: completed ? "#fff" : active ? "#fff" : "#d72a1c",
        border: completed ? "none" : active ? "none" : "1px solid #d72a1c",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
        position: "relative",
        zIndex: 1,
      }}
    >
      {index + 1}
    </div>
  );
};

export default function HorizontalLinearStepper({
  activeStep,
  onChangeStep,
  completedSteps,
  setActiveStep,
}) {
  const [skipped, setSkipped] = useState(new Set());

  const handleStepClick = (step) => {
    onChangeStep(step);
  };

  const isStepOptional = (step) => {
    return step === 1;
  };



  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };



  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box sx={{ width: "70%", marginTop: "-9px", marginBottom: "15px" }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((_, index) => (
          <Step key={index} sx={{ width: "20%" }}>
            {" "}
            <StepLabel
              StepIconComponent={() => (
                <CustomStepIcon
                  index={index}
                  active={index === activeStep}
                  completed={completedSteps.includes(index)}
                  onClick={handleStepClick}
                />
              )}
            />
          </Step>
        ))}
      </Stepper>
      
    </Box>
  );
}
