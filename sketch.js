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
  background(20);

  // Verificamos si la pantalla está en vertical (alto mayor que ancho)
  if (height > width) {
    mostrarMensajeGirar();
  } else {
    // Si la pantalla está horizontal, dibuja el sketch normal
    dibujarMiSketch();
  }
}

function mostrarMensajeGirar() {
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(22);
  text("📱 🔄\nPor favor, girá tu pantalla\npara una mejor experiencia", width / 2, height / 2);
}

function dibujarMiSketch() {
  if (img) {
    colorShift = (frameCount * 0.5) % 360;
    let h = colorShift;
    let s = 100;
    let b = 100;

    // Calculamos el tamaño para que cubra la pantalla responsive
    let imgWidth = width;
    let imgHeight = height;

    if (keyIsDown(81)) { // Tecla Q
      isGlitching = true;
    } else {
      isGlitching = false;
    }

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
    fill(255);
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

// Reajusta el lienzo cuando se gira la pantalla o se cambia el tamaño de ventana
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}