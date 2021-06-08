import soduko from 'sudoku';

export function generateSoduko() {
    const raw = soduko.makepuzzle();
    const rawResult = soduko.solvepuzzle(raw);
    let emptyCells = 0;
    const rows = [];

    for (let i = 0; i < 9; i++) {
        const row = { index: i, cols: [] };
        for (let j = 0; j < 9; j++) {
            const value = (raw[i * 9 + j]);
            if (value === null) emptyCells++;
            const col = {
                row: i,
                col: j,
                value: value !== null ? value : "",
                readOnly: value !== null ? true : false,
                conflict: false
            }
            row.cols.push(col);
        }
        rows.push(row);
    }
    return { rows, rawResult, emptyCells };
}

export function checkConflict(solved, cell) {
    const correctValue = solved[cell.row * 9 + cell.col];
    if (correctValue === cell.value) return false;
    return true;
}