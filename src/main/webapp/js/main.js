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
   
   app.turn=function(current,type,keywords){
	   if(+current+type==0){
		   alert("this is the first page");
		   return false;
	   }
	   window.location.href="?keywords="+keywords+"&pg="+(+current+type);
   }
})(jQuery);