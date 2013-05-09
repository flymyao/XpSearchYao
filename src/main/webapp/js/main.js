var app = app||{};

(function($){
  app.import=function(name){
	  $.ajax({
		  url:"/api/import"+name,
		  type:"Post",
		  dataType:"json"
	  }).done(function(data){
		  alert("data for "+name+" importing successfully.");
	  });
  }
})(jQuery);