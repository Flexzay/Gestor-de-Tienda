import * as React from "react";
import { CheckCircle, Info, Image } from "lucide-react";
import Typography from "@mui/material/Typography";
import Domiduck from "../../assets/img/horizontal-logo.svg"; // Importamos el logo

const steps = [
  { label: "Información Básica", icon: <Info size={24} /> },
  { label: "Imágenes del Producto", icon: <Image size={24} /> },
];

const CustomTimeline = ({ currentStep }) => {
  return (
    <div className="flex flex-col items-center w-full">
      <img src={Domiduck} alt="Logo" className="w-40 mb-6" />

      <div className="flex items-center justify-center w-full space-x-10">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center">
            {/* Circulo con cambio de color */}
            <div
              className={`flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 ${
                currentStep > index ? "bg-green-500 text-white" : "bg-gray-300 text-gray-600"
              }`}
            >
              {currentStep > index ? <CheckCircle size={24} /> : step.icon}
            </div>

            {/* Texto debajo */}
            <Typography
              variant="body2"
              sx={{
                color: currentStep === index ? "#FF5722" : "text.secondary",
                fontWeight: currentStep === index ? "bold" : "normal",
                marginTop: "8px",
              }}
            >
              {step.label}
            </Typography>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomTimeline;
