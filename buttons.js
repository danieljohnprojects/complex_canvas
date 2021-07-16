function clearBoard(board) {
    board.curves.forEach(
        (element) => { board.removeObject(element) });
}

document.getElementById("clear").onclick = function () { clearBoard(zboard); clearBoard(wboard); }

document.getElementById("go").onclick = function () {
    funcstr = document.getElementById("userFunction").value;
    transform_func = math.parse(funcstr);
    clearBoard(zboard); 
    clearBoard(wboard);
}
