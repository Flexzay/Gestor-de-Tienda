import { useRef } from "react";

export const useOrderPrint = () => {
  const cardRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const handlePrintCard = (order: any, _onAfterPrint?: () => void) => {
    const orderElement = cardRefs.current[order.id];
    if (!orderElement) return;

    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    // Función para formatear la fecha
    const formatDate = (dateString: string) => {
      const date = new Date(dateString);
      return date.toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    };

    // Función para formatear moneda
    const formatCurrency = (amount: number) => {
      return new Intl.NumberFormat('es-ES', {
        style: 'currency',
        currency: 'COP'
      }).format(amount);
    };

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Ticket ${order.code || order.id}</title>
          <meta charset="UTF-8">
          <style>
            @page {
              size: 58mm auto;
              margin: 0 !important;
              padding: 0 !important;
            }
            body {
              width: 58mm !important;
              margin: 0 !important;
              padding: 2mm 3mm !important;
              font-family: 'Arial Narrow', Arial, sans-serif;
              font-size: 12px;
              line-height: 1.2;
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
            .header {
              text-align: center;
              margin-bottom: 3px;
              padding-bottom: 3px;
              border-bottom: 1px dashed #000;
            }
            .business-name {
              font-weight: bold;
              font-size: 14px;
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
            <div class="ticket-info">
              ${order.createdAt ? formatDate(order.createdAt) : new Date().toLocaleString()} | ${order.code || order.id}
            </div>
          </div>
          
          <div class="item-row">
            <span><strong>Cliente:</strong></span>
            <span>${order.client?.name || 'Cliente no registrado'}</span>
          </div>
          
          <div class="item-row">
            <span><strong>Mesa:</strong></span>
            <span>${order.space?.name || 'Sin mesa'}</span>
          </div>
          
          <div class="divider"></div>
          
          <div class="item-row text-bold">
            <span class="item-name"><strong>Producto</strong></span>
            <span class="item-price"><strong>Total</strong></span>
          </div>
          
          ${order.items.map((item: any) => `
            <div class="item-row">
              <span class="item-name">${item.quantity}x ${item.product?.name || item.name}</span>
              <span class="item-price">${formatCurrency(item.price * item.quantity)}</span>
            </div>
          `).join('')}
          
          <div class="divider"></div>
          
          <div class="item-row" style="font-weight: bold;">
            <span>TOTAL:</span>
            <span>${formatCurrency(order.total)}</span>
          </div>
          
          <div class="footer">
            Gracias por su compra<br>
            ${new Date().toLocaleDateString('es-ES', { 
              day: '2-digit', 
              month: '2-digit', 
              year: 'numeric' 
            })}
          </div>

          <script>
            setTimeout(() => {
              window.print();
              window.close();
            }, 200);
          </script>
        </body>
      </html>
    `);

    printWindow.document.close();
  };

  return { cardRefs, handlePrintCard };
};