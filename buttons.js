function clearBoard(board) {
    board.curves.forEach(
        (element) => { board.removeObject(element) });
}

/**
 * Sets the active function to the value contained in input element.
 */
function setActiveFunction() {
    funcstr = document.getElementById("function-input").value;
    try {
        transform_func = math.parse(funcstr);
        document.querySelector("#activeFunctionReadout").innerHTML = 
            "Active function: \\(f(z) = " + funcstr + "\\)";
        MathJax.typeset();
    }
    catch(err) {
        console.log("Invalid function.");
        placeholder = document.getElementById("alertPlaceholder");
        var wrapper = document.createElement('div');
        wrapper.innerHTML = '<div class="alert alert-warning alert-dismissible" role="alert" id="invalidFunctionAlert">Invalid function<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>';

        placeholder.append(wrapper);
    }
}

// function setActiveFunctionOnEnter(e) {
//     if (e.key === 'enter') {
//         setActiveFunction(element);
//     }
// }

document.getElementById("clear-btn").onclick = function () { clearBoard(zboard); clearBoard(wboard); }

document.getElementById("go-btn").onclick = function () { setActiveFunction(); }

document.getElementById("function-input").onkeypress = function (e) { if (e.code == "Enter") {setActiveFunction();} }
