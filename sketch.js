let clicked = false;
let cnvWidth, cnvHeight;

function preload(fileName) {
  if (fileName) {
    sound = loadSound(fileName);
  } else {
    // sound = loadSound('/assets/myeyes1.mp3');
    sound = loadSound(
      'https://raw.githubusercontent.com/tommyedmunds/audioVizProd/master/assets/myeyes1.mp3'
    );
  }

  //console.log('sound2 ', sound);
}

function setup() {
  createFileInput((e) => {
    sound = loadSound(e.data);
  }, false);

  console.log(displayWidth, displayWidth);
  cnvHeight = displayHeight / 2;
  cnvWidth = displayWidth / 2;
  let cnv = createCanvas(displayWidth, displayHeight / 1.2);
  cnv.mouseClicked(() => {
    togglePlay();
    clicked = true;
  });
  fft = new p5.FFT();
  console.log(fft);
  sound.amp(0.2);
}
let sphereStuff = 10;
function draw() {
  let spect, wave;
  let backwards;
  background(200);
  //let spectrum = fft.analyze();
  noStroke(55);
  fill(255, 0, 255);
  // for (let i = 0; i < spectrum.length; i++) {
  //   //let x = map(i, 0, spectrum.length, 0, width);
  //   spect = map(i, 0, spectrum.length, 0, width);
  //   let h = -height + map(spectrum[i], 0, 255, height, 0);

  //   rect(spect, height, width / spectrum.length, h);
  //   line(spect, height, width / spectrum.length, h);
  // }

  noFill();
  beginShape();

  background(255);
  //rotateY(millis() / 1000);
  //background(205, 102, 94);
  //sphere(40);
  //rotate(displayWidth / 2, wave / 2);
  let waveform = fft.waveform();
  //console.log(frameCount);

  for (let i = 0; i < waveform.length; i++) {
    wave = map(i, 0, waveform.length, 0, width);
    let y = map(waveform[i], -1, 1, 0, height);
    stroke(50);

    // vertex(wave, y);
    // vertex(0, wave);
    // vertex(wave, 0);
    // vertex(0, -wave);
    if (frameCount === 0) {
      backwards = false;
    } else if (frameCount >= 2000) {
      backwards = true;
    }

    circle(displayWidth / 2, y, wave / 10);

    stroke(100);
    circle(displayWidth / 2, y, wave / 5);

    stroke(150);
    circle(displayWidth / 2, y, wave / 2.5);
    // if (backwards) {
    rotate(frameCount * 0.000005);

    // } else {
    //   rotate(frameCount * 0.055 * 0.000025);
    // }

    //translate(wave, y / 100);
  }

  endShape();
}

function togglePlay() {
  if (sound.isPlaying()) {
    sound.pause();
  } else {
    sound.loop();
  }
}
