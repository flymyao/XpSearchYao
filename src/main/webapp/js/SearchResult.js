(function(){
	brite.registerView("SearchResult",{parent:".MainScreen-main",emptyParent:true},{
		create:function(data,config){
			console.log(data);
			return app.render("tmpl-SearchResult",{data:data});
		},
		events:{}
	});

})();