function sudoku(puzzle) {
    var sudokuPossibilities = fillArray(puzzle);
    var nbVoid = 1;
    //var safe = 0;
    while (nbVoid != 0 /*&& safe < 1*/) {
        nbVoid = 0;
        for (var i = 0; i < 81; i++) {
            if (sudokuPossibilities[i][3] == 0) {
                sudokuPossibilities[i][4] = checkP(sudokuPossibilities, i);
                if (sudokuPossibilities[i][4].length == 1) {
                    sudokuPossibilities[i][3] = sudokuPossibilities[i][4][0];
                    sudokuPossibilities[i][4].pop();
                    nbVoid--;
                }
                nbVoid++;
            }
        }
        //safe++;
    }
    console.log(sudokuPossibilities);
    return possibilitiesToArray(sudokuPossibilities);
}

function fillArray(puzzle) {
    var sudokuPossibilities = createMultiDimArray();
    var x = 0;
    var y = 0;
    var z = 0;
    var c = 0;
    for (var i = 0; i < 81; i++) {
        sudokuPossibilities[i][1] = Math.floor((i) / 9) + 1;

        x++;
        if (x == 10) {
            x = 1;
        }
        sudokuPossibilities[i][0] = x;
        sudokuPossibilities[i][2] = Math.floor((x - 1) / 3) + (Math.floor((Math.floor((i) / 9)) / 3)) * 3 + 1;
        sudokuPossibilities[i][3] = puzzle[Math.floor((i) / 9)][x - 1];
    }

    //console.log(sudokuPossibilities);
    return sudokuPossibilities;
}

function createMultiDimArray() {
    var array = [];
    for (var i = 0; i < 81; i++) {
        array.push([]);
    }
    for (var i = 0; i < 81; i++) {
        for (var j = 0; j < 5; j++) {
            array[i].push([]);
        }
    }
    return array;
}

function checkP(array, ind) {
    var p = [];
    var p0 = [];
    var p1 = [];
    var p2 = [];
    p0 = checkX(array, array[ind][1]);
    p1 = checkY(array, array[ind][0]);
    p2 = checkZ(array, array[ind][2]);
    p = reduceP(reduceP(p0, p1), p2);
    return p;
}

function reduceP(p0, p1) {
    var p = [];
    var p0len = p0.length;
    var p1len = p1.length;
    if (p0len >= p1len) {
        for (var i = 0; i < p0.length; i++) {
            for (var j = 0; j < p1.length; j++) {
                if (p0[i] == p1[j]) {
                    p.push(p0[i]);
                }
            }
        }
    }

    if (p0.length < p1.length) {
        for (var i = 0; i < p1.length; i++) {
            for (var j = 0; j < p0.length; j++) {
                if (p1[i] == p0[j]) {
                    p.push(p1[i]);
                }
            }
        }
    }
    return p;
}

function checkX(array, range) {
    var p = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    var ind = 0;
    for (var i = 0; i < 81; i++) {
        if (array[i][1] == range) {
            if (array[i][3] != 0) {
                ind = p.indexOf(array[i][3]);
                p.splice(ind, 1);
            }
        }
    }
    return p;
}

function checkY(array, range) {
    var p = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    var ind = 0;
    for (var i = 0; i < 81; i++) {
        if (array[i][0] == range) {
            if (array[i][3] != 0) {
                ind = p.indexOf(array[i][3]);
                p.splice(ind, 1);
            }
        }
    }
    return p;
}

function checkZ(array, range) {
    var p = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    var ind = 0;
    for (var i = 0; i < 81; i++) {
        if (array[i][2] == range) {
            if (array[i][3] != 0) {
                ind = p.indexOf(array[i][3]);
                p.splice(ind, 1);
            }
        }
    }
    return p;
}

function possibilitiesToArray(p) {
    var array = [];
    for (var i = 0; i < 9; i++) {
        array.push([]);
    }
    for (var i = 0; i < 81; i++) {
        array[Math.floor((i) / 9)].push(p[i][3]);
    }
    return array;
}