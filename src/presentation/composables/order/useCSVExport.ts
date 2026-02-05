import type { OrderLineItem } from "@/domain/order/models/orderLineItem";
import type { TableColumn } from "../editableTable/useEditableTable";
import type { OrderLineItemVM } from "@/presentation/viewModels/orderVM";
import { numberPriceToIntlFormat } from "@/utlis/priceUtils";
import { mapOrderLineItemsToVM } from "@/presentation/mappers/orderMapper";
import type { VariationSnapshot } from "@/domain/order/models/sku";

//TODO: clean this up

export function useExportLabelPrintListToCSV(lineItems: OrderLineItem[], filename: string) {
    const csv = listItemsToLabelPrintCSV(lineItems);
    downloadCsv(csv, `${filename}-printlist.csv`);
}

export function useExportListToCSV(lineItems: OrderLineItem[], layout: TableColumn[], filename: string) {
    const csv = listItemsToListCSV(lineItems, layout);
    downloadCsv(csv, `${filename}-list.csv`);
}

function listItemsToListCSV(items: OrderLineItem[], layout: TableColumn[]): string {
    if(!items.length) return "";

    const headers = [
        "MODEL", 
        ...layout.filter(l => l.type === "size").map(l => l.title),
        "PAIRS",
        "PRICE",
        "TOTAL PRICE"
    ];

    const sizeLayout = layout.filter(l => l.type === "size");
    const itemsVM = mapOrderLineItemsToVM(items)

    return getCSVString(
        headers,
        itemsVM.map(vm => lineItemToListRow(vm, sizeLayout))
    );
}

function listItemsToLabelPrintCSV(items: OrderLineItem[]): string {
    if(!items.length) return "";

    const headers = ["MODEL", "Size"];

    return getCSVString(
        headers, 
        items.flatMap(i => lineItemToPrintListRow(i))
    );
}

function getCSVString(headers: string[], rows: string[]) {
    return [
        headers.join(", "),
        ...rows
    ].join("\n\r");
}

function lineItemToPrintListRow(lineItem: OrderLineItem): string[] {
    const model = getLineItemSKU(lineItem);
    const size = lineItem.sku.size;

    const entry = `${model}, ${size}`;

    return Array(lineItem.quantity).fill(entry);
}

function lineItemToListRow(lineItemVM: OrderLineItemVM, sizeLayout: TableColumn[]): string {
    const model = `${lineItemVM.productCode}${getSnapshotValues(lineItemVM.variationSnapshot).join(" ")}`;

    const sizes = sizeLayout.map(l => {
        if(l.name in lineItemVM.sizing) {
            return lineItemVM.sizing[l.name].toString();
        }
        else {
            return "0"
        }
    });

    const pairs = Object
        .values(lineItemVM.sizing)
        .reduce((acc, value) => acc + value, 0);

    const price = lineItemVM.unitPrice;
    const total = pairs * price;

    return [
        model,
        ...sizes,
        pairs,
        numberPriceToIntlFormat(price),
        numberPriceToIntlFormat(total)
    ].join(", ");
}


function getLineItemSKU(lineItem: OrderLineItem): string {
    return `${lineItem.sku.productCode}${lineItem.sku.getSnapshotValues(["size"]).join(" ")}`;
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

function getSnapshotValues(variationSnapshot: VariationSnapshot) {
    const attributeValues = getAttributeValues(variationSnapshot.attributes);
    const flagValues = getFlagValues(variationSnapshot.flags);
    return [...attributeValues, ...flagValues];
}

function getAttributeValues(attributes?: Record<string, string>): string[] {
    if(!attributes) return [];

    return Object
        .entries(attributes)
        .map(([, value]) => value);
}

function getFlagValues(flags? : Record<string, true>) {
    if(!flags) return [];

    return Object
        .entries(flags)
        .map(([key, ]) => key)
}