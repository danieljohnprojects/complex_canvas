// Clear button functionality
function clearBoard(board) {
  board.curves.forEach((element) => {
    board.removeObject(element);
  });
}
const clearButton = document.querySelector("#clear-button");
clearButton.addEventListener("click", () => {
  {
    clearBoard(zBoard);
    clearBoard(wBoard);
  }
})

// Go button functionality
/**
 * Sets the active function to the value contained in input element.
 */
function setActiveFunction() {
  const funcStr = document.getElementById("function-input").value;
  try {
    transform_func = math.parse(funcStr);
    document.querySelector("#active-function-readout > p").innerHTML =
      "Active function: \\(f(z) = " + funcStr + "\\)";
    console.log(transform_func);
    MathJax.typeset();
  } catch (err) {
    console.log(err);
    const toast = document.querySelector(".toast");
    toast.classList.remove("show");
    toast.classList.add("show");
    setTimeout(() => { toast.classList.remove("show"); }, 1500);
  }
}

const form = document.querySelector("#function-input-form")
form.addEventListener("submit", (evt) => {
  evt.preventDefault();
  setActiveFunction();
})


// Colour choice functionality
const colourPicker = document.querySelector("#colour-picker-form");
for (let option of colourPicker) {
  option.addEventListener("change", function () {
    strokeColor = this.value;
  });
}
