//Variables of the differential equation
let x, y;

//dy/dx side of differential equation
let slope;

//Slope to angle (to visualize slope field)
let slopeToAngle;

//The scale of the graph
let scl;

//The increment of the slope
let incr;

function setup() {
    createCanvas(800, 800);

    //Default set to 10
    scl = 10;
    //Default set to 1
    incr = 0.5;
}

function draw() {
    //Makes the origin the center of the canvas
    translate(width / 2, height / 2);

    background(0);
    drawGrid();
    stroke(255);

    //Where the magic happens - The algorithm that generates the slope field
    for (y = floor(-height / 2); y <= floor(height / 2); y += (width / scl) * incr) {
        for (x = floor(-width / 2); x <= floor(width / 2); x += (height / scl) * incr) {
            x /= width / scl;
            y /= height / scl;

            //ENTER DIFFERENTIAL EQUATION HERE
            slope = eval("x / y");

            x *= width / scl;
            y *= height / scl;

            slopeToAngle = p5.Vector.fromAngle(radians(getSlopeAngle(slope)), (200 / scl) * incr);
            line(-x - slopeToAngle.x, y - slopeToAngle.y, -x + slopeToAngle.x, y + slopeToAngle.y);
        }
    }
}

//Turns mathematical slope information into an angle in degrees
function getSlopeAngle(slp) {
    return Math.atan(slp) * 180 / Math.PI;
}

//Draws the grid pattern (each marker is 1 unit)
function drawGrid() {
    stroke(255);
    line(0, -height / 2, 0, height / 2);
    line(-width / 2, 0, width / 2, 0);

    stroke(50);

    for (let x = floor(-width / 2); x <= floor(width / 2); x += (height / scl)) {
        line(x, floor(-height / 2), x, floor(height / 2));
    }
    for (let y = floor(-height / 2); y <= floor(height / 2); y += (width / scl)) {
        line(floor(-width / 2), y, floor(width / 2), y);
    }
}