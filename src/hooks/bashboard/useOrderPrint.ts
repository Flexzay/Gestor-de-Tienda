import { useRef } from "react";

export const useOrderPrint = () => {
  const cardRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const handlePrintCard = (orderId: string, onAfterPrint?: () => void) => {
    const printContent = cardRefs.current[orderId];
    if (!printContent) return;

    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    printWindow.document.write(`
      <html>
        <head>
          <title>Imprimir Pedido</title>
          <style>
            body { font-family: sans-serif; padding: 20px; }
          </style>
        </head>
        <body>
          ${printContent.innerHTML}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();

    if (onAfterPrint) onAfterPrint();
  };

  return { cardRefs, handlePrintCard };
};
