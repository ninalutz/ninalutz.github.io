//generation parameters
let symmetrieNumber = 7; //how many arms the snowflake has (typically 6)
let angleVarianzPIDivider = 2; //PI is divided by this number to define the variance in branching angles
let radius = 220; //randius of the snowflake
let endLength = 1; //length of the branch at which recursions stops

//drawing parameters
let thickness = 0.05; //thicknes of the lines
let thicknesIsLengthDependent = true; //is the stroke thicknes dependent on the lenght of the branch?
let thicknesFactor = 3; //if the stroke thicknes is dependent on the lenght of the branch, this is multiplied with the length which is multiplied with the thickness
let strokeAlpha = 100; //alpha of the lines

//menu
let showMenu = false;

let parentDiv;
let radiusSlider;
let angleVarianzSlider;
let endLengthInput;

let thicknessInput;
let strokeAlphaSlider;
let thicknesLengthToggle;
let thicknessLengthSlider;

let generateButton;

function setup() {

    createCanvas(700, 700);
    background(0);
    generateSnowflake();


    fill(255)
    text("12.9.20", 30, height-30)
}

function keyReleased() {
    console.log(key);
    switch (key) {
        case ' ':
            generateSnowflake();
            break;
        case 'O':
            showMenu = !showMenu;
            showMenu ? parentDiv.show() : parentDiv.hide();
            break;
    }
}

function generateSnowflake() {

    radius = radius;
    angleVarianzPIDivider = angleVarianzPIDivider;
    endLength =endLength;
    thickness = thickness;
    strokeAlpha = strokeAlpha;
    thicknesIsLengthDependent = thicknesIsLengthDependent;
    thicknesFactor = thicknesFactor;

    let seed = random(255);
    for (let i = 0; i < symmetrieNumber; ++i) {
        randomSeed(seed);
        generateBranch(createVector(width / 2, height / 2), radius, (TWO_PI / symmetrieNumber) * i);
    }
}

function generateBranch(origin, length, angle) {
    if (length < endLength) {
        return;
    }

    let randomAngle = random(0, PI / angleVarianzPIDivider);
    push();
    translate(origin.x, origin.y);
    rotate(angle);
    generateBranch(createVector(0, 0), length / 2, 0);
    generateBranch(createVector(length, 0), length / 2, 0);
    generateBranch(createVector(length / 2, 0), length / 2, -randomAngle);
    generateBranch(createVector(length / 2, 0), length / 2, randomAngle);

    let from = color(212, 254, 255, strokeAlpha); 
    let to = color(13, 14, 173, strokeAlpha);
    let strokeColor = lerpColor(from, to, randomAngle/(PI / angleVarianzPIDivider));

    stroke(strokeColor);
    strokeWeight(thicknesIsLengthDependent ? (thickness * (length * thicknesFactor)) : thickness);
    line(0, 0, length, 0);
    pop();
}