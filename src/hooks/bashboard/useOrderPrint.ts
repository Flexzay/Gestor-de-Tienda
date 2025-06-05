import { useRef } from "react";

export const useOrderPrint = () => {
  const cardRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const handlePrintCard = (orderId: string, _onAfterPrint?: () => void) => {
    const orderElement = cardRefs.current[orderId];
    if (!orderElement) return;

    // Extraer datos del pedido
    const orderCode = orderElement.querySelector('h3')?.textContent || 'N/A';
    const orderDate = orderElement.querySelector('p.text-sm.text-gray-500')?.textContent || '';
    const customerName = orderElement.querySelectorAll('p.text-sm.text-gray-600')[0]?.textContent || 'Cliente no registrado';
    const tableName = orderElement.querySelectorAll('p.text-sm.text-gray-600')[1]?.textContent || 'Sin mesa';
    const totalAmount = orderElement.querySelector('p.text-lg.font-bold.text-gray-900')?.textContent || '$0.00';

    // Extraer items (adaptar según tu estructura real)
    const items = [
      { name: "Producto Ejemplo 1", quantity: 1, price: "$5.00" },
      { name: "Producto Ejemplo 2", quantity: 2, price: "$3.50" }
    ];

    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Ticket ${orderCode}</title>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            @page {
              size: 58mm auto;
              margin: 0 !important;
              padding: 0 !important;
            }
            body {
              font-family: 'Arial Narrow', Arial, sans-serif;
              font-size: 12px;
              width: 58mm;
              margin: 0 !important;
              padding: 2mm 3mm !important;
              line-height: 1.2;
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
            .header {
              text-align: center;
              font-weight: bold;
              margin-bottom: 3px;
              padding-bottom: 3px;
              border-bottom: 1px dashed #000;
            }
            .business-name {
              font-size: 14px;
              margin-bottom: 2px;
            }
            .ticket-info {
              font-size: 10px;
            }
            .divider {
              border-top: 1px dashed #000;
              margin: 4px 0;
            }
            .item-row {
              display: flex;
              justify-content: space-between;
              margin: 2px 0;
            }
            .item-name {
              flex: 2;
            }
            .item-price {
              flex: 1;
              text-align: right;
            }
            .text-center { text-align: center; }
            .text-right { text-align: right; }
            .text-bold { font-weight: bold; }
            .footer {
              font-size: 10px;
              text-align: center;
              margin-top: 5px;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="business-name">DOMIDUCK</div>
            <div class="ticket-info">${orderDate} | ${orderCode}</div>
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

          <div class="item-row text-bold">
            <span class="item-name">Producto</span>
            <span class="item-price">Total</span>
          </div>
          
          ${items.map(item => `
            <div class="item-row">
              <span class="item-name">${item.quantity}x ${item.name}</span>
              <span class="item-price">${item.price}</span>
            </div>
          `).join('')}

          <div class="divider"></div>

          <div class="item-row text-bold">
            <span>TOTAL:</span>
            <span class="text-right">${totalAmount}</span>
          </div>

          <div class="footer">
            Gracias por su compra<br>
            ${new Date().toLocaleDateString('es-ES', { 
              day: '2-digit', 
              month: '2-digit', 
              year: 'numeric' 
            })}<br>
            <!-- Opcional: Código QR -->
            <!-- <img src="https://api.qrserver.com/v1/create-qr-code/?size=50x50&data=${orderCode}" width="50" height="50"> -->
          </div>

          <script>
            // Forzar configuración de impresión
            function setupPrint() {
              try {
                window.print();
                setTimeout(() => window.close(), 100);
              } catch (e) {
                console.error('Print error:', e);
              }
            }
            setTimeout(setupPrint, 200);
          </script>
        </body>
      </html>
    `);

    printWindow.document.close();
  };

  return { cardRefs, handlePrintCard };
};