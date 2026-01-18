import { type VariationEditVM } from "@/presentation/viewModels/variationEditVM";
import type { TableColumn, TableRow } from "./useEditableTable";

export function useVariationTableMapper(layout: TableColumn[]) {
    const attributeColumns = layout.filter(c => c.type === 'variation');
    const sizingColumns = layout.filter(c => c.type === 'size');
    const priceColumn = layout.find(c => c.type === 'price')!;

    //TODO: migrate this to the regular VM
    function vmToRows(vms: VariationEditVM[]): TableRow[] {
        return vms.map(vm => ({
            cells: layout.map(col => {
                if(sizingColumns.includes(col)) {
                    return getNumberAttributeToCell(vm.sizing, col.name);
                }
                if(col === priceColumn) {
                    return numberToCell(vm.price);
                }
                return vm.attributes[col.name] || "";
            })
        }));
    }

    function regVmToRows(vms: VariationEditVM[]): TableRow[] {
        return vms.map(vm => ({
            cells: layout.map(col => {
                if(sizingColumns.includes(col)) {
                    return getNumberAttributeToCell(vm.sizing, col.name);
                }
                if(col === priceColumn) {
                    return numberToCell(vm.price);
                }
                return vm.attributes[col.name] || "";
            })
        }));
    }

    function rowsToVm(rows: TableRow[]): VariationEditVM[] {
        return rows.map(row => ({
            attributes: Object.fromEntries(
                attributeColumns.map((c, i) => [c.name, row.cells[i]])
            ),
            sizing: Object.fromEntries(
                sizingColumns.map((c, i) => [
                    c.name,
                    cellToNumber(row.cells[i + attributeColumns.length])
                ])
            ),
            price: row.cells[layout.indexOf(priceColumn)] ? cellToNumber(row.cells[layout.indexOf(priceColumn)]) : 0
        }));
    }



    return {
        regVmToRows,
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