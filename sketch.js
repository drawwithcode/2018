var y;
var bombs = [
  {
    "size": 160.17052248353139,
    "x": 719.936172477901,
    "y": -158.17052248353139,
    "v": 1
  },
  {
    "size": 155.46920286957175,
    "x": 540.0147027801722,
    "y": -134.46920286957175,
    "v": 3.0000000000000004
  },
  {
    "size": 105.56928979698569,
    "x": 152.58871398400515,
    "y": 272.6307102030143,
    "v": 12.399999999999988
  },
  {
    "size": 176.12916953628883,
    "x": 233.97542007733136,
    "y": 455.87083046371083,
    "v": 15.999999999999975
  },
  {
    "size": 113.69540351908654,
    "x": 250.21060828585178,
    "y": 93.3045964809135,
    "v": 9.2
  },
  {
    "size": 162.8673201589845,
    "x": 570.9528302075341,
    "y": 585.332679841015,
    "v": 17.39999999999997
  },
  {
    "size": 110.58198288548738,
    "x": 309.8388526355848,
    "y": 53.41801711451268,
    "v": 8.200000000000003
  },
  {
    "size": 160.739702177234,
    "x": 49.38328193966299,
    "y": 519.8602978227656,
    "v": 16.599999999999973
  },
  {
    "size": 103.78974513849244,
    "x": 21.133745717816055,
    "y": 131.41025486150764,
    "v": 9.799999999999997
  },
  {
    "size": 145.29183510225266,
    "x": 338.67851570248604,
    "y": -136.29183510225266,
    "v": 1.9999999999999998
  },
  {
    "size": 124.23682181630284,
    "x": 871.0363746620715,
    "y": -82.23682181630284,
    "v": 4.200000000000001
  },
  {
    "size": 171.44219387322664,
    "x": 189.2514658626169,
    "y": 231.75780612677332,
    "v": 12.799999999999986
  },
  {
    "size": 96.88838978530839,
    "x": 489.53040107153356,
    "y": 189.31161021469165,
    "v": 10.799999999999994
  },
  {
    "size": 150.56926569901407,
    "x": 194.7923082858324,
    "y": 530.0307343009855,
    "v": 16.599999999999973
  },
  {
    "size": 179.8984724166803,
    "x": 784.2266358900815,
    "y": 150.70152758331972,
    "v": 11.59999999999999
  },
  {
    "size": 143.86259398190305,
    "x": 355.08921719156206,
    "y": 657.1374060180964,
    "v": 17.999999999999968
  }
]

function setup() {
  createCanvas(windowWidth, windowHeight);
  y = -height/2;

  for(var i=0; i<bombs.length; i++) {
    bombs[i].size = random(width/10,width/4.5);
    bombs[i].x = random(0,width);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  //
  background(104, 24, 255);
  //
  // push();
  // translate(0,0);
  fill(255,200)
  noStroke();
  for(var i=0; i< bombs.length-5; i++) {
    ellipse(bombs[i].x,bombs[i].y,bombs[i].size)
    bombs[i].y = bombs[i].y + bombs[i].v;
    bombs[i].v += 0.1;
    if ((bombs[i].y-bombs[i].size/2) > height) {
      bombs[i].size = random(100,width/4);
      bombs[i].y = 0 - bombs[i].size;
      bombs[i].x = random(0,width);
      bombs[i].v = 0;
    }
  }
  //
  // pop();
  //
  //   push();
  // translate(width/2,height/2);
  // drawingContext.font = 'bold 576px Anonymous Pro';
  // textAlign(CENTER);
  // fill(104, 24, 255);
  // text('3',12,188);
  // pop();
  //
  //
  // push();
  // translate(width/2,height/2);
  // drawingContext.font = 'italic bold 64px Anonymous Pro';
  // fill(255, 104, 24);
  // textAlign(LEFT);
  // text('CREATIVE',-164,-3);
  // fill(24, 255, 104);
  // text('      ’17',-164,53);
  // fill(255, 104, 24);
  // text('CODING',-164,53);
  // fill(24, 255, 104);
  // drawingContext.font = 'italic 24px Anonymous Pro';
  // text('incredible new flavour',-164,86);
  // pop();

}
