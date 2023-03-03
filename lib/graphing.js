// Initialise input and output canvases.
const zBoard = JXG.JSXGraph.initBoard("inputBox", {
  boundingbox: [-5, 5, 5, -5],
  axis: true,
});
const wBoard = JXG.JSXGraph.initBoard("outputBox", {
  boundingbox: [-5, 5, 5, -5],
  axis: true,
});

// zBoard.containerObj.children[0].id = "inputBoardSVG";
// wBoard.containerObj.children[0].id = "outputBoardSVG";

zBoard.curves = [];
wBoard.curves = [];

// Get the function that transforms the input to output.
let funcStr = document.getElementById("function-input").value;
// TODO: error handling here.
let transform_func = math.parse(funcStr);

function transform(coords) {
  let z = math.complex(coords[0], coords[1]);
  let w = transform_func.evaluate({ z: z });
  return [math.re(w), math.im(w)];
}

// Initialise the input and output curves.
let z_curve = null;
let w_curve = null;
let strokeColor = "blue"; // Set by radio buttons in buttons.js

// When mouse is clicked, start drawing the curve on the input and output axes.
zBoard.on("down", function (evt) {
  // console.log(evt);
  let z = event_coords(evt, zBoard);
  z_curve = zBoard.create("curve", [[z[0]], [z[1]]], {
    highlight: false,
    strokeColor: strokeColor,
    strokeWidth: 1,
  });
  let w = transform(z);
  w_curve = wBoard.create("curve", [[w[0]], [w[1]]], {
    strokeColor: strokeColor,
    strokeWidth: 1,
  });
});

// When the mouse button is released:
//  - set the curves to highlight with each other.
//  - add the curves to the list of all curves.
//  - reset the current curves.
zBoard.on("up", function (evt) {
  z_curve.setAttribute({ highlight: true });
  z_curve.image = w_curve;
  z_curve.on("over", function () {
    this.image.highlight();
  });
  z_curve.on("out", function () {
    this.image.noHighlight();
  });
  w_curve.preimage = z_curve;
  w_curve.on("over", function () {
    this.preimage.highlight();
  });
  w_curve.on("out", function () {
    this.preimage.noHighlight();
  });
  // Keep track of the curves so we can delete
  // them later
  zBoard.curves.push(z_curve);
  wBoard.curves.push(w_curve);
  z_curve = null;
  w_curve = null;
});

// When the mouse is moved add the new point to the curve.
zBoard.on("move", function (evt) {
  if (z_curve !== null && evt.target.id == "") {
    let z = event_coords(evt, zBoard);
    let w = transform(z);

    // The following was for when I was using evt.layerX to get the event coordinates.
    // Hopefully don't need with evt.offsetX.
    // // Check for weird spiky things.
    // if (
    //   Math.abs(z[0] - z_curve.dataX.at(-1)) > 1 ||
    //   Math.abs(z[1] - z_curve.dataY.at(-1)) > 1
    // ) {
    //   console.log("Big jump detected!");
    //   console.log("Current coords: " + z);
    //   console.log("Mouse move event: " + evt);
    // }

    z_curve.dataX.push(z[0]);
    z_curve.dataY.push(z[1]);
    w_curve.dataX.push(w[0]);
    w_curve.dataY.push(w[1]);
  }
  zBoard.update();
  wBoard.update();
});
