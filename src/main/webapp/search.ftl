<div class="searchForm">
	<center>
	  <form class="form-inline" action="search">
	  	<input type="text" placeholder="search keywords" name="keywords" class="searchInput" value="${keywords}"/>
	  	<input type="submit" value="Search" class="btn btn-primary"/>
	  </form>
  </center>
  <div class="results">
  	[#list results as result]
  	[#if result.title??]
  	<div class="title">${result.title}</div>
  	[/#if]
  	<div class="details">${result.body}</div>
  	[/#list]
  <div>
  
   <div>
  	<input type="button" value="Import Data(Post)" class="btn btn-primary import" onClick="app.importData('Post');"/>
  </div>
</div>
