(function(){
	brite.registerView("Search",{parent:".MainScreen-main",emptyParent:true},{
		create:function(data,config){
			return $(app.render("tmpl-Search"));
		},
		events:{
			"click;.searchBtn":function(e){
				$.ajax({
					url:'/search',
					type:'Get',
					data:{
						keywords:$(".searchInput").val(),
						type:$(":radio:checked").val()
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