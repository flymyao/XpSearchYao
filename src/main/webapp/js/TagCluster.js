;(function() {

    (function ($) {
    	var _colors = ["#0B95B1","#ff7f0e","#aec7e8","#dddddd"];
    	var _centerColors = ["#ffe9c2","#0B95B1","#ff7f0e","#aec7e8","#dddddd"];
    	var _weightPerLength = [20,10,8,4];
    	var _baseLineLen = [80,40,20,10];
        brite.registerView("TagCluster",  {
			emptyParent : true,
			parent:".MainScreen-main"
		}, {
        	create:function (data, config) {
                var $html = app.render("tmpl-TagCluster",{});
               	var $e = $($html);
                return $e;
            },
            postDisplay:function(data, config){
				var view = this;
                var $e = view.$el;
                view.level = $e.closest(".MainScreen").find(".ControlBar #sl1").val();
               	var scaleVal = $e.closest(".MainScreen").find(".ControlBar #sl2").val();
              	view.scaleVal = scaleVal/100;
              	
              	app.TagDao.getById({id:view.uid,level:view.level}).done(function(data){
              		 view.showView(data);
              	});
			},
			docEvents: {
				"DO_LEVEL_CHANGE": function(event,extra){
					var view = this;
					view.level = extra.level;
					app.TagDao.getById({id:view.uid,level:view.level}).done(function(chartData){
		                view.showView(chartData);
					});
				},
				"DO_ZOOM_CHANGE": function(event,extra){
					var view = this;
					view.scaleVal = extra.scaleVal;
	                zoomChange.call(view, extra.scaleVal);
				},
				"DO_RAF_CHANGE": function(event,extra){
					createjs.Ticker.useRAF = app.useRAF;
					createjs.Ticker.setFPS(60);
				}
			},
			daoEvents: {
				"dataChange; Contact": function(){
					var view = this;
					app.ContactDao.get().done(function(chartData){
	                	view.showView(chartData);
					});
				}
			},
           	showView:function (data) {
                var view = this;
                var $e = view.$el;
                view.currentContainerName = "currentContainer";
                view.newContainerName = "newContainer";
                view.cName = "centerCircle";
                view.rootName = data.name;
                view.uid = data.tagid;
				createjs.Ticker.useRAF = app.useRAF;
				createjs.Ticker.setFPS(60);
				
				var canvas = $(".TagClusterChart-canvas",$e)[0];
				canvas.width = $e.parent().width();
        		canvas.height = $e.parent().height();
        		
        		view.canvasW = canvas.width;
        		view.canvasH = canvas.height;
        		view.originPoint = {x:view.canvasW/2, y: view.canvasH/2};
        		view.mousemove = false;

				var stage = new createjs.Stage(canvas);
				view.stage = stage;
				stage.enableMouseOver(100);
				var container = createContainer.call(view, data, view.originPoint, view.level, 0);
				container.name = view.currentContainerName;
				container.alpha = 1;
				stage.addChild(container);
      			stage.update();
			}
        });
        
        // --------- Private Method --------- //
        	function createContainer(data, originPoint, level, exAngle, isRecreate){
        		var view = this;
        		var parentName = data.name;
      			//sort the weight
				var childrenData = data.children;
				if(!childrenData){
					return ;
				}
				childrenData.sort(weightSort);
				
				//put the root data as the first one
				childrenData = app.transformDataFirst(childrenData,isRecreate?view.oldRootName:view.rootName);
				
      			var stage = view.stage;
      			var angle = Math.PI * 2 / childrenData.length ;
      			var rx = originPoint.x;
				var ry = originPoint.y;
     			var containerRoot = new createjs.Container();
     			var fpos = calculateNodePosition.call(view,childrenData,originPoint,level,exAngle);
			    
        		//draw the nodes and line
        		$.each(childrenData,function(i,item){
        			if(level != view.level && i == 0) return;
        			var cx = fpos[i].x;
			        var cy = fpos[i].y;
			        var cData = childrenData[i];
			        var line = app.shapes.drawLineWithWeight(rx,ry,cx,cy,_colors[view.level-level],cData.weight);//createLine.call(view,rx,ry,cx,cy,level,cData.weight);
			        
			        var node = app.shapes.drawNodeCircle(cx,cy,_colors[view.level-level],getSize.call(view,cData.num));
			        node.name = cData.name;
			        node.uid = cData.tagid;
			        containerRoot.addChild(line);
			        containerRoot.addChild(node);
			        node.originPotint = {cx:cx,cy:cy};
			        node.relatedLine = line.children[0];
			        node.angleVal = fpos[i].angleVal;
			        node.weight = cData.weight;
			        node.data = cData;
			        
			        //add the mouseover event for node
			        node.addEventListener("mouseover", function(d){mouseoverEvent.call(view,d)});
			        
			        //add the mouseout event for node
			        node.addEventListener("mouseout", function(d){mouseoutEvent.call(view,d)});
			        
			        //add the mousedown event for node
			        node.addEventListener("mousedown", function(d){mousedownEvent.call(view,d)});
			        
			       	//add the click event for node
					node.addEventListener("click", function(d){clickEvent.call(view,d)});

			        //show the label
			        if((view.level-level) <= 1){
			        	var text = app.shapes.drawText(cx,cy,cData.name);
			        	node.relatedText = text;
			        	text.originPotint = {x:cx - 10,y:cy + 10};
			        	containerRoot.addChild(text);
			        }
			        
			        //show the children level
					if((level-1) > 0){
						var newData = cData;//app.transformData(app.dataSet, cData.name, parentName);
						var newContainer = createContainer.call(view, newData, {x:cx, y:cy}, level-1, (Math.PI + angle* i)+exAngle);
						node.relatedContainer = newContainer;
						containerRoot.addChild(newContainer);
					}
				});
				
				//draw the origin point
				var circle = app.shapes.drawCenterCircle(rx, ry,_centerColors[view.level-level],getSize.call(view,data.num));
				circle.name=view.cName;
				circle.children = childrenData.length;
				circle.num = data.num;
			    containerRoot.addChild(circle);
					
				if((view.level-level) == 0){
					 //add the click event for circle
			    	circle.addEventListener("click", function(d){clickOriginPointEvent.call(view,d)});
			    
				    var text = app.shapes.drawText(rx,ry,parentName); 
	      			containerRoot.addChild(text); 
	      			containerRoot.scaleX = view.scaleVal; 
					containerRoot.scaleY = view.scaleVal; 
					containerRoot.x = (1-view.scaleVal) * view.originPoint.x; 
					containerRoot.y = (1-view.scaleVal) * view.originPoint.y; 
				}
			    
			    return containerRoot;
        	}
        	
        	function calculateNodePosition(childrenData,originPoint,level,exAngle){
        		var view = this;
        		var rx = originPoint.x;
				var ry = originPoint.y;
				var weightPerLength = _weightPerLength[view.level - level];
      			var baseLineLen = _baseLineLen[view.level - level];
      			var angle = Math.PI * 2 / childrenData.length ;
        		var fpos = [];
		      	for(var i = 0; i < childrenData.length; i++){
			        var cData = childrenData[i];
			        var weight = cData.weight;
					//the higher weight, the closer the length
					weight = weight>1000?1000:weight;
					weight = weight<100?100:weight;
			        var l = 1000/weight * weightPerLength + baseLineLen;
			        var cx = rx + l * Math.sin(angle * i + exAngle);
			        var cy = ry + l * Math.cos(angle * i + exAngle);
			        fpos.push({x:cx, y:cy, angleVal:(angle * i + exAngle)});
			    }
			    return fpos;
        	}
        	
        	function zoomChange(val){
				var view = this;
				var stage = view.stage;
				var containerLayout = stage.getChildByName(view.currentContainerName);
      			var scaleVal = val || view.scaleVal;
                containerLayout.scaleX = scaleVal; 
				containerLayout.scaleY = scaleVal; 
				containerLayout.x = (1-scaleVal) * view.originPoint.x; 
				containerLayout.y = (1-scaleVal) * view.originPoint.y; 
				stage.update();
			}
        	
		    function getSize(size){
		    	var r = size/2;
        		r=size/10000*50; 
        		r=r>20?20:r;
        		r=r<5?5:r;
        		return r;
		    }
		    
		    function clickEvent(d){
		    	var view = this;
		    	if(view.mousemove) return;
		    	
		    	//get the speed value
		    	app.animationSpeed = view.$el.closest(".MainScreen").find(".ControlBar .speed input").val();
		    	
			    //change the origin node and the click node
			    var stage = view.stage;
			    view.oldRootName = view.rootName;
			    view.rootName = d.target.name;
			    var rx = view.originPoint.x;
			    var ry = view.originPoint.y;
			    var statLayout = stage.getChildByName(view.currentContainerName);
			    var oldCenterCircle = statLayout.getChildByName(view.cName);
			    statLayout.removeChild(oldCenterCircle);
			        
			    var newCircle = app.shapes.drawCenterCircle( d.target.x, d.target.y,_centerColors[0],getSize.call(view,d.target.data.num));
			    newCircle.name=view.cName;
			    
			    statLayout.addChild(newCircle);
      				
      			statLayout.removeChild(d.target);
      			var node = app.shapes.drawNodeCircle(rx,ry,_colors[0],getSize.call(view,d.target.data.num));
      			node.name = view.cName;
			    node.uid = d.target.data.tagid;
      			statLayout.addChild(node);
      			
      			app.TagDao.getById({id:d.target.uid,level:view.level}).done(function(userData){	
					//add new container
					var newContainer = createContainer.call(view, userData, {x:view.canvasW/2, y: view.canvasH/2}, view.level, (Math.PI+d.target.angleVal),true);
					    newContainer.name = view.newContainerName;
					    newContainer.x = newContainer.x + (d.target.x - rx)*view.scaleVal;
					    newContainer.y = newContainer.y + (d.target.y - ry)*view.scaleVal;
					    newContainer.alpha = 0;
					stage.addChild(newContainer);
					stage.update();
					    
					createjs.CSSPlugin.install();
					var $contactInfo = view.$el.find(".tag-info");
				   	if($contactInfo.find("span").size() > 0){
				   		var leftVal = $contactInfo.position().left - (d.target.x - rx);
				   		var topVal = $contactInfo.position().top - (d.target.y - ry);
				   		createjs.Tween.get($contactInfo[0]).to({opacity : 0.1, left : leftVal, top : topVal }, app.animationSpeed,createjs.Ease.quartInOut).call(function(){
				   			$contactInfo.empty();
				   		});
				   	}
					      	
					var ox = statLayout.x - (d.target.x - rx);
					var oy = statLayout.y - (d.target.y - ry);
					      	
					createjs.Tween.get(statLayout).to({alpha : 0, x : ox, y : oy }, app.animationSpeed,createjs.Ease.quartInOut); 
					     	
					createjs.Tween.get(newContainer).to({alpha : 1, x : (1-view.scaleVal)*view.originPoint.x, y : (1-view.scaleVal)*view.originPoint.y}, app.animationSpeed,createjs.Ease.quartInOut).call(function() {
					    createjs.Ticker.removeEventListener("tick",stage);
					    //remove oldContainer
						newContainer.x = (1-view.scaleVal)*view.originPoint.x;
						newContainer.y = (1-view.scaleVal)*view.originPoint.y;
						stage.removeChild(statLayout);
						newContainer.name = view.currentContainerName;
						newContainer.alpha = 1;
						stage.update();
					}); 
						
	      			createjs.Ticker.addEventListener("tick", stage);
				});		
			}
			    
			function clickOriginPointEvent(d){
				var view = this;
			    var children = d.target.children;
			    var $contactInfo = view.$el.find(".tag-info");
			   		
			    if($contactInfo.find("span").size() == 0){
			    	$contactInfo.html('<span class="label label-info">'+view.rootName+": "+children+' friends</span>')
				    $contactInfo.css("top",d.target.y-10);
				    $contactInfo.css("left",d.target.x+20);
				    $contactInfo.css("opacity",1);
			    }else{
			    	$contactInfo.empty();
			    }
			}
			
			function mouseoverEvent(evt){
				var view = this;
			    var stage = view.stage;
			    var target = evt.target;
			    console.log(evt);
			    var $contactInfo = view.$el.find(".tag-info");
			    $contactInfo.html('<span class="label label-info">Name: '+target.name+", Weight: "+target.weight+'</span>')
				$contactInfo.css("top",evt.stageY-10);
				$contactInfo.css("left",evt.stageX+20);
				$contactInfo.css("opacity",1);
			}
			
			function mouseoutEvent(evt){
				var view = this;
			    $contactInfo = view.$el.find(".tag-info").empty();
			}
			
			function mousedownEvent(evt){
				var view = this;
			    var stage = view.stage;
			    view.mousemove = false;
				var target = evt.target;
			    var ox = target.x;
			    var oy = target.y;
			    var relatedContainer = target.relatedContainer||{};
			    var rPoint = {x:relatedContainer.x,y:relatedContainer.y};
			    var relatedText = target.relatedText;
			    var relatedLine = target.relatedLine;
			    var offset = {x:target.x-evt.stageX, y:target.y-evt.stageY};
				
			    evt.addEventListener("mousemove",function(ev) {
			    	//hide the contact info when mousemove
			    	view.$el.find(".contact-info").empty();
			    	
			    	view.mousemove = true;
			    	var offsetX = ev.stageX - target.x + offset.x;
			        var offsetY = ev.stageY - target.y + offset.y;
			        target.x = ox+(ev.stageX+offset.x-ox)/view.scaleVal;
			        target.y = oy+(ev.stageY+offset.y-oy)/view.scaleVal;
			        if(relatedContainer){
			        	relatedContainer.x = rPoint.x+ (ev.stageX+offset.x-ox)/view.scaleVal;
			        	relatedContainer.y = rPoint.y+ (ev.stageY+offset.y-oy)/view.scaleVal;
			        }
			        if(relatedText){
			        	relatedText.x = target.x-10;//relatedText.x+ offsetX/view.scaleVal;
			        	relatedText.y = target.y+10;//relatedText.y+ offsetY/view.scaleVal;
			        }
			        reDrawLine.call(view,relatedLine,target.x,target.y);
			        stage.update();
			    });
			    
			    evt.addEventListener("mouseup",function(ev) {
			    	var perX = (target.originPotint.cx - target.x) /10;
			        var perY = (target.originPotint.cy - target.y) /10;
			        createjs.Ticker.addEventListener("tick", tick);
			        
			        var count = 10;
			        function tick(event) {
			      		target.x = target.x + perX;
			      		target.y = target.y + perY;
			      		if(relatedContainer){
			      			relatedContainer.x = relatedContainer.x+perX;
			      			relatedContainer.y = relatedContainer.y+perY;
			      		}
			      		
			      		if(relatedText){
				      		relatedText.x = relatedText.x + perX;
				      		relatedText.y = relatedText.y + perY;
				      	}
			      		reDrawLine.call(view,relatedLine,relatedLine.x1+perX,relatedLine.y1+perY);
			      		stage.update();
			      		count--;
				      	if(count <= 0){
				      		createjs.Ticker.removeEventListener("tick",tick);
				      		if(relatedContainer){
					      		relatedContainer.x = 0;
					      		relatedContainer.y = 0;
				      		}
				      		target.x = target.originPotint.cx;
				      		target.y = target.originPotint.cy;
				      		if(relatedText){
					      		relatedText.x = relatedText.originPotint.x;
					      		relatedText.y = relatedText.originPotint.y;
				      		}
				      		reDrawLine.call(view,relatedLine,target.originPotint.cx,target.originPotint.cy);
				      		stage.update();
				      	}
			    	}
				});
			}
			
			function reDrawLine(line,offsetX,offsetY) {
		        var view = this;
		        var lineClone = {x0:line.x0+0, y0:line.y0+0, x1:line.x1+0, y1:line.y1+0};
		        line.graphics.clear().beginStroke(line.color).moveTo(lineClone.x0, lineClone.y0).lineTo(offsetX, offsetY);
		        line.x1 = offsetX;
		        line.y1 = offsetY;
        	}
        	
			function weightSort(a,b){
				return a.weight>b.weight ? 1 :-1;
			}
		// --------- /Private Method --------- //

    })(jQuery);
})();
