import type { OrderLineItem } from "@/domain/order/models/orderLineItem";

export function useExportLabelPrintListToCSV(lineItems: OrderLineItem[], filename: string) {
    const csv = orderToLabelPrintCSV(lineItems);
    downloadCsv(csv, `${filename}-printlist.csv`);
}

function orderToLabelPrintCSV(items: OrderLineItem[]): string {
    if(!items.length) return "";

    const headers = ["MODEL", "Size"];

    const lines = [
        headers.join(","),
        ...items.flatMap(i => lineItemsToLines(i))
    ];

    return lines.join("\n\r");
}

function lineItemsToLines(lineItem: OrderLineItem): string[] {
    const model = `${lineItem.sku.productCode}${lineItem.sku.getSnapshotValues(["size"]).join(" ")}`
    const size = lineItem.sku.size;

    const entry = `${model}, ${size}`;

    return Array(lineItem.quantity).fill(entry);
}

function downloadCsv(csv: string, filename = "export.csv") {
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
}