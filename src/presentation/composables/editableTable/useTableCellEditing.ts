import { computed, ref, type Ref } from "vue";
import type { InternalRow, TableColumn } from "./useEditableTable";

export type CellPosition = {
    row: number,
    column: number
}

export function useTableCellEditing(
    rows: Ref<InternalRow[]>, 
    tableColumns: Readonly<TableColumn[]>, 
    commitChanges: () => void) {

    function toCellId(pos: CellPosition) {
        return pos.row * tableColumns.length + pos.column;
    }

    function fromCellId(cellId: number | null): CellPosition | null {
        if(cellId === null) return null;
        return {
            row: Math.floor(cellId / tableColumns.length),
            column: cellId % tableColumns.length
        };
    }

    const activeCell = ref<CellPosition | null>(null);
    const focusKey = ref(0);

    function startEditingCell(rowIndex: number, columnIndex: number) {
        activeCell.value = {row: rowIndex, column: columnIndex};
    }

    function stopEditingCell() {
        activeCell.value = null
        commitChanges();
    }

    function moveEditingCellByCell(moveByPositions: number) {
        if(activeCell.value !== null) {
            moveCell(toCellId(activeCell.value), moveByPositions);
        }
    }

    function moveEditingCellByRow(moveByPositions: number) {
        if(activeCell.value !== null) {
            moveCell(toCellId(activeCell.value), getRowBaseIndex(moveByPositions));
        }
    }

    function moveCell(currentPosition: number, moveByPositions: number) {
        let pos = currentPosition + moveByPositions;

        const movement = getMovement(moveByPositions);

        while(isCellMoveValid(pos)) {
            if(isCellNavigable(pos)) {
                activeCell.value = fromCellId(pos);
                focusKey.value++;
                commitChanges();
                return;
            }
            pos += movement;
        }
    }

    function getMovement(moveByPositions: number) {
        if(moveByPositions < 0) return -1;
        return 1;
    }

    function isCellNavigable(newCellId: number) {
        return getRowLayoutByCellId(newCellId)?.navigable;
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

    function isCellFocused(rIndex: number, cIndex: number) {
        return getRowBaseIndex(rIndex) + cIndex === fromCellId(activeCell.value);
    }

    return {
        activeCell,
        focusKey,
        startEditingCell,
        isCellFocused,
        stopEditingCell,
        moveEditingCellByCell,
        moveEditingCellByRow
    }
}