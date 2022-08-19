var bird;
var pipes = [];

var score = 0;
var highscore = 0;

function setup() {
  createCanvas(640, 480);
  bird = new Bird();
  pipes.push(new Pipe());
}

function draw() {
  background(0);

  for (var i = pipes.length-1; i >= 0; i--) {
    pipes[i].show();
    pipes[i].update();

    if (pipes[i].hits(bird)) {
      reset();
      return;
    }
    
    if(pipes[i].passes(bird)) {
      score++;
    }

    if (pipes[i].offscreen()) {
      pipes.splice(i, 1);
    }
  }

  bird.update();
  bird.show();

  if (frameCount % 75 == 0) {
    pipes.push(new Pipe());
  }
  
  textSize(18);
  text("Current Score: " + score, 10, 26 )
  text("Highscore: " + highscore, width - 115, 26)
}

function keyPressed() {
  if (key == ' ') {
    bird.up();
  }
}

function reset() {
  bird = new Bird();
  pipes = []; 
  if(highscore < score) highscore = score;
  score = 0;
}

