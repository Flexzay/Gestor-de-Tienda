import * as React from "react";
import { CheckCircle, Info, Image } from "lucide-react";
import Typography from "@mui/material/Typography";
import Domiduck from "../../assets/img/horizontal-logo.svg"; // Importamos el logo

const steps = [
  { label: "Información Básica", icon: <Info size={28} /> },
  { label: "Imágenes del Producto", icon: <Image size={28} /> },
];

const CustomTimeline = ({ currentStep }) => {
  return (
    <div className="flex flex-col items-center w-full">
      {/* Logo */}
      <img src={Domiduck} alt="Logo" className="w-40 mb-6" />

      <div className="relative flex items-center justify-between w-full max-w-lg">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center relative w-1/2">
            {/* Línea de progreso correctamente centrada */}
            {index < steps.length - 1 && (
              <div
                className={`absolute top-2/6 left-[75%] -translate-y-1/2 w-1/2 h-2 transition-all duration-300 ${
                  currentStep > index ? "bg-[#007AFF]" : "bg-gray-300"
                }`}
              />
            )}

            {/* Círculo con icono */}
            <div
              className={`flex items-center justify-center w-16 h-16 rounded-full transition-all duration-300 border-4 ${
                currentStep > index
                  ? "bg-[#007AFF] text-white border-[#007AFF]"
                  : currentStep === index
                  ? "bg-white text-[#007AFF] border-[#007AFF]"
                  : "bg-gray-300 text-gray-600 border-gray-300"
              }`}
            >
              {currentStep > index ? <CheckCircle size={28} /> : step.icon}
            </div>

            {/* Texto debajo */}
            <Typography
              variant="body1"
              sx={{
                color: currentStep === index ? "#007AFF" : "text.secondary",
                fontWeight: currentStep === index ? "bold" : "normal",
                marginTop: "12px",
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
