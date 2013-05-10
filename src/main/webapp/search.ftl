<div class="resultsPage">
	  <form class="form-inline" action="search">
	  	<span class="logo">FTS Demo</span>
	  	<input type="text" placeholder="search keywords" name="keywords" class="searchInput" value="${keywords}"/>
	  	<input type="submit" value="Search" class="btn btn-primary"/>
	  </form>
  <div class="results">
  	[#list results as result]
  	[#if result.title??]
  	<div class="title">${result.title}</div>
  	[/#if]
  	<div class="details">${result.body}</div>
  	[/#list]
  <div>
</div>
