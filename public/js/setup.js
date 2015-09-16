var wallList = [];
var hazardList = [];
//
function loadLevel(level){

	hazardList = []
	wallList = []
	for(var i =0;i<level.hazards.length;i++){
		h = level.hazards[i]
		pp = new paper.Path(h)
		if(h.sm)
			pp.smooth()
		hazardList.push(pp)
	}

	for(var i =0;i<level.walls.length;i++){
		w = wall(level.walls[i])
		wallList.push(w)
	}
	hole = new paper.Point(level.hole.x*(.01*window.innerWidth),level.hole.y*(.01*window.innerHeight))
	ball = circle(level.ballStart.x*(.01*window.innerWidth),level.ballStart.y*(.01*window.innerHeight),8,hole)
	shots = new paper.PointText({
			point: [window.innerWidth*.05,window.innerHeight*.1],
			justification: 'center',
			fillColor: 'white',
			strokeColor:'black',
			strokeWidth: 2,
			fontSize: window.innerHeight*.1,
			content: 0+'/'+level.par,
			'background-color': 'white'
		});
		shots.content = 0+'/'+level.par.textContent


function wall(points){
	for(var i=0;i<points.length;i++){
			points[i][0] = points[i][0]*(.01*window.innerWidth)
			points[i][1] = points[i][1]*(.01*window.innerHeight)
		}
	w = new paper.Path({
		segments: points,
		strokeColor: 'black',
		strokeWidth: 8
	})
	return w;
}
}
