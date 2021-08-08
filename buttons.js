// Clear button functionality
function clearBoard(board) {
    board.curves.forEach(
        (element) => { board.removeObject(element) });
}
document.getElementById("clear-btn").onclick = function () { clearBoard(zboard); clearBoard(wboard); }

// Go button funcitonality
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
document.getElementById("go-btn").onclick = function () { setActiveFunction(); }
document.getElementById("function-input").onkeypress = function (e) { if (e.code == "Enter") {setActiveFunction();} }

// Colour choice functionality
var colorOptions = document.getElementsByName("colorOptions");
for (let option of colorOptions) {
    option.addEventListener("change", function() { strokeColor = option.value; });
}
