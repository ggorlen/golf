var mongoose = require('mongoose')
var express = require('express');
var Level = require('../models/level');
var router = express.Router();
var levels = []
var Level = require('../models/level');
/* GET home page. */
router.get('/', function(req, res, next) {
  Level.find(function(err,docs){
  levels = docs//[docs[docs.length-1]];
  //console.dir(JSON.stringify(docs[0]))
    //res.render('index', { levels: levels });
    res.render('index', { levels: [lev] });
  });
});

module.exports = router;

var lev = {
  name: 'standard4',
  walls: [
[[45,24],[57,36]],
[[45,64],[57,76]],
[[64,56],[75,66]]
     ],
     par: 2,
     ballStart: [20,43],
  hole: [73,84],
  hazards:  [
    {
      segments:[[15,20],[13,71],[38,89],[76,92],[91,71],[85,31],[64,14],[31,9]],
      fillColor: prettyRaCo(),
      closed:true,
      sm:true
    },
    {
      segments:[[25,54],[19,65],[31,78],[39,69],[31,52]],
      fillColor: prettyRaCo(),
      closed:true,
      sm:true
    }
]
}
n = new Level(lev);
//n.save() //uncomment and save to add level
function prettyRaCo()
{
    var colorWheel =  Math.floor(Math.random()*6);
    var color = "rgb(";
    var randomNumber =  Math.floor(Math.random()*256);
    if(colorWheel ==0)
    color= color+ "0,255,"+randomNumber+")";
     if(colorWheel ==1)
    color= color+ "0,"+randomNumber+",255)";
     if(colorWheel ==2)
    color= color+ "255, 0,"+randomNumber+")";
     if(colorWheel ==3)
    color= color+ "255,"+randomNumber+",0)";
     if(colorWheel ==4)
    color= color+ randomNumber+",255,0)";
     if(colorWheel ==5)
    color= color+ randomNumber+",0,255)";
    return color;
}
