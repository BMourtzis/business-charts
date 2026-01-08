import { VariationEditVM } from "@/presentation/viewModels/variationEditVM";
import { TableColumn, TableRow } from "./useEditableTable";

export function userVariationTableMapper(layout: TableColumn[]) {
    const attributeColumns = layout.slice(0,2 );
    const sizingColumns = layout.slice(2);

    function vmToRows(vms: VariationEditVM[]): TableRow[] {
        return vms.map(vm => ({
            cells: layout.map(col => {
                if(sizingColumns.includes(col)) {
                    return numberToCell(vm.sizing[col.name]);
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
            )
        }));
    }

    function sumSizing(vm: VariationEditVM): number {
        return Object.values(vm.sizing).reduce((sum, val) => sum + val, 0);
    }

    function cellToNumber(value: string): number {
        return value && value !== "" ? Number(value) : 0;
    }

    function numberToCell(value: number): string {
        return value > 0 ? value.toString() : "";
    }

    return {
        vmToRows,
        rowsToVm,
        sumSizing,
    };
}