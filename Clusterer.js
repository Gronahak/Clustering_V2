function Clusterer(
  n_seeds, 
  n_points
  )
{
  this.points = [];
  this.seeds = [];
  this.lines = [];
  this.points_classes = [];
  this.n_points = n_points;
  this.n_seeds = n_seeds;

  this.reset_lines = function() {
    this.lines = [];
  }
  this.reset_points_classes = function() {
    this.points_classes = [];
    for (var i = 0; i < this.n_seeds; i++ ) {
      var tmp_arr = [];
      this.points_classes.push(tmp_arr);
    }
  }
  this.init = function() {
    for (var i = 0; i < this.n_points; i++ ) {
      var point_tmp = new my_point();
      this.points.push(point_tmp);
    }
    for (var i = 0; i < this.n_seeds; i++ ) {
      var seed_tmp = new my_point();
      seed_tmp.rad = 24;
      this.seeds.push(seed_tmp);
      this.reset_points_classes();
    }
  }

  this.show = function() {
   // background(230);

    for (var i = 0; i < this.lines.length; i++ ) {
      this.lines[i].show();
    }
    for (var i = 0; i < this.n_points; i++ ) {
      this.points[i].show();
    }
    for (var i = 0; i < this.n_seeds; i++ ) {
      this.seeds[i].show();
    }
  }

  this.process = function() {
    // looking for the closest seed
    this.reset_points_classes();
    for (var i = 0; i < this.n_points; i++) {
      var min_dist = max(width, height);
      for (var j = 0; j < this.n_seeds; j++ ) {
        var  dist_tmp = my_dist(this.points[i], this.seeds[j]);  
        if ( dist_tmp < min_dist) {
          min_dist = dist_tmp;
          this.points[i].closest_seed = j;
        }
      }
    }


    for (var i = 0; i < this.n_points; i++) {
      var seed_num = this.points[i].closest_seed;
      this.points_classes[seed_num].push(this.points[i]);
      //var line_tmp = new my_line(this.points[i], this.seeds[seed_num]);
      //this.lines.push(line_tmp);
    }
    for (var i = 0; i < this.n_seeds; i++ ) {
      //console.log(this.points_classes);

      var arr_tmp = compute_barycenter(this.points_classes[i]);
      this.seeds[i].set_target(arr_tmp[0], arr_tmp[1]);
    }
  }
  this.run = function() {
    this.reset_lines();
    for (var i = 0; i < this.n_points; i++) {
      //console.log(this.seeds);
      var line_tmp = new my_line(this.points[i], this.seeds[this.points[i].closest_seed]);
      this.lines.push(line_tmp);
    }
    for (var i = 0; i < this.n_seeds; i ++) {
      this.seeds[i].update();
    }
    this.show();
  }

  this.nextStep = function() {

    this.process();
  }

  this.init();
  //this.process();
}