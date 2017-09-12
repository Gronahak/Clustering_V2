var rad = 12;
function my_point() {
  this.pos = createVector(random(width-200)+100, random(height-200)+100);
  this.r = random(255);
  this.g = random(255);
  this.b = random(255);
  this.rad = rad;
  this.closest_seed = -1;
  this.target = createVector(-1, -1);
  this.speed = createVector(0, 0);
  this.n_step = 150;
  this.x_reached = false ;
  this.y_reached = false ;
  this.set_target = function(x, y) {
    this.target.x = x;
    this.target.y = y;
    this.speed = createVector(x-this.pos.x, y-this.pos.y);
    this.speed.setMag(10);
    this.x_reached = false ;
    this.y_reached = false ;
  }

  this.update = function() {
    if (this.pos.x <= this.target.x + 5 && this.pos.x >= this.target.x -5) {
      this.pos.x = this.target.x;
      this.x_reached = true ;
    }
    if (this.pos.y <= this.target.y + 5 && this.pos.y >= this.target.y -5) {
      this.pos.y = this.target.y;
      this.y_reached = true ;
    }
    if (!this.x_reached) {
      this.pos.x += this.speed.x;
    }
    if (!this.y_reached) {
      this.pos.y += this.speed.y;
    }
  }
  this.show = function() { 
    fill(this.r, this.g, this.b);
    noStroke();
    ellipse(this.pos.x, this.pos.y, this.rad, this.rad);
  }
}

function my_dist(p1, p2) {
  return Math.sqrt(Math.pow(p1.pos.x-p2.pos.x, 2)+Math.pow(p1.pos.y-p2.pos.y, 2));
}
function my_line(p1, p2) {
  this.x1 = p1.pos.x;
  this.y1 = p1.pos.y;
  this.x2 = p2.pos.x;
  this.y2 = p2.pos.y;
  this.r = (p1.r + p2.r)/2;
  this.g = (p1.g + p2.g)/2;
  this.b = (p1.b + p2.b)/2;


  this.show = function() {
    stroke(this.r, this.g, this.b, 50);
    line(this.x1, this.y1, this.x2, this.y2);
  }
}

function compute_barycenter(point_list) {
  var bar_x = 0;
  var bar_y = 0;
  var bar_r = 0;
  var bar_g = 0;
  var bar_b = 0;
  //alert(point_list );

  var list_len = point_list.length
    for ( var i = 0; i < list_len; i++ ) {
    bar_x += point_list[i].pos.x;
    bar_y += point_list[i].pos.y;
    bar_r += point_list[i].r;
    bar_g += point_list[i].g;
    bar_b += point_list[i].b;
  }

  bar_x /= max(1, list_len);
  bar_y /= max(1, list_len);
  bar_r /= max(1, list_len);
  bar_g /= max(1, list_len);
  bar_b /= max(1, list_len);

  var ans = [bar_x, bar_y, bar_r, bar_g, bar_b];
  return ans;
}