import React, { useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

const steps = ["Step-1", "Step-2", "Step-3", "Step-4"];

const CustomStepIcon = ({ index, active, onClick }) => {
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
        backgroundColor: active ? "#d72a1c" : "#fff",
        color: active ? "#fff" : "#d72a1c",
        border: active ? "none" : "1px solid #d72a1c",
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

export default function HorizontalLinearStepper() {
  const [activeStep, setActiveStep] = useState(0);

  const handleStepClick = (step) => {
    setActiveStep(step);
  };

  return (
    <Box sx={{ width: "70%", marginTop: "-9px", marginBottom: "15px" }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((_, index) => (
          <Step key={index} sx={{ width: "20%" }}>
            {" "}
            {/* Adjusted width of Step */}
            <StepLabel
              StepIconComponent={CustomStepIcon.bind(null, {
                index,
                active: index === activeStep,
                onClick: handleStepClick,
              })}
            />
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}
