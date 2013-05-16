(function(){
	brite.registerView("Search",{parent:".MainScreen-main",emptyParent:true},{
		create:function(data,config){
			console.log(app.render("tmpl-Search"));
			return $(app.render("tmpl-Search"));
		}
	});
})();