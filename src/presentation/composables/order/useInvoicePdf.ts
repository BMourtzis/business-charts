import type { Order } from "@/domain/order/models/order";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export function useInvoicePDF() {
  const generatePDF = (order: Order) => {
    const doc = new jsPDF();
    const margin = 10;

    // if (invoiceData.brandImageBase64) {
    //   doc.addImage(invoiceData.brandImageBase64, "PNG", margin, margin, 50, 20);
    // }

    const pageWidth = doc.internal.pageSize.getWidth();
    const rightX = pageWidth - margin;

    doc.setFontSize(12);
    doc.text(`Invoice #: ${order.orderNumber}`, rightX, 15, { align: "right" });
    doc.text(`Date: ${order.createdDate.toDateString()}`, rightX, 22, { align: "right" });
    doc.text(`Customer: ${order.partnerId}`, rightX, 29, { align: "right" });

    // --- Table ---
    autoTable(doc, {
      startY: 45,
      head: [["Item", "Qty", "Price", "Total"]],
      body: order.items.map(i => [i.derivedSKU, i.quantity.toString(), i.unitPrice.toFixed(2), order.totalAmount.toFixed(2)]),
      theme: "grid",
      headStyles: { fillColor: [41, 128, 185] },
    });

    // --- Open in new tab ---
    doc.output("dataurlnewwindow");
  };

  return { generatePDF };
}
