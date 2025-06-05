import { useRef } from "react";

export const useOrderPrint = () => {
  const cardRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const handlePrintCard = (orderId: string, onAfterPrint?: () => void) => {
    const orderElement = cardRefs.current[orderId];
    if (!orderElement) return;

    // Extraer datos
    const orderCode = orderElement.querySelector('h3')?.textContent || 'N/A';
    const orderDate = orderElement.querySelector('p.text-sm.text-gray-500')?.textContent || '';
    const customerName = orderElement.querySelectorAll('p.text-sm.text-gray-600')[0]?.textContent || 'Cliente no registrado';
    const tableName = orderElement.querySelectorAll('p.text-sm.text-gray-600')[1]?.textContent || 'Sin mesa';
    const totalAmount = orderElement.querySelector('p.text-lg.font-bold.text-gray-900')?.textContent || '$0.00';

    // Configuración para ticket térmico (58mm/80mm)
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    printWindow.document.write(`
      <html>
        <head>
          <title>Ticket ${orderCode}</title>
          <style>
            @page { 
              size: 58mm 100mm; /* Ancho estándar para impresoras térmicas */
              margin: 0;
              padding: 0;
            }
            body {
              font-family: 'Arial Narrow', sans-serif;
              font-size: 12px;
              width: 58mm;
              margin: 0;
              padding: 2mm;
              line-height: 1.2;
            }
            .header {
              text-align: center;
              font-weight: bold;
              font-size: 14px;
              margin-bottom: 3px;
              border-bottom: 1px dashed #000;
              padding-bottom: 3px;
            }
            .divider {
              border-top: 1px dashed #000;
              margin: 5px 0;
            }
            .text-center { text-align: center; }
            .text-right { text-align: right; }
            .text-bold { font-weight: bold; }
            .item-row {
              display: flex;
              justify-content: space-between;
              margin: 2px 0;
            }
            .footer {
              font-size: 10px;
              text-align: center;
              margin-top: 5px;
            }
          </style>
        </head>
        <body>
          <div class="header">
            DOMIDUCK<br>
            <span style="font-size: 10px;">${orderDate}</span>
          </div>

          <div class="item-row">
            <span class="text-bold">Ticket:</span>
            <span>${orderCode}</span>
          </div>
          <div class="item-row">
            <span class="text-bold">Cliente:</span>
            <span>${customerName}</span>
          </div>
          <div class="item-row">
            <span class="text-bold">Mesa:</span>
            <span>${tableName}</span>
          </div>

          <div class="divider"></div>

          <!-- Items del pedido (ejemplo) -->
          <div class="item-row text-bold">
            <span>Producto</span>
            <span>Total</span>
          </div>
          
          <div class="item-row">
            <span>1x Hamburguesa</span>
            <span>$5.00</span>
          </div>
          <div class="item-row">
            <span>2x Refresco</span>
            <span>$4.00</span>
          </div>

          <div class="divider"></div>

          <div class="item-row text-bold">
            <span>TOTAL:</span>
            <span>${totalAmount}</span>
          </div>

          <div class="footer">
            Gracias por su compra<br>
            ${new Date().toLocaleDateString()}<br>
            <!-- Código QR opcional -->
            <div class="text-center" style="margin-top: 3px;">
              [CÓDIGO_QR_OPCIONAL]
            </div>
          </div>

          <script>
            window.onload = function() {
              setTimeout(function() {
                window.print();
                window.close();
              }, 200);
            }
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();

    if (onAfterPrint) {
      printWindow.addEventListener('afterprint', onAfterPrint);
    }
  };

  return { cardRefs, handlePrintCard };
};