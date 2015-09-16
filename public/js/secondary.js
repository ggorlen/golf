
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

 function prettyRaCo2(whiteness)
        {
            var key =  Math.floor(Math.random()*6);
            var text = "rgb(";
            var num =  Math.floor(Math.random()*256);
            whiteness = whiteness%255;
            if(key ==0)
            text= text+ "0,255,"+whiteness+")";
             if(key ==1)
            text= text+ "0,"+whiteness+",255)";
             if(key ==2)
            text= text+ "255, 0,"+whiteness+")";
             if(key ==3)
            text= text+ "255,"+whiteness+",0)";
             if(key ==4)
            text= text+ whiteness+",255,0)";
             if(key ==5)
            text= text+ whiteness+",0,255)";
            return text;
        }
Array.matrix = function(m,n,initial) {
	var a,i ,j,mat = [];
	for(i =0; i < m;i+=1){
		a = [];
		for(j = 0; j < n; j += 1) {
			a[j] = initial;
		}
		mat[i] = a;
	}
	return mat
};



function num(range){
  return Math.floor(Math.random()*range);
}
function numH(){
  return Math.floor(Math.random()*view.size.height);
}
function numW(){
  return Math.floor(Math.random()*view.size.width);
}
function colorWheel(entry)
{
  var key;
  entry = entry%1535
  var text = "rgb(";
  var num = entry%256;
  if(entry >= 0 && entry < 256)
  	text= text+ "0,255,"+num+")";
  else if(entry>255 && entry<512)
      text= text+ "0,"+(255-num)+",255)";
  else if(entry>511 && entry<768)
  	text= text+ num +",0,255)";
  else if(entry>767 && entry<1024)
  	text= text+ "255,0,"+(255-num)+")";
  else if(entry>1023 && entry<1280)
  	text= text+ "255,"+num+",0)";
  else if(entry>1279 && entry<1535)
  	text= text+ (255-num)+",255,0)";
  return text;
}
function gradient(shape,stops,p1,p2){
	shape.fillColor = {
		gradient:{
			stops:[prettyRaCo(),prettyRaCo(),prettyRaCo()]},
			origin: [0,Math.random()*screen.availHeight],
			destination: [screen.availWidth,Math.random()*screen.availHeight]
					};
}
