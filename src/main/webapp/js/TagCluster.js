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
		var node = new createjs.Shape();
		var _w = tag.num/2;
		_w=(_w/10>50)?50:_w/10;
		node.graphics.beginFill("#aaa").drawCircle(1000*Math.random(),700*Math.random(),_w);
		return node;
	}
})();