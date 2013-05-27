var app = app||{};

(function($){
	app.shapes={
			drawNodeCircle:function(cx,cy,color,r){
		      	r = r||5;
		      	var circle = new createjs.Shape();
		      		circle.graphics.beginStroke("#a4998e").drawCircle(0, 0, r+0.5);
		      		circle.graphics.beginFill(color).drawCircle(0, 0, r);
		      		circle.x = cx;
			        circle.y = cy;
		      	return circle;
			},
			drawLine:function(x0, y0, x1, y1, color){
		      	var line = new createjs.Shape();
		      		line.graphics.beginStroke(color).moveTo(x0,y0).lineTo(x1,y1);
		      		line.color = color;
		      		line.x0 = x0;
			        line.y0 = y0;
			        line.x1 = x1;
			        line.y1 = y1;
		      	return line;
		    },
		    drawCenterCircle:function(cx,cy,color,r){
		      	r=r||5;
		      	var circle = new createjs.Shape();
		      		circle.graphics.beginStroke("#a4998e").drawCircle(0, 0, r+0.5);
		      		circle.graphics.beginFill(color).drawCircle(0, 0, r);
		      		circle.x = cx;
			        circle.y = cy;
		      	return circle;
		    },
		    drawText:function(x0, y0, name){
		      	var text = new createjs.Text(name, "10px Arial, #000");
		      		text.x = x0 - 10;
		      		text.y = y0 + 10;
		      	return text;
		    },
			drawLineWithWeight:function(x0, y0, x1, y1, color,weight){
		    	var lineContainer = new createjs.Container();
		      	var line = new createjs.Shape();
		      		line.graphics.beginStroke(color).moveTo(x0,y0).lineTo(x1,y1);
		      		line.color = color;
		      		line.x0 = x0;
			        line.y0 = y0;
			        line.x1 = x1;
			        line.y1 = y1;
			   
			        var text = new createjs.Text(weight, "10px Arial", "#767676");
		      		text.x = x0/2+x1/2;
		      		text.y = y0/2+y1/2;
			        
		      		lineContainer.addChild(line,text);
		      	return lineContainer;
		    }
	}
})(jQuery);