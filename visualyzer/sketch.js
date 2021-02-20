let music;
let fft;
let filter;
let canvasWidth;
let canvasHeight;
let discX;
let discY;

function preload() {
    music = loadSound('assets/JOMANDA.mp3');
    img = loadImage('assets/music_record_disc.png');
}

function setup() {
    canvasWidth = 800;
    canvasHeight = 600;
    angle = 0;

    fft = new p5.FFT();
    filter = new p5.BandPass();
    music.disconnect();
    music.connect(filter);
    music.amp(0.1);

    let cnv = createCanvas(canvasWidth, canvasHeight);
    cnv.mouseClicked(togglePlay);

    textAlign(CENTER);
}

function draw() {
    background(0);

    text('<-   frequency   ->', width / 2, 20);
    push();
    translate(width - 20, height / 2);
    rotate(radians(90));
    text('<-   resonance   ->', 0, 0);
    pop();

    //バンドパスフィルター
    let freq = map(mouseX, 0, width, 20, 22000 * (600 / 1024), true);
    filter.freq(freq);
    let res = map(mouseY, 0, height, 0.001, 2, true);
    filter.res(res);

    //周波数スペクトル
    let spectrum = fft.analyze();
    noStroke();
    fill(255);
    for (let i = 0; i < 600; i += 3) {
        let x = map(i, 0, 600, 0, width);
        let h = -height + map(spectrum[i], 0, 255, height, 0);
        rect(x, height, 3, h)
    }

    //振幅波形
    let waveform = fft.waveform();
    noFill();
    beginShape();
    stroke(255);
    for (let i = 0; i < waveform.length; i++) {
        let x = map(i, 0, waveform.length, 0, width);
        let y = map(waveform[i], -1, 1, 0, height);
        vertex(x, y);
    }
    endShape();

    //レコード盤
    discX = constrain(mouseX, 0, width);
    discY = constrain(mouseY, 0, height);
    push();
    translate(discX, discY);
    imageMode(CENTER);
    rotate(radians(angle));
    image(img, 0, 0, 100, 100);
    pop();

    if (music.isPlaying()) {
        angle += 1;
    } else {
        text('click to play', width / 2, 100);
    }
}

function togglePlay() {
    if (music.isPlaying()) {
        music.pause();
    } else {
        music.loop();
    }
}