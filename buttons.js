function clearBoard(board) {
    board.curves.forEach(
        (element) => { board.removeObject(element) });
}

/**
 * Sets the active function to the value contained in input element.
 */
function setActiveFunction() {
    funcstr = document.getElementById("function-input").value;
    transform_func = math.parse(funcstr);
}

// function setActiveFunctionOnEnter(e) {
//     if (e.key === 'enter') {
//         setActiveFunction(element);
//     }
// }

document.getElementById("clear-btn").onclick = function () { clearBoard(zboard); clearBoard(wboard); }

document.getElementById("go-btn").onclick = function () { setActiveFunction(); }
