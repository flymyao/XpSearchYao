(function(){
	brite.registerView("TagCluster",{parent:".MainScreen-main",emptyParent:true},{
		create:function(data,config){
			return $(app.render("tmpl-TagCluster"));
		},
		postDisplay:function(data, config){
			var $canvas = $("#TagCluster")[0];
			var stage = new createjs.Stage($canvas);
			var view = this;
			$.ajax({
				url:"/getTagWithPost",
				dataType:'json'				
			}).done(function(data){
				var tags = data.result;
				console.log(tags);
				$.each(tags,function(index,tag){
					stage.addChild(drawNode.call(this,tag));
					stage.update();
				});
			});
		},
		events:{}
	});
	
	function drawNode(tag){
		var container = new createjs.Container(); 
		var node = new createjs.Shape();
		var _w = tag.num/2;
		_w=(_w/10>50)?50:_w/10;
		node.graphics.beginFill("rgb(197, 235, 255)").drawCircle(0,0,_w);
		var randomX = 800*Math.random(),randomY=600*Math.random();
		node.x = randomX
		node.y = randomY;
		var name = new createjs.Text(tag.name, "20px Arial", "#ff7700");
		name.x= randomX+(2*_w-(tag.name.replace(/(^\s*)|(\s*$)/g, "").length*20*3/5))/2-_w;
		alert((2*_w-(tag.name.replace(/(^\s*)|(\s*$)/g, "").length*20*3/5))/2);
		name.y= randomY-10;
		container.addChild(node,name);
		return container;
	}
	
})();