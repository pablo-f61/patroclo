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
  background(255);

  // Si la pantalla es más alta que ancha (celular en vertical)
  if (height > width) {
    dibujarMiSketchVertical();
  } else {
    // Pantalla horizontal (computadora o celular girado)
    dibujarMiSketchHorizontal();
  }
}

function mostrarMensajeGirar() {
  // Fondo oscuro semitransparente para destacar el mensaje
  push();
  fill(255);
  rectMode(CORNER);
  rect(0, 0, width, height);

  // Texto de aviso
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(22);
  text("📱 🔄\nPor favor, girá tu pantalla\npara una mejor experiencia", width / 2, height - 80);
  pop();
}

function calcularDimensionesProporcionales() {
  // Mantiene la proporción de la imagen original sin deformar/estirar
  let imgAspect = img.width / img.height;
  let canvasAspect = width / height;
  let renderW, renderH;

  if (canvasAspect > imgAspect) {
    renderH = height;
    renderW = height * imgAspect;
  } else {
    renderW = width;
    renderH = width / imgAspect;
  }
  return { w: renderW, h: renderH };
}

function dibujarMiSketchHorizontal() {
  if (!img) {
    mostrarCargando();
    return;
  }

  let dims = calcularDimensionesProporcionales();
  renderizarImagen(width / 2, height / 2, dims.w, dims.h);
}

function dibujarMiSketchVertical() {
  if (!img) {
    mostrarCargando();
    return;
  }

  let dims = calcularDimensionesProporcionales();
  
  // En vertical posicionamos la obra un poco más arriba (al 40% de la altura)
  renderizarImagen(width / 2, height * 0.4, dims.w * 0.85, dims.h * 0.85);

  // Superponemos el cartel aviso en la parte inferior sin tapar la obra
  mostrarMensajeGirar();
}

function renderizarImagen(posX, posY, imgW, imgH) {
  colorShift = (frameCount * 0.5) % 360;
  let h = colorShift;
  let s = 100;
  let b = 100;

  if (keyIsDown(81)) { // Tecla Q
    isGlitching = true;
  } else {
    isGlitching = false;
  }

  if (isGlitching) {
    tint(random(255), random(255), random(255), 255);
    image(img, random(width), random(height), imgW, imgH);
  } else if (mouseIsPressed) {
    tint(random(255), random(155), random(255), 200);
    image(img, posX, posY, imgW, imgH);
  } else {
    colorMode(HSB, 360, 100, 100);
    tint(h, s, b, 200);
    colorMode(RGB, 255);
    image(img, posX, posY, imgW, imgH);
  }
}

function mostrarCargando() {
  fill(255);
  textSize(24);
  textAlign(CENTER, CENTER);
  text("Cargando imagen...", width / 2, height / 2);
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