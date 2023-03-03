// Clear button functionality
function clearBoard(board) {
  board.curves.forEach((element) => {
    board.removeObject(element);
  });
}
document.getElementById("clear-btn").onclick = function () {
  clearBoard(zBoard);
  clearBoard(wBoard);
};

// Go button functionality
/**
 * Sets the active function to the value contained in input element.
 */
function setActiveFunction() {
  funcStr = document.getElementById("function-input").value;
  try {
    transform_func = math.parse(funcStr);
    document.querySelector("#activeFunctionReadout").innerHTML =
      "Active function: \\(f(z) = " + funcStr + "\\)";
    MathJax.typeset();
  } catch (err) {
    console.log("Invalid function.");
    placeholder = document.getElementById("alertPlaceholder");
    var wrapper = document.createElement("div");
    wrapper.innerHTML =
      '<div class="alert alert-warning alert-dismissible" role="alert" id="invalidFunctionAlert">Invalid function<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>';

    placeholder.append(wrapper);
  }
}
document.getElementById("go-btn").onclick = function () {
  setActiveFunction();
};
document
  .getElementById("function-input")
  .addEventListener("keydown", function (e) {
    if (e.code == "Enter") {
      setActiveFunction();
    }
  });

// Colour choice functionality
const colorOptions = document.getElementsByName("colorOptions");
for (let option of colorOptions) {
  option.addEventListener("change", function () {
    strokeColor = option.value;
  });
}
