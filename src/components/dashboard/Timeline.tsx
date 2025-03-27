import * as React from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import { CheckCircle, Info, Image, Check } from "lucide-react";
import Typography from "@mui/material/Typography";
import Domiduck from "../../assets/img/horizontal-logo.svg"; // Importamos el logo

const steps = [
  { label: "Información Básica", icon: <Info size={16} /> },
  { label: "Imágenes del Producto", icon: <Image size={16} /> },
  { label: "Confirmación", icon: <Check size={16} /> },
];

const CustomTimeline = ({ currentStep }) => {
  return (
    <div className="flex flex-col items-center w-full">
      <img src={Domiduck} alt="Logo" className="w-40 mb-4" />
      <Timeline
        position="alternate"
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}
      >
        {steps.map((step, index) => (
          <TimelineItem
            key={index}
            sx={{
              minWidth: "150px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <TimelineSeparator>
              <TimelineDot color={currentStep > index ? "primary" : "secondary"}>
                {currentStep > index ? <CheckCircle size={16} /> : step.icon}
              </TimelineDot>
              {index !== steps.length - 1 && (
                <TimelineConnector
                  sx={{
                    width: "80px",
                    height: "2px",
                    backgroundColor: "#FF5722",
                    marginTop: "10px",
                  }}
                />
              )}
            </TimelineSeparator>
            <TimelineContent
              sx={{
                textAlign: "center",
                mt: 1,
                minWidth: "120px",
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  color: currentStep === index ? "#FF5722" : "text.secondary",
                  fontWeight: currentStep === index ? "bold" : "normal",
                }}
              >
                {step.label}
              </Typography>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </div>
  );
};

export default CustomTimeline;
