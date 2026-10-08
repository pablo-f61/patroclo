let img;
let colorShift = 0;
let isGlitching = false;

function preload() {
  img = loadImage("imagen/gruta.jpg",
    () => console.log("Imagen cargada correctamente"),
    () => console.error("Error: no se pudo cargar la imagen")
  );
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
}

function draw() {
  background(220);

  if (img) {
    colorShift = (frameCount * 0.5) % 360;
    let h = colorShift;
    let s = 100;
    let b = 100;

    if (keyIsDown(81)) {
      isGlitching = true;
    } else {
      isGlitching = false;
    }

    // 📐 PARA OCUPAR TODA LA PANTALLA SIN BARRAS
    let imgWidth = width;   // Ancho = ancho de la pantalla
    let imgHeight = height; // Alto = alto de la pantalla

    if (isGlitching) {
      tint(random(255), random(255), random(255), 255);
      image(img, random(width), random(height), imgWidth, imgHeight);
    } else if (mouseIsPressed) {
      tint(random(255), random(155), random(255), 200);
      image(img, width / 2, height / 2, imgWidth, imgHeight);
    } else {
      colorMode(HSB, 360, 100, 100);
      tint(h, s, b, 200);
      colorMode(RGB, 255);
      image(img, width / 2, height / 2, imgWidth, imgHeight);
    }
  } else {
    textSize(24);
    textAlign(CENTER, CENTER);
    text("Cargando imagen...", width / 2, height / 2);
  }
}

function keyPressed() {
  if (key === 'q' || key === 'Q') {
    isGlitching = true;
  }
}

function keyReleased() {
  if (key === 'q' || key === 'Q') {
    isGlitching = false;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}