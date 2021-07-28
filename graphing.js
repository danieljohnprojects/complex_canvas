var zboard = JXG.JSXGraph.initBoard('inputBox', {
    boundingbox: [-5, 5, 5, -5],
    axis: true
});
var wboard = JXG.JSXGraph.initBoard('outputBox', {
    boundingbox: [-5, 5, 5, -5],
    axis: true
});
zboard.curves = []
wboard.curves = []

var funcstr = document.getElementById("function-input").value;
var transform_func = math.parse(funcstr);

function transform(coords) {
    var z = math.complex(coords[0], coords[1]);
    var w = transform_func.evaluate({z:z});
    return [math.re(w), math.im(w)];
}

var z_curve = null;
var w_curve = null;

zboard.on(
    'down',
    function (evt) {
        var z = event_coords(evt, zboard);
        z_curve = zboard.create(
            "curve", 
            [[z[0]], [z[1]]],
            {highlight: false}
        );
        var w = transform(z);
        w_curve = wboard.create("curve", [[w[0]], [w[1]]]);
    }
);
zboard.on(
    'up',
    function (evt) { 
        z_curve.setAttribute({highlight:true});
        z_curve.image = w_curve;
        z_curve.on("over", function() {this.image.highlight();});
        z_curve.on("out", function() {this.image.noHighlight();});
        w_curve.preimage = z_curve;
        w_curve.on("over", function() {this.preimage.highlight();});
        w_curve.on("out", function() {this.preimage.noHighlight();});
        // Keep track of the curves so we can delete 
        // them later
        zboard.curves.push(z_curve);
        wboard.curves.push(w_curve);
        z_curve = null; 
        w_curve = null; 
    }
);
zboard.on(
    'move',
    function (evt) {
        if (z_curve !== null) {
            var z = event_coords(evt, zboard);
            var w = transform(z);
            z_curve.dataX.push(z[0]);
            z_curve.dataY.push(z[1]);
            w_curve.dataX.push(w[0]);
            w_curve.dataY.push(w[1]);
        }
        zboard.update();
        wboard.update();
    }
)