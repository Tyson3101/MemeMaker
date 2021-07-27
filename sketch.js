let canvas;
let inputBox;
let img;
let fontSizeSlider;
let saveBtn;
let memeName;
let imgUrlInput;

function setup() {
  canvas = createCanvas(500, 500);
  let documentBody = select("body");
  let pInput = createP("Meme Caption: ");
  inputBox = createInput("Meme Caption");
  inputBox.size(200, 30);
  inputBox.parent(pInput);
  let memeUrlInput = createP("Image URL: ");
  imgUrlInput = createInput("https://.png");
  imgUrlInput.size(200, 30);
  imgUrlInput.parent(memeUrlInput);
  let imgUrlSubmit = createButton("Upload Image");
  imgUrlSubmit.parent(memeUrlInput);
  let pFont = createP("Font Size: ");
  fontSizeSlider = createSlider(10, 100, 55, 2);
  fontSizeSlider.parent(pFont);
  memeName = createInput("MemeName.png");
  memeName.size(130, 20);
  saveBtn = createButton("Save Meme");
  imgUrlSubmit.mouseClicked(() => {
    try {
      img = loadImage(imgUrlInput.value());
    } catch (e) {
      return e;
    }
  });
  saveBtn.mouseClicked(saveMeme);
  documentBody.drop((file) => {
    img = loadImage(file.data);
  });
}

function draw() {
  background(0);
  fill(255);
  rect(0, 0, width, 55);
  if (img) {
    img.resize(width, height - 55);
    image(img, 0, 55);
  } else {
    push();
    fill(255);
    textSize(50);
    textAlign(CENTER);
    text(
      "Drag image here or Paste Image URL below!",
      0,
      (height - 55) / 3,
      width,
      height - 55
    );
    pop();
  }
  fill(0);
  textSize(fontSizeSlider.value());
  textAlign(CENTER);
  text(inputBox.value(), 0, 0, width, 55);
}

function saveMeme() {
  saveCanvas(
    canvas,
    memeName.value().split(".")[0],
    memeName.value().split(".")[1] || "png"
  );
}
