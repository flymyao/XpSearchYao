(function(){
	brite.registerView("TagCluster",{parent:".MainScreen-main",emptyParent:true},{
		create:function(data,config){
			return $(app.render("tmpl-TagCluster"));
		},
		events:{}
	});
})();