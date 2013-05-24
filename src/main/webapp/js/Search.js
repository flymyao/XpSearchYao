(function(){
	brite.registerView("Search",{parent:".MainScreen-main",emptyParent:true},{
		create:function(data,config){
			return $(app.render("tmpl-Search"));
		},
		events:{
			"click;.searchBtn":function(e){
				var view = this;
				var $e = view.$el;
				$.ajax({
					url:'/search',
					type:'Get',
					data:{
						keywords:$(".searchInput",$e).val(),
						type:$(":radio:checked",$e).val()
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