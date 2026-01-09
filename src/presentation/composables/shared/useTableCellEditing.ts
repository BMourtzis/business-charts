import { ref, Ref } from "vue";
import { InternalRow, TableColumn } from "./useEditableTable";

export function useTableCellEditing(
    rows: Ref<InternalRow[]>, 
    tableColumns: Readonly<TableColumn[]>, 
    commitChanges: () => void) {

    type CellPosition = {
        row: number,
        column: number
    }

    function toCellId(pos: CellPosition) {
        return pos.row * tableColumns.length + pos.column;
    }

    function fromCellId(cellId: number): CellPosition {
        return {
            row: Math.floor(cellId / tableColumns.length),
            column: cellId % tableColumns.length
        };
    }

    const editingCellId = ref<number | null>(null);

    function startEditingCell(rowIndex: number, columnIndex: number) {
        editingCellId.value = toCellId({row: rowIndex, column: columnIndex});
    }

    function stopEditingCell() {
        console.log("Stopping edit on cell", editingCellId.value);
        editingCellId.value = null;
        commitChanges();
    }

    function moveEditingCellByCell(moveByPositions: number) {
        if(editingCellId.value !== null) {
            moveCell(editingCellId.value + moveByPositions);
        }
    }

    function moveEditingCellByRow(moveAmount: number) {
        if(editingCellId.value !== null) {
            moveCell(editingCellId.value + getRowBaseIndex(moveAmount));
        }
    }

    function moveCell(target: number) {
        let pos = target;

        while(isCellMoveValid(pos)) {
            if(isCellEditable(pos)) {
                editingCellId.value = pos;
                commitChanges();
                return;
            }
            pos++;
        }
    }

    function isCellEditable(newCellId: number) {
        return getRowLayoutByCellId(newCellId)?.editableRow ?? false;
    }

    function getRowLayoutByCellId(cellId: number) {
        const rowIndex = cellId % tableColumns.length;
        return tableColumns.find(r => r.order === rowIndex);
    }

    function isCellMoveValid(newPosition: number) {
        if(newPosition < 0) return false;
        if(newPosition >= rows.value.length * tableColumns.length) return false;
        return true;
    }

    function getRowBaseIndex(rIndex: number) {
        return rIndex * tableColumns.length;
    }

    function isEditCell(rIndex: number, cIndex: number) {
        return getRowBaseIndex(rIndex) + cIndex === editingCellId.value;
    }

    return {
        startEditingCell,
        isEditCell,
        stopEditingCell,
        moveEditingCellByCell,
        moveEditingCellByRow
    }
}