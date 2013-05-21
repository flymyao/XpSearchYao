(function(){
	brite.registerView("TagCluster",{parent:".MainScreen-main",emptyParent:true},{
		create:function(data,config){
			return $(app.render("tmpl-TagCluster"));
		},
		postDisplay:function(data, config){
			var $canvas = $("#TagCluster")[0];
			var stage = new createjs.Stage($canvas);
			var view = this;
			var nodeContainer = new Array();
			view.nodeContainer = nodeContainer;
			$.ajax({
				url:"/getTagWithPost",
				dataType:'json'				
			}).done(function(data){
				var tags = data.result;
				console.log(tags);
				$.each(tags,function(index,tag){
					var node = drawNode.call(view,tag);
					stage.addChild(node);
					view.nodeContainer.push(node);
					stage.update();
				});
			});
		},
		events:{}
	});
	
	function drawNode(tag){
		var view = this;
		var container = new createjs.Container(); 
		var node = new createjs.Shape();
		var _w = tag.num/2;
		_w=tag.num/10000*100;//(_w/10>50)?50:_w/10;
		node.graphics.beginFill("rgb(197, 235, 255)").drawCircle(0,0,_w);
		var pos = getPosition.call(view,_w);//{x:1000*Math.random(),y:500*Math.random(),size:_w};
		//pos = resolveConflict.call(view,pos);
		node.x = pos.x;
		node.y = pos.y;
		
		var name = new createjs.Text(tag.name, "20px Arial", "#ff7700");
		name.x= pos.x+(2*_w-(tag.name.replace(/(^\s*)|(\s*$)/g, "").length*20*3/5))/2-_w;
		name.y= pos.y-10;
		
		var num = new createjs.Text("("+tag.num+")", "10px Arial", "#606060");
		num.x= pos.x+(2*_w-(("("+tag.num+")").length*10*3/5))/2-_w;
		num.y= pos.y+15;
		
		container.addChild(node,name,num);
		container.cx = pos.x;
		container.cy = pos.y;
		container.size = _w;
		return container;
	}
	
	function getPosition(size){
		var view = this;
		var flag = size>100?true:false;
		var row = parseInt(view.nodeContainer.length/5),col=view.nodeContainer.length%5;
		return {x:col*200+50+(flag?50:150*Math.random()),y:row*170+50+(flag?50:150*Math.random())};
	}
})();