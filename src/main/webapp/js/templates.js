Handlebars.templates = Handlebars.templates || {};


// template --- tmpl-EaselJSForceClusterSlider ---
Handlebars.templates['tmpl-EaselJSForceClusterSlider'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  


  return "<div class=\"EaselJSForceClusterSlider easelJSContainer\">\n		<div class=\"clusterChart\"></div>\n		<div class=\"contact-info\"></div>\n	</div>";}
);

// template --- tmpl-MainScreen ---
Handlebars.templates['tmpl-MainScreen'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  


  return "<div class=\"MainScreen\">\n	    <div class=\"MainScreen-header\">\n	    </div>\n	    <div class=\"MainScreen-main\">\n	    </div>\n    </div>";}
);

// template --- tmpl-ReportHeader ---
Handlebars.templates['tmpl-ReportHeader'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  


  return "<div class=\"ReportHeader\">\n		<div class=\"navbar navbar-inverse\" style=\"position: static;\">\n        	<div class=\"navbar-inner\">\n            	<div class=\"container\">\n                  	<a class=\"brand\" href=\"#\">FTS Demo</a>\n                  	<div class=\"nav-collapse collapse navbar-inverse-collapse\">\n                    	<ul class=\"nav\">\n                    	<li data-nav=\"Search\" class=\"nav-item easeljsPart active\"><a href=\"#\">Search</a></li>\n											<li data-nav=\"ContactCluster\" class=\"nav-item easeljsPart\"><a href=\"#\">Contact Cluster</a></li>\n                    	</ul>\n                  	</div><!-- /.nav-collapse -->\n                </div>\n            </div><!-- /navbar-inner -->\n        </div><!-- /navbar -->\n        <div class=\"ControlBar\">\n        	<div class=\"toolItems\">\n				<div class=\"toolbar-item\">\n					<label>Level: </label> \n					<div class=\"toolbar-item-content showLevel\">\n						<input type=\"text\" class=\"span2\" data-slider-min=\"1\" data-slider-max=\"4\" data-slider-value=\"2\" value=\"2\" id=\"sl1\" >\n					</div>\n				</div>\n				<div class=\"toolbar-item\">\n					<label>Zoom: </label> \n					<div class=\"toolbar-item-content zoom\">\n						<input type=\"text\" class=\"span2\" data-slider-min=\"40\" data-slider-max=\"200\" data-slider-value=\"100\" data-slider-step=\"20\" value=\"100\" id=\"sl2\" >\n					</div>\n				</div>\n				<div class=\"toolbar-item\">\n					<label>Speed: </label> \n					<div class=\"toolbar-item-content speed\">\n						<input type=\"text\" class=\"span1\" value=\"500\" onKeypress=\"if (event.keyCode < 48 || event.keyCode > 57) event.returnValue = false;\">\n					</div>\n				</div>\n				<div class=\"toolbar-item\">\n					<label>Use RAF: </label> \n					<div class=\"toolbar-item-content useRAF\">\n						<input type=\"checkbox\" checked=\"true\"/>\n					</div>\n				</div>\n				<div class=\"toolbar-button\">\n					<button class=\"btn btn-small btn-primary\" type=\"button\">New Data</button>\n				</div>\n			</div>\n        </div>\n	</div>";}
);

// template --- tmpl-Search ---
Handlebars.templates['tmpl-Search'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  


  return "<div class=\"mainPage\">\n	<div class=\"header\">\n		Full Text Search for Postgresql\n	</div>\n	<div class=\"searchForm\">\n		  <form action=\"search\">\n		  	<input type=\"text\" placeholder=\"search keywords\" name=\"keywords\" class=\"searchInput\"/>\n		  	<div class=\"typeContainer form-inline\">\n			  	<label><input type=\"radio\" name=\"type\" value=\"title\"/><span>title</span></label>\n			  	<label><input type=\"radio\" name=\"type\" value=\"body\"/><span>body</span></label>\n			  	<label><input type=\"radio\" name=\"type\" value=\"tag\"/><span>tag</span></label>\n			  	<label><input type=\"radio\" name=\"type\" value=\"username\"/><span>username</span></label>\n			  	<label><input type=\"radio\" name=\"type\" value=\"default\"/><span>title,body</span></label>\n			  </div>\n		  	<div class=\"btns form-inline\">\n		  		<input type=\"submit\" value=\"Search\" class=\"btn btn-primary searchBtn\"/>\n		 			<ul class=\"nav nav-pills\">\n					  <li class=\"dropdown\" id=\"menu1\">\n					    <a class=\"dropdown-toggle\" data-toggle=\"dropdown\" href=\"#menu1\">\n					      Import Data\n					      <b class=\"caret\"></b>\n					    </a>\n					    <ul class=\"dropdown-menu\">\n					      <li><a href=\"#\"  onClick=\"app.importData('Post');\">Post</a></li>\n					      <li><a href=\"#\"  onClick=\"app.importData('Comment');\">Comment</a></li>\n					        <li><a href=\"#\"  onClick=\"app.importData('User');\">User</a></li>\n					    </ul>\n					  </li>\n					</ul>\n		 		</div>\n		  </form>\n	</div>\n</div>";}
);
