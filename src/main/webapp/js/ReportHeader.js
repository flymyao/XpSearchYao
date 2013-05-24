;(function() {
    (function ($) {
        brite.registerView("ReportHeader",  {parent:".MainScreen-header"}, {
            create:function (data, config) {
                var $html = app.render("tmpl-ReportHeader");
               	var $e = $($html);
                return $e;
            },
            postDisplay:function (data, config) {
                var view = this;
                var $e = view.$el;
                view.level = view.level || 2;
                view.scaleVal = view.scaleVal || 1;
                $e.find(".ControlBar").hide();
                
                $('#sl1',$e).slider().off('slide').on('slide', function(ev){
                	if(view.level != ev.value){
                		view.level = ev.value;
	                	view.$el.trigger("DO_LEVEL_CHANGE",{level:ev.value});
                	}
				});
				
				$('#sl2',$e).slider().off('slide').on('slide', function(ev){
                	var scaleVal = ev.value/100;
                	view.scaleVal = scaleVal;
                	view.$el.trigger("DO_ZOOM_CHANGE",{scaleVal:scaleVal});
				});
            },
            events:{
            	"btap;.nav li.nav-item":function(e){
            		var view = this;
            		var $e = view.$el;
            		var $li = $(e.currentTarget);
            		$e.find("li.nav-item").removeClass("active");
            		$li.addClass("active");
            		var menu = $li.attr("data-nav");
            		
            		if(menu == "Search"){
            		  	brite.display("Search");
            		  	$e.find(".ControlBar").hide();
            		}else if(menu == "ContactCluster"){
            		  	brite.display("EaselJSForceClusterSlider");
            		  	$e.find(".ControlBar").show();
            		  	$e.find(".addTag").hide();
            		  	$e.bComponent("MainScreen").$element.find(".MainScreen-main").css("top","113px");
            		}else if(menu == "TagCluster"){
            		  	brite.display("TagCluster");
            		  	$e.find(".addTag").show();
            		  	$e.find(".ControlBar").show();
            			$e.bComponent("MainScreen").$element.find(".MainScreen-main").css("top","113px");
            		}
            	},
            	"btap;.addTag .btn":function(event){
            		var view = this;
            		var tag = $(".addTag :text",view.$el).val();
            		if(tag){
            			$.ajax({
            				url:'/addTag',
            				data:{
            					name:tag
            				},
            				type:'Post',
            				dataType:'json'
            			}).done(function(data){
            				alert(tag+" adding success.");
            			});
            		}else{
            			alert("please type the tag name.");
            		}
            	}
            }
        });
    })(jQuery);
})();