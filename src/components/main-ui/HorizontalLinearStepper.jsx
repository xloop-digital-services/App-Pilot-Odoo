import React, { useState } from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import Box from "@mui/material/Box";
import StepLabel from "@mui/material/StepLabel";

// const steps = ["Step-1", "Step-2", "Step-3", "Step-4"];

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
        backgroundColor: completed ? "#d72a1c" : active ? "#1f85df" : "#fff",
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
  // completedSteps,
  // setActiveStep,
  steps,
}) {
  const handleStepClick = (step) => {
    onChangeStep(step);
  };

  return (
    <Box sx={{ width: "70%", marginTop: "-9px", marginBottom: "15px" }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps?.map((_, index) => (
          <Step key={index} sx={{ width: "20%" }}>
            {" "}
            <StepLabel
              StepIconComponent={() => (
                <CustomStepIcon
                  index={index}
                  active={index === activeStep}
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
