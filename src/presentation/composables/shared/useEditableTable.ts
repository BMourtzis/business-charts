
export type TableColumn = {
  order: number,
  name: string,
  title: string,
  type: "autocomplete" | "text" | "calculated",
  list: string[],
  editableRow: boolean,
  calculate?: (row: InternalRow) => string
};

export type TableRow = {
  id?: string,
  cells: string[]
};

export type InternalRow = {
    id?: string,
    cells: {
        value: string
    }[]
};

export function toInternal(rows: TableRow[]): InternalRow[] {
    return rows.map(r => ({
        id: r.id,
        cells: r.cells.map(c => ({value: c}))
    }));
}

export function toPublic(internalRows: InternalRow[]): TableRow[] {
    return internalRows.map(r => ({
        id: r.id,
        cells: r.cells.map(c => c.value)
    }));
}