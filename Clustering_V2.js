var my_points = [];
var clusterer ;
var cnt = 0;
function setup() {
  createCanvas(1900, 960);
  
  clusterer = new Clusterer(4,500);
  clusterer.process();
}

function draw() {
  background(19);
  clusterer.run();
  if (cnt == 20) {
     cnt = 0;
     clusterer.nextStep();
  }
  cnt++;
}