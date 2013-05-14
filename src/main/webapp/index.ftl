<div class="mainPage">
	<div class="header">
		Full Text Search for Postgresql
	</div>
	<div class="searchForm">
		  <form action="search">
		  	<input type="text" placeholder="search keywords" name="keywords" class="searchInput"/>
		  	<div class="typeContainer form-inline">
			  	<label><input type="radio" name="type" value="title"/><span>title</span></label>
			  	<label><input type="radio" name="type" value="body"/><span>body</span></label>
			  	<label><input type="radio" name="type" value="tag"/><span>tag</span></label>
			  	<label><input type="radio" name="type" value="username"/><span>username</span></label>
			  	<label><input type="radio" name="type" value="default"/><span>title,body</span></label>
			  </div>
		  	<div class="btns form-inline">
		  		<input type="submit" value="Search" class="btn btn-primary searchBtn"/>
		 			<ul class="nav nav-pills">
					  <li class="dropdown" id="menu1">
					    <a class="dropdown-toggle" data-toggle="dropdown" href="#menu1">
					      Import Data
					      <b class="caret"></b>
					    </a>
					    <ul class="dropdown-menu">
					      <li><a href="#"  onClick="app.importData('Post');">Post</a></li>
					      <li><a href="#"  onClick="app.importData('Comment');">Comment</a></li>
					        <li><a href="#"  onClick="app.importData('User');">User</a></li>
					    </ul>
					  </li>
					</ul>
		 		</div>
		  </form>
	</div>
</div>