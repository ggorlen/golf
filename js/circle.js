function circle(x, y, r, holePt) {
  var cc = Math.floor(Math.random() * 1536);
  var inthehole = new Audio("inthehole.m4a");
  hole = new paper.Path.Circle(holePt, 13);
  hole.fillColor = "white";
  var c = new paper.Path.Circle(x, y, r);
  c.fillColor = prettyRaCo();
  var that = {
    hole: hole,
    x: x,
    y: y,
    r: r,
    dx: 0,
    dy: 0,
    shape: c,
    window: {
      x: window.innerWidth,
      y: window.innerHeight,
    },
  };
  return {
    set: function (prop, val) {
      that[prop] = val;
    },
    update: function () {
      //sides
      if (that.x + that.r > that.window.x || that.x - that.r < 0) {
        that.dx = that.dx * -1;
      }
      if (that.y + that.r > that.window.y || that.y - that.r < 0)
        that.dy = that.dy * -1;

      //other balls
      if (Math.abs(that.dx) < 0.1 && Math.abs(that.dy) < 0.1) {
        that.dx = 0;
        that.dy = 0;
      }
      that.dx = that.dx * 0.98;
      that.dy = that.dy * 0.98;
      that.x = that.x + that.dx * 0.9;
      that.y = that.y + that.dy * 0.9;
      that.shape.position.x = that.x;
      that.shape.position.y = that.y;
      hitAWall(wallList, that);
      //console.dir(hazardList)
      hitAHazard(hazardList, that);
      distanceFromHole = that.shape.bounds.center.subtract(
        hole.bounds.center,
      ).length;
      that.shape.fillColor = colorWheel(cc);
      cc += 2;
      if (
        distanceFromHole < 10 &&
        Math.abs(that.dx) + Math.abs(that.dy) / 2 < 10
      ) {
        that.shape.remove();
        inthehole.play();
        return "new";
      }
    },
    get: function (prop) {
      return that[prop];
    },
    shape: function (prop, val) {
      that.shape[prop] = val;
      return that.shape;
    },
  };
}
function newDirec(n, v) {
  var u = n.multiply(n.dot(v));
  var w = v.subtract(u);
  return w.subtract(u);
}

function hitAWall(wallList, that, v) {
  for (var k = 0; k < wallList.length; k++) {
    //HIT A WALL?
    wall = wallList[k];
    if (wall.getIntersections(that.shape).length > 0) {
      n = getEdge(wall, wall.getIntersections(that.shape)[0].point);
      //n = wallList[k].getNormalAt(20);
      v = new paper.Point(that.dx, that.dy);
      direc = newDirec(n.normalize(), v);
      that.dx = direc.x;
      that.dy = direc.y;
      that.x = that.x + direc.x;
      that.y = that.y + direc.y;
    }
  }
}

function hitAHazard(hazardList, that) {
  v = new paper.Point(that.dx, that.dy);
  var n;
  for (var k = 0; k < hazardList.length; k++) {
    //HIT A SHAPE?
    hazard = hazardList[k];
    tester = that.shape.clone();
    tester.fillColor = null;
    if (hazard.getIntersections(tester).length > 0) {
      n = getEdge(hazard, hazard.getIntersections(tester)[0].point);
      //console.dir(n)
    }
  }
  if (n) {
    direc = newDirec(n.normalize(), v);
    that.dx = direc.x;
    that.dy = direc.y;
    //that.x = that.x+ direc.x
    //	that.y = that.y+ direc.y
  }
}
function getEdge(path, pt) {
  currentSeg = 0;
  var n;
  for (var i = 0; i < path.length; i = i + 1) {
    distance = path.getLocationAt(i).point;
    //new paper.Path.Circle(distance,15).fillColor = 'blue'
    c = distance.subtract(pt);
    //console.dir(n)
    if (c.length < 5) {
      n = path.getNormalAt(i);
    }
  }
  return n;
}
