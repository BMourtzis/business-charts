import { type VariationEditVM } from "@/presentation/viewModels/variationEditVM";
import type { TableColumn, TableRow } from "./useEditableTable";
import type { OrderLineItemVM } from "@/presentation/viewModels/orderVM";
import { calculateDerivedSKU } from "@/domain/order/models/sku";

export function useVariationTableMapper(layout: TableColumn[]) {
    const attributeColumns = layout.filter(c => c.type === 'variation');
    const sizingColumns = layout.filter(c => c.type === 'size');
    const priceColumn = layout.find(c => c.type === 'price')!;
    const productCodeColumn = layout.find(c => c.type === 'productCode')!;

    function vmToRows(vms: OrderLineItemVM[]): TableRow[] {
        return vms.map(vm => ({
            cells: layout.map(col => {
                if(sizingColumns.includes(col)) {
                    return getNumberAttributeToCell(vm.sizing, col.name);
                }
                if(col === priceColumn) {
                    return numberToCell(vm.unitPrice);
                }
                if(col === productCodeColumn) {
                    return vm.productCode;
                }
                return vm.variationSnapshot[col.name] || "";
            })
        }));
    }

    function rowsToVm(rows: TableRow[]): OrderLineItemVM[] {
        return rows.map(row => {
            const attributes = getAttributes(row);
            const productCode = getProductCode(row);
            const unitPrice = getUnitPrice(row);
            const sizing = getSizing(row);

            return {
                unitPrice: unitPrice,
                productCode: productCode,
                variationSnapshot: attributes,
                sizing: sizing,
                derivedSku: calculateDerivedSKU(productCode, attributes)
            };
        });
    }

    function getAttributes(row: TableRow): Record<string, string> {
        return Object.fromEntries(
            attributeColumns.map(c => [c.name, row.cells[c.order]])
        );
    }

    function getProductCode(row: TableRow): string {
        return row.cells[layout.indexOf(productCodeColumn)] 
            ? row.cells[layout.indexOf(productCodeColumn)] 
            : "";
    }

    function getUnitPrice(row: TableRow): number {
        return row.cells[layout.indexOf(priceColumn)] 
            ? cellToNumber(row.cells[layout.indexOf(priceColumn)]) 
            : 0;
    }

    function getSizing(row: TableRow): Record<string, number> {
        return Object.fromEntries(
            sizingColumns.map(c => [
                c.name,
                cellToNumber(row.cells[c.order])
            ])
        );
    }

    return {
        vmToRows,
        rowsToVm
    };
}



function getNumberAttributeToCell(record: Record<string, number>, key: string): string {
    const value = getAttributeOrZero(record, key);
    return numberToCell(value);
}

function getAttributeOrZero(record: Record<string, number>, key: string): number {
    const value = record[key];
    if(value) return value;
    return 0;
}

function cellToNumber(value: string): number {
    return value && value !== "" ? Number(value) : 0;
}

function numberToCell(value: number): string {
    return value > 0 ? value.toString() : "";
}

export function sumSizing(vm: VariationEditVM): number {
    return Object.values(vm.sizing).reduce((sum, val) => sum + val, 0);
}