var app = app||{};

(function($){
   app.importData=function(name){
	  $.ajax({
		  url:"/api/import/"+name,
		  type:"Get",
		  dataType:"json"
	  }).done(function(data){
		  alert("data for "+name+" importing successfully.");
	  });
  }
})(jQuery);