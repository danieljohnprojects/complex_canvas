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
  const funcStr = document.getElementById("function-input").value;
  try {
    transform_func = math.parse(funcStr);
    document.querySelector("#active-function-readout").innerHTML =
      "Active function: \\(f(z) = " + funcStr + "\\)";
    MathJax.typeset();
  } catch (err) {
    console.log("Invalid function.");
    const placeholder = document.getElementById("alert-placeholder");
    const wrapper = document.createElement("div");
    wrapper.innerHTML =
      '<div class="alert alert-warning alert-dismissible" role="alert" id="invalidFunctionAlert">Invalid function<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>';

    placeholder.append(wrapper);
  }
}

const form = document.querySelector("#function-input-form")
form.addEventListener("submit", (evt) => {
  evt.preventDefault();
  setActiveFunction();
})


// Colour choice functionality
const colorOptions = document.getElementsByName("colorOptions");
for (let option of colorOptions) {
  option.addEventListener("change", function () {
    strokeColor = option.value;
  });
}
