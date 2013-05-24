(function(){
	brite.registerView("SearchResult",{parent:".MainScreen-main",emptyParent:true},{
		create:function(data,config){
			return app.render("tmpl-SearchResult",{data:data});
		},
		postDisplay:function(data){
			var view = this;
			view.$el.closest(".MainScreen-main").css("top","43px");
		},
		events:{
			"btap;.btn":function(event){
				var $btn = $(event.target);
				var type = $btn.attr("data-turn");
				var $div = $btn.closest(".resultsPage");
				var pg = $div.attr("data-pg");
				var keywords = $div.attr("data-keywords");
				if(type=='prev'){
					pg = (+pg)-1;
					if(pg<1){
						pg = 1;
						alert("this is the first page");
						return false;
					}
				}else{
					pg=(+pg)+1;
				}
				

				$.ajax({
					url:'/search',
					type:'Get',
					data:{
						keywords:keywords,
						type:'default',
						pg:pg
					},
					dataType:"json",
					success:function(data){
						brite.display("SearchResult","",data);
					}
				});
				
			
			}
		}
	});

})();