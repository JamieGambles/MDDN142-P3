// vocal, drum, bass, and other are volumes ranging from 0 to 100

// initialise arrays
let star = [];
let radial = [];
let spawnx = [];
let spawny = [];

function draw_one_frame(vocal, drum, bass, other, counter) {

  // set origin to centre
  translate(width / 2, height / 2);

  // set base space colour
  let bgcol = 25;

  // resets counter at given point, and creates inverse. used to create a smooth transition back to background colour
  let inc2 = 1 / (counter - 5125);

  // counter used to toggle between background colours at specific points in song
  if (counter > 2560) {
    bgcol = 255;
  }

  if (counter > 5125) {
    bgcol = 25 + 230 * (inc2 * 2);
  }

  if (counter > 8960) {
    bgcol = 255;
  }

  // set space colour
  background(bgcol);

  // calls other for volume parameters
  startravel(star, other);

  // other volume parameters for star to spawn
  if (star[counter] > 60 && star[counter] < 75 && star[counter - 1] < star[counter]) {
    radial.push(0);
  }

  for (var i = 0; i < star.length; i++) {

    // area parameters for star to spawn
    let rx = random(-100, 100);
    let ry = random(-100, 100);

    // moves spawn of star if too close to centre to preserve parallax
    if (rx < 25 && rx > -25 && ry < 25 && ry > -25) {

      rx = random(-25, -100);
      ry = random(-25, -100);
    }

    spawnx.push(rx);
    spawny.push(ry);
  }

  // set speed of stars proportionate to drum
  let starspeed = map(drum, 0, 100, 0, 10);

  // multiplier for starspeed
  let starmult = 50;

  // origin of starspawn
  let start = 0;

  // draws lightspeed lines and stars
  for (rad in radial) {

    // arrays of star position
    let rx = spawnx[start];
    let ry = spawny[start];

    // movement of star
    let xmod = radial[rad] * rx / starmult * starspeed;
    let ymod = radial[rad] * ry / starmult * starspeed;

    // appearance of lightspeed lines
    stroke(50);
    strokeWeight(1);

    // draws lightspeed line
    line(rx - xmod, ry - ymod, rx - xmod / 10, ry - ymod / 10);

    // set fill of star proportionate to distance away from centre, as well as volume of drum
    fill(200 - xmod, 100 - xmod, 50 + drum);
    noStroke();

    // draws star
    ellipse(rx + xmod, ry + ymod, radial[rad]);

    // increases of loop duration
    radial[rad] += 1;
    start++
  }

  // multiplier for perspective of ship
  let div = 2 / 3;

  // parallax multipliers for vertices at front of ship
  let xpara = map(vocal, 0, 100, 200, -200);
  let ypara = map(bass, 0, 100, -50, 150);

  // parallax multiplers for vertices at back of ship
  let xpara2 = xpara * 2;
  let ypara2 = ypara * 2;

  push()

  // set appearance of ship
  scale(.5);
  noStroke();

  // starts at 1, exponential to 0, used to make the 'swoop in' speed slow down as the ship reaches its rest position
  let inc = 1 / counter;

  // set origin of ship outside of the frame
  translate(0, 1000);

  // creates the 'swoop in' effect. In the first 200 franes, translate the ship upwards proportionate to the inverse of the framecount
  if (counter < 500) {
    translate(0, -650 + (1000 * (inc * 5)));
  }

  // once the 'swoop in' effect has played ship stays at the resting position of the effect
  else {
    translate(0, -650);
  }

  // set tilt ammount of ship proportionate to its x displacement (both tied to vocal)
  let rotateamm = map(vocal, 0, 100, -20, 20);

  // set panel colour of ship proportionate to its x displacement (gives metallic effect)
  let panelcol = map(vocal, 0, 100, 150, -150);

  // tilts ship
  rotate(rotateamm);

  fill(10 + panelcol);

  // outer panel of right wing of ship
  beginShape();
  vertex(550 + xpara2, -100 + ypara2);
  vertex(675 + xpara2, 0 + ypara2);
  vertex(500 * div + xpara, -200 + ypara);
  vertex(450 * div + xpara, -225 + ypara);
  endShape(CLOSE);

  fill(200 + panelcol);

  // outer panel of left wing of ship
  beginShape();
  vertex(-550 + xpara2, -100 + ypara2);
  vertex(-675 + xpara2, 0 + ypara2);
  vertex(-500 * div + xpara, -200 + ypara);
  vertex(-450 * div + xpara, -225 + ypara);
  endShape(CLOSE);

  fill(25 + panelcol);

  // inner panel right wing of ship
  beginShape();
  vertex(300 + xpara2, -75 + ypara2);
  vertex(250 * div + xpara, -200 + ypara);
  vertex(250 * div + xpara, -250 + ypara);
  vertex(300 + xpara2, -150 + ypara2);
  endShape(CLOSE);

  fill(10 + panelcol);

  // inner panel of left wing of ship
  beginShape();
  vertex(-300 + xpara2, -75 + ypara2);
  vertex(-250 * div + xpara, -200 + ypara);
  vertex(-250 * div + xpara, -250 + ypara);
  vertex(-300 + xpara2, -150 + ypara2);
  endShape(CLOSE);

  fill(25 + panelcol);

  // right panel of centre of ship
  beginShape();
  vertex(250 + xpara2, -75 + ypara2);
  vertex(200 * div + xpara, -200 + ypara);
  vertex(200 * div + xpara, -250 + ypara);
  vertex(250 + xpara2, -150 + ypara2);
  endShape(CLOSE);

  fill(25 + panelcol);

  // left panel of centre of ship
  beginShape();
  vertex(-250 + xpara2, -75 + ypara2);
  vertex(-200 * div + xpara, -200 + ypara);
  vertex(-200 * div + xpara, -250 + ypara);
  vertex(-250 + xpara2, -150 + ypara2);
  endShape(CLOSE);

  fill(125 + panelcol);

  // top panel of right wing of ship
  beginShape();
  vertex(300 + xpara2, -150 + ypara2);
  vertex(250 * div + xpara, -250 + ypara);
  vertex(450 * div + xpara, -225 + ypara);
  vertex(550 + xpara2, -100 + ypara2);
  endShape(CLOSE);

  fill(125 + panelcol);

  // top panel of left wing of ship
  beginShape();
  vertex(-300 + xpara2, -150 + ypara2);
  vertex(-250 * div + xpara, -250 + ypara);
  vertex(-450 * div + xpara, -225 + ypara);
  vertex(-550 + xpara2, -100 + ypara2);
  endShape(CLOSE);

  fill(100 + panelcol);

  // top right panel of centre of ship
  beginShape();
  vertex(250 + xpara2, -150 + ypara2);
  vertex(0 + xpara2, -200 + ypara2);
  vertex(0 * div + xpara, -275 + ypara);
  vertex(200 * div + xpara, -250 + ypara);
  endShape(CLOSE);

  fill(150 + panelcol);

  // top left panel of centre of ship
  beginShape();
  vertex(-250 + xpara2, -150 + ypara2);
  vertex(0 + xpara2, -200 + ypara2);
  vertex(0 * div + xpara, -275 + ypara);
  vertex(-200 * div + xpara, -250 + ypara);
  endShape(CLOSE);

  fill(10);

  // back panel of centre of ship
  beginShape();
  vertex(0 + xpara2, -200 + ypara2);
  vertex(-250 + xpara2, -150 + ypara2);
  vertex(-250 + xpara2, -75 + ypara2);
  vertex(-200 + xpara2, -50 + ypara2);
  vertex(200 + xpara2, -50 + ypara2);
  vertex(250 + xpara2, -75 + ypara2);
  vertex(250 + xpara2, -150 + ypara2);
  endShape(CLOSE);

  fill(10);

  // back panel of right wing of ship
  beginShape();
  vertex(300 + xpara2, -75 + ypara2);
  vertex(300 + xpara2, -150 + ypara2);
  vertex(550 + xpara2, -100 + ypara2);
  vertex(675 + xpara2, 0 + ypara2);
  endShape(CLOSE);

  fill(10);

  // back panel of left wing of ship
  beginShape();
  vertex(-300 + xpara2, -75 + ypara2);
  vertex(-300 + xpara2, -150 + ypara2);
  vertex(-550 + xpara2, -100 + ypara2);
  vertex(-675 + xpara2, 0 + ypara2);
  endShape(CLOSE);

  // multiplier for colour increments
  let colourmult = map(bass, 0, 100, 255, -255) / 3;

  fill(88 + colourmult, 50 - colourmult, 168 + colourmult);

  // inner panel of centre thruster
  beginShape();
  vertex(0 + xpara2, -175 + ypara2);
  vertex(-225 + xpara2, -125 + ypara2);
  vertex(-225 + xpara2, -93.25 + ypara2);
  vertex(-187.5 + xpara2, -75 + ypara2);
  vertex(187.5 + xpara2, -75 + ypara2);
  vertex(225 + xpara2, -93.25 + ypara2);
  vertex(225 + xpara2, -125 + ypara2);
  endShape(CLOSE);

  fill(88 + colourmult, 50 - colourmult, 168 + colourmult);

  // inner panel of right wing thruster
  beginShape();
  vertex(325 + xpara2, -119.5 + ypara2);
  vertex(325 + xpara2, -95.5 + ypara2);
  vertex(579.15 + xpara2, -44.665 + ypara2);
  vertex(539.1325 + xpara2, -76.6784 + ypara2);
  endShape(CLOSE);

  fill(88 + colourmult, 50 - colourmult, 168 + colourmult);

  // inner panel of left wing thruster
  beginShape();
  vertex(-325 + xpara2, -119.5 + ypara2);
  vertex(-325 + xpara2, -95.5 + ypara2);
  vertex(-579.15 + xpara2, -44.665 + ypara2);
  vertex(-539.1325 + xpara2, -76.6784 + ypara2);
  endShape(CLOSE);

  // loops thruster effect
  for (var i = 0; i < 100; i++) {

    // parallax multiplier for thruster effect increments
    let thrusterxpara = map(vocal, 0, 100, 100, -100);
    let thrusterypara = map(bass, 0, 100, -25, 75);

    // thruster vertical increments
    let thrusterincr = i * 2 + i;

    // increment ammount for perspective of thruster effect
    let yamm2 = i / 15;
    let yamm = .1 * yamm2;
    let xamm2 = i / 15;
    let xamm = .1 * xamm2;

    // multiplier for colour increments
    let colourmult = map(bass, 0, 100, -255, 255) / 3;

    // incremental change of opacity and colour
    let incr = 255 - i * map(bass, 0, 100, 50, 0);

    // appearance of thruster effect
    strokeWeight(2);
    noFill();

    // set thruster colour and opacity proportionate to bass
    stroke(0 + incr + colourmult, 255 - incr - colourmult, 132 + incr + colourmult, incr);

    // thruster effect for centre thruster
    beginShape();
    vertex(0 + (0 * xamm + thrusterxpara * xamm2) + xpara2, (-175 + (-175 * yamm + thrusterypara * yamm2) + ypara2) + thrusterincr);
    vertex(-225 + (-225 * xamm + thrusterxpara * xamm2) + xpara2, (-125 + (-125 * yamm + thrusterypara * yamm2) + ypara2) + thrusterincr);
    vertex(-225 + (-225 * xamm + thrusterxpara * xamm2) + xpara2, (-93.25 + (-93.25 * yamm + thrusterypara * yamm2) + ypara2) + thrusterincr);
    vertex(-187.5 + (-187.5 * xamm + thrusterxpara * xamm2) + xpara2, (-75 + (-75 * yamm + thrusterypara * yamm2) + ypara2) + thrusterincr);
    vertex(187.5 + (187.5 * xamm + thrusterxpara * xamm2) + xpara2, (-75 + (-75 * yamm + thrusterypara * yamm2) + ypara2) + thrusterincr);
    vertex(225 + (225 * xamm + thrusterxpara * xamm2) + xpara2, (-93.25 + (-93.25 * yamm + thrusterypara * yamm2) + ypara2) + thrusterincr);
    vertex(225 + (225 * xamm + thrusterxpara * xamm2) + xpara2, (-125 + (-125 * yamm + thrusterypara * yamm2) + ypara2) + thrusterincr);
    endShape(CLOSE);

    // thruster effect for right wing thruster
    beginShape();
    vertex(325 + (325 * xamm + thrusterxpara * xamm2) + xpara2, (-119.5 + (-119.5 * yamm + thrusterypara * yamm2) + ypara2) + thrusterincr);
    vertex(325 + (325 * xamm + thrusterxpara * xamm2) + xpara2, (-95.5 + (-95.5 * yamm + thrusterypara * yamm2) + ypara2) + thrusterincr);
    vertex(579.15 + (579.15 * xamm + thrusterxpara * xamm2) + xpara2, (-44.665 + (-44.665 * yamm + thrusterypara * yamm2) + ypara2) + thrusterincr);
    vertex(539.1325 + (539.1325 * xamm + thrusterxpara * xamm2) + xpara2, (-76.6784 + (-76.6784 * yamm + thrusterypara * yamm2) + ypara2) + thrusterincr);
    endShape(CLOSE);

    // thruster effect for left wing thruster
    beginShape();
    vertex(-325 + (-325 * xamm + thrusterxpara * xamm2) + xpara2, (-119.5 + (-119.5 * yamm + thrusterypara * yamm2) + ypara2) + thrusterincr);
    vertex(-325 + (-325 * xamm + thrusterxpara * xamm2) + xpara2, (-95.5 + (-95.5 * yamm + thrusterypara * yamm2) + ypara2) + thrusterincr);
    vertex(-579.15 + (-579.15 * xamm + thrusterxpara * xamm2) + xpara2, (-44.665 + (-44.665 * yamm + thrusterypara * yamm2) + ypara2) + thrusterincr);
    vertex(-539.1325 + (-539.1325 * xamm + thrusterxpara * xamm2) + xpara2, (-76.6784 + (-76.6784 * yamm + thrusterypara * yamm2) + ypara2) + thrusterincr);
    endShape(CLOSE);
  }
}

function startravel(waveform, data) {
  waveform.push(data);
}
