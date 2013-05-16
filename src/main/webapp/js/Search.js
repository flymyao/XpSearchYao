(function(){
	brite.registerView("Search",{parent:".MainScreen-main",emptyParent:true},{
		create:function(data,config){
			console.log(app.render("tmpl-Search"));
			return $(app.render("tmpl-Search"));
		},
		events:{
			"click;.searchBtn":function(e){
				$.ajax({
					url:'/search',
					data:{
						keywords:$(".searchInput").val(),
						type:$(":radio:checked").val()
					},
					dataType:"html",
					success:function(data){
						$(".MainScreen-main").html(data);
					}
				});
				
			}
		}
	});
})();