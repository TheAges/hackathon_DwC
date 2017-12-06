var face,
    gameOver=false;
    W = 1,
    moltpex=0.1,
    lev=0;

function preload() {
  font =  loadFont("assets/lobster.otf")
  cap = loadImage("assets/cap.png")
  faceDown = loadImage("assets/faceDown.png")
  denti = loadImage("assets/denti.png")
  cornaDx = loadImage("assets/cornaDx.png")
  cornaSx = loadImage("assets/cornaSx.png")
  flame = loadImage("assets/flame.png")
}

function setup() {
  createCanvas(windowWidth,windowHeight)
  imageMode(CENTER)
  noStroke()

  if (windowWidth > windowHeight) {W = windowHeight/500} else {W = windowWidth/500}

  mic = new p5.AudioIn();
	mic.start();
}

function draw() {
  var Rand = random(-1, 1)

  var vol = mic.getLevel();
  //console.log(vol*10)
  if (lev < 1) {lev += vol*moltpex;} //sensilbilità crescità valore lev
  if (lev > 1) {lev = 1}
  if ((lev>0)&&(gameOver!=true)) {lev -= 0.0075;}  //sensilbilità ritorno a 0
  if (lev>0.6) {gameOver=true;moltpex*=2}
  console.log(lev)

  var back = (lerpColor(color("#39b249"),color("#bc1616"),lev));

  background(back)

  translate(width/2,height/2)

  image(flame,0,map(lev,0,1,200*W,10+Rand*5),width,height)

  // push()
  // imageMode(CORNERS)
  //   image(flame,200*W,200*W,width-200*W,width-200*W)
  // pop()
  image(cornaDx,map(lev,0,1,100*W,5),map(lev,0,1,100*W,5),500*W,500*W)
  image(cornaSx,map(lev,0,1,-100*W,5),map(lev,0,1,100*W,5),500*W,500*W)

  image(faceDown,0,0,500*W,500*W)


  //occhi:
  push()
  noStroke()
    fill(lerpColor(color("#000000"),color("#f41f1f"),lev))
      ellipse(-50*W,-40*W,40*W)
      ellipse(50*W,-40*W,40*W)
    fill("black")
      ellipse(-50*W,-40*W,5*W)
      ellipse(50*W,-40*W,5*W)
    fill("#f5c8ab")
    ellipse(-50*W,map(lev,0,1,-42*W,-77*W+Rand*3),40*W)
    ellipse(50*W,map(lev,0,1,-42*W,-77*W+Rand*3),40*W)
    fill("black")
    rect()
  pop()

  //bocca:
  push()
  noStroke()
  fill("black")
    ellipse(0*W,50*W,60*W,map(lev,0,1,2*W,50*W+Rand*3))
    image(denti,-1,0,500*W,500*W)
  pop()

  image(cap,0,0,500*W,500*W)

  push()
  fill(255,0,0,255-(frameCount*2))
  stroke(255,252,255,255-(frameCount*2))
  strokeWeight(3*W)
  textFont(font)
  textSize(70)
  textAlign(CENTER)
  text("Don't wake santa claus!",0,height*0.3)
  pop()



}

function windowResized() { //redi la finestra Responsive
  resizeCanvas(windowWidth, windowHeight);

 if (windowWidth > windowHeight) {W = windowHeight/500} else {W = windowWidth/500}
}