import { type VariationEditVM } from "@/presentation/viewModels/variationEditVM";
import type { TableColumn, TableRow } from "./useEditableTable";
import type { OrderLineItemVM } from "@/presentation/viewModels/orderVM";
import { calculateDerivedSKU, type VariationSnapshot } from "@/domain/order/models/sku";

export function useVariationTableMapper(layout: TableColumn[]) {
    const attributeColumns = layout.filter(c => c.type === 'variation');
    const flagsColumns = layout.filter(c => c.type === 'flag');
    const sizingColumns = layout.filter(c => c.type === 'size');
    const priceColumn = layout.find(c => c.type === 'price')!;
    const productCodeColumn = layout.find(c => c.type === 'productCode')!;

    function vmToRows(vms: OrderLineItemVM[]): TableRow[] {
        return vms.map(vm => ({
            id: vm.derivedSku,
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
                return getVariation(vm.variationSnapshot, col);
            })
        }));
    }

    function getVariation(variationSnapshot: VariationSnapshot, col: TableColumn): string {
        if(col.type === "flag") return variationSnapshot.flags?.[col.name] ? "true" : "";

        return variationSnapshot.attributes?.[col.name] || "";
    }

    function rowsToVm(rows: TableRow[]): OrderLineItemVM[] {
        return rows.map(row => {
            const snapshot = {
                attributes: getAttributes(row),
                flags: getFlags(row)
            };

            const productCode = getProductCode(row);
            const unitPrice = getUnitPrice(row);
            const sizing = getSizing(row);

            return {
                unitPrice: unitPrice,
                productCode: productCode,
                variationSnapshot: snapshot,
                sizing: sizing,
                derivedSku: calculateDerivedSKU(productCode, snapshot)
            };
        });
    }

    function getAttributes(row: TableRow): Record<string, string> {
        return Object.fromEntries(
            attributeColumns.map(c => [c.name, row.cells[c.order]])
        );
    }

    function getFlags(row: TableRow): Record<string, true> {
        return Object.fromEntries(
            flagsColumns
                .filter(c => Boolean(row.cells[c.order]))
                .map(c => [c.name, true])
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