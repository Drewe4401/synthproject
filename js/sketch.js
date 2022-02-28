///Andrew Ellender
let sineButton, squareButton, triButton, sawButton, attack, decay, sustain, release, ampLfo, type, freq,rolloff,Q, filtertype, lowbutton, highbutton, lowshebutton, highshebutton, noise, off, w, b, p;
let synth = [];
let ampEnvelope, filter, noisest, noisestop;
let oscTypeText = "Sine";
let backColor = [0,255,255];


function setup() {
  ampLfo = new Tone.LFO('4n', -60, -3).start();
  filtertype = "lowpass";

  createCanvas(windowWidth, windowHeight);

  filt = new Tone.Filter( {
    type : "lowpass" ,
    frequency : 1000 ,
    rolloff : -12 ,
    Q : 2 ,
  }).toDestination();

  synth = new Tone.Synth({
    oscillator: {
      type: "sine"
    },
    envelope: { 
      attack: 0.05,
      decay: 0.5,
      sustain: 1,
      release: 5
    },
  }).connect(filt).toDestination();

  synth2 = new Tone.Synth({
    oscillator: {
      type: "sine"
    },
    envelope: { 
      attack: 0.05,
      decay: 0.5,
      sustain: 1,
      release: 5
    },
  }).connect(filt).toDestination();


  noise = new Tone.Noise()
  .connect(filt)
  .start();

  filt.frequency.value = 200
  noise.type = 'brown' // brown, white, pink 

  
  filterCutoff = createSlider(200, 10000, 1000, 0.1); 
  filterCutoff.position(width/2 - 70,height/2 + 390);

  sineButton = createButton("Sine");
  sineButton.position(width / 2 - 150, height / 2 + 70);
  sineButton.mousePressed(changeSine);

  squareButton = createButton("Square");
  squareButton.position(sineButton.x + 60, height / 2 + 70);
  squareButton.mousePressed(changeSquare);

  triButton = createButton("Triangle");
  triButton.position(squareButton.x + 80, height / 2 + 70);
  triButton.mousePressed(changeTri);

  sawButton = createButton("Sawtooth");
  sawButton.position(triButton.x + 80, height / 2 + 70);
  sawButton.mousePressed(changeSaw);

  attack = createSlider(0, 1, 0.5, 0.01);
  attack.position(width/2 - 140,height/2 + 160);
  decay = createSlider(0, 1, 0.5, 0.01);
  decay.position(width/2 - 140,height/2 + 210);
  sustain = createSlider(0, 1, 0.5, 0.01);
  sustain.position(width/2 + 10,height/2 + 210);
  release = createSlider(0, 1, 0.5, 0.01);
  release.position(width/2 + 10,height/2 + 160);

  lowbutton = createButton("Lowpass");
  lowbutton.position(width / 2 - 160, height / 2 + 280);
  lowbutton.mousePressed(changelow);

  highbutton = createButton("Highpass");
  highbutton.position(lowbutton.x + 80, height / 2 + 280);
  highbutton.mousePressed(changehigh);

  lowshebutton = createButton("Notch");
  lowshebutton.position(lowbutton.x + 160, height / 2 + 280);
  lowshebutton.mousePressed(changenotch);

  highshebutton = createButton("Peaking");
  highshebutton.position(lowbutton.x + 220, height / 2 + 280);
  highshebutton.mousePressed(changepeaking);

  freq = createSlider(0.1, 10, 5, .2);
  freq.position(width/2 - 70,height/2 + 340);

  noisestop = createButton("Stop Noise");
  noisestop.position(width/2-80, height/2 + 430);
  noisestop.mousePressed(stopnoise);

  noisest = createButton("Start Noise");
  noisest.position(noisestop.x + 80, height/2 + 430);
  noisest.mousePressed(startnoise);
}
function draw() {
  background(backColor);
  fill(255);
  textAlign(CENTER);
  textSize(15);
  text(
    "Press Q through U to play low keys\n and A through K for high keys",
    width / 2,
    height / 2
  );
  textSize(12);
  text(
    "Click the buttons to change between oscillator types\n" + oscTypeText,
    width / 2,
    height / 2 + 40
  );


  synth.envelope.attack = attack.value();
  synth.envelope.decay = decay.value();
  synth.envelope.sustain = sustain.value();
  synth.envelope.release = release.value();
  synth2.envelope.attack = attack.value();
  synth2.envelope.decay = decay.value();
  synth2.envelope.sustain = sustain.value();
  synth2.envelope.release = release.value();
  ampLfo.frequency = freq.value();
  ampLfo.connect(synth.volume);
  ampLfo.connect(synth2.volume);
  filt.frequency.value = filterCutoff.value();

 

  text("envelope controller", width/2 + 4, height/2 + 140);
  text("attack", width/2 - 75, height/2 + 150 );
  text("decay", width/2 - 75, height/2 + 200 );
  text("sustain", width/2 + 85, height/2 + 200 );
  text("release", width/2 + 85, height/2 + 150 );

  text("Filter Controller\n" + filtertype, width/2, height/2 + 260 )
  text("LFO Controller\n Frequency", width/2, height/2 + 320);
  text("Filter cutoff for noise", width/2,height/2 + 380);
}

function keyPressed() {
  if (keyCode == 81) {
    synth.triggerAttackRelease("C2", 1);
  } else if (keyCode == 87) {
    synth.triggerAttackRelease("D2", 1);
  } else if (keyCode == 69) {
    synth.triggerAttackRelease("E2", 1);
  } else if (keyCode == 82) {
    synth.triggerAttackRelease("F2", 1);
  } else if (keyCode == 84) {
    synth.triggerAttackRelease("G2", 1);
  } else if (keyCode == 89) {
    synth.triggerAttackRelease("A2", 1);
  } else if (keyCode == 85) {
    synth.triggerAttackRelease("B2", 1);
  } else if (keyCode == 65) {
    synth2.triggerAttackRelease("C6", 1);
  } else if (keyCode == 83) {
    synth2.triggerAttackRelease("D6", 1);
  } else if (keyCode == 68) {
    synth2.triggerAttackRelease("E6", 1);
  } else if (keyCode == 70) {
    synth2.triggerAttackRelease("F6", 1);
  } else if (keyCode == 71) {
    synth2.triggerAttackRelease("G6", 1);
  } else if (keyCode == 72) {
    synth2.triggerAttackRelease("A6", 1);
  } else if (keyCode == 74) {
    synth2.triggerAttackRelease("B6", 1);
  } else if (keyCode === 13) {
    ampEnvelope.triggerAttackRelease('2n')
}
}

function changeSine() {
  synth.oscillator.type = "sine";
  synth2.oscillator.type = "sine";
  oscTypeText = "Sine";
}

function changeSquare() {
  synth.oscillator.type = "square";
  synth2.oscillator.type = "square";
  oscTypeText = "Square";
}

function changeTri() {
  synth.oscillator.type = "triangle";
  synth2.oscillator.type = "triangle";
  oscTypeText = "Triangle";
}

function changeSaw() {
  synth.oscillator.type = "sawtooth";
  synth2.oscillator.type = "sawtooth";
  oscTypeText = "Sawtooth";
}

function changelow(){
  filtertype = "Lowpass";
  filt.type = "lowpass";
}

function changehigh(){
  filtertype = "Highpass";
  filt.type = "highpass";
}

function changepeaking(){
  filtertype = "Peaking";
  filt.type = "peaking";
}

function changenotch(){
  filtertype = "Notch";
  filt.type = "notch";
}

function stopnoise(){
noise.stop();
}

function startnoise(){
  noise.start();
  }