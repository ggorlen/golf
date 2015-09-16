var box = new Path.Rectangle(view.bounds);
var putt = new Audio("putt.m4a");
box.fillColor = prettyRaCo()
var colors = [255,0,0]
var empty = [1,2];
var op;
var strokes = 0;
var holeOutline = [];


function onFrame(e){
	if(ball.update() == 'new')
		{
		currentLevel++;
		project.activeLayer.clear()
		box = new Path.Rectangle(view.bounds);
		box.fillColor = prettyRaCo()
		console.log(currentLevel)
		if(currentLevel<levels.length)
		loadLevel(levels[currentLevel])
		else {
			showScoreCard(scoreCard)
		}
		//shots.content = 0
		}
}
var levels = [];
var scoreCard = [];
$.each($('.level'),function(i,el){
	var hzds=[];
	scoreCard[i] = 0;
	hazards = JSON.parse(el.attributes.hazards.textContent)
	for(var i=0;i<hazards.length;i++){
		pp = hazards[i]
		for(var j=0;j<pp.segments.length;j++){
				pp.segments[j][0] = pp.segments[j][0]*.01*window.innerWidth
				pp.segments[j][1] = pp.segments[j][1]*.01*window.innerHeight
		}
		hzds.push(pp)
	}
	st = JSON.parse(el.attributes.start.textContent)
	h = JSON.parse(el.attributes.hole.textContent)
	l = {
		walls: JSON.parse(el.attributes.walls.textContent),
		ballStart: new Point(st),
		hazards: hzds,
		hole: new Point(h),
		par: el.attributes.par
	}
	levels.push(l)
});

winW = view.bounds.width
winH = view.bounds.height
var currentLevel = 0;
loadLevel(levels[currentLevel])

function stroke(pt){
	current=shots.content.split('/');
	scoreCard[currentLevel]++;
	//console.dir(current[0])
	shots.content = (parseInt(current[0])+1)+'/'+current[1]
}
var setupPoint = new Point();
function onMouseDown(ev){
	holeOutline.push([Math.floor(ev.point.x/window.innerWidth*100),Math.floor(ev.point.y/window.innerHeight*100)])
	console.log(JSON.stringify(holeOutline))
	if(scan){
		vec = line.segments[0].point-line.segments[1].point
		ball.set('dx', vec.x/10)
		ball.set('dy',vec.y/10)
		line.remove()
		line2.remove()
		scan = false;
		putt.play()
		putt = new Audio("putt.m4a");
		stroke(ev.point)
	}

	//if(ball.shape().hitTest(ev.point)){
		if(ball.get('dx') ==0)
		{setupPoint = ev.point
		setupShot(ev.point)}
	//}
	}
var line,line2;//line 1: from mouse point, line 2, from ball
var scan = false;
function setupShot(pt){
	line = new Path({
		strokeColor: 'black',
		strokeWidth: 1,
		dashArray: [20,10]
	});
	line2 = new Path({
		strokeColor: 'black',
		strokeWidth: 10,
		dashArray: [20,10]
	});
	line.add(setupPoint)//ball.shape().bounds.center)
	//line.add(pt+[0,1])
	line.add(setupPoint+[0,1])
	line2.add(ball.shape().bounds.center)
	line2.add(ball.shape().bounds.center+[0,1])
	//line2.add(ball.shape().bounds.center+(setupPoint-pt))
	scan = true;
}


function onMouseMove(ev){
	console.log('['+Math.floor(ev.point.x/window.innerWidth*100)+','+Math.floor(ev.point.y/window.innerHeight*100)+']')
	if(scan){
		seg = new Path([line.segments[0],ev.point])
		if(seg.length<240)
			{
				line.segments.pop()
				line.add(ev.point)
				line.dashArray = [line.length/100,5]
				line2.segments.pop()
				line2.add(ball.shape().bounds.center-(setupPoint-ev.point))
				line2.dashArray = [line.length/100,5]
			}
			else{
				line.segments.pop()
				line.add(seg.getPointAt(240))
				line.dashArray = [line.length/100,5]
				line2.segments.pop()
				line2.add(line2.segments[0].point-(setupPoint-line.segments[1].point))
				line2.dashArray = [line.length/100,5]
				//line2.add(pt)
			}
	}
}
$('body').keyup(function(e){
	//console.dir(e)
   /*if(e.keyCode == 16){
		 currentLevel--;
		 project.activeLayer.clear()
 		box = new Path.Rectangle(view.bounds);
 		box.fillColor = prettyRaCo()
 		loadLevel(levels[currentLevel])
   }
   if(e.keyCode == 32){
       // user has pressed space
			 currentLevel++;
			 project.activeLayer.clear()
	 		box = new Path.Rectangle(view.bounds);
	 		box.fillColor = prettyRaCo()
	 		loadLevel(levels[currentLevel])
   }*/
	 if(e.keyCode ==27){
		 if(scan){
			 line.remove()
	 		line2.remove()
	 		scan = false;
		 }
	 }
});

function showScoreCard(scoreCard){
	project.activeLayer.clear();
	for(var i=0;i<levels.length;i++){
		parString =''
		for(var j=0;j<levels[i].par.textContent;j++)
			parString+= '\u2022'
			shotsString =''
			for(var j=0;j<scoreCard[i];j++)
				shotsString+= '\u2022'
		dots = new paper.PointText({
				point: [400,70*i+40],
				justification: 'right',
				fillColor: prettyRaCo(),
				fontSize: 30,
				content: 'hole '+(i+1)+': par:'+parString+'\n score:'+shotsString,
				'background-color': 'white'
			});
		var totalStrokes = 0;
		$.each(scoreCard,function() {
	    totalStrokes += this;
		});
		var parTotal = 0;
		$.each(levels,function() {
	    parTotal += parseInt(this.par.textContent);
		});
		score = totalStrokes-parTotal
		scoreText = Math.abs(score)+ (score>0 ? ' over' : ' under')
		if(score===0){
			scoreText = 'even'
		}
			total = new paper.PointText({
					point: [600,400],
					justification: 'left',
					fillColor: 'black',
					fontSize: 110,
					content: scoreText,
					'background-color': 'white'
				});
		gradient(total)
	}
}
