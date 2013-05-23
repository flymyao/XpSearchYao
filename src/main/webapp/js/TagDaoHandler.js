
// --------- Tag Dao --------- //
(function($) {

	function TagDaoHandler(entityType) {
        this._entityType = entityType;
	}

	// ------ DAO Interface Implementation ------ //
	TagDaoHandler.prototype.getIdName = function() {
		return "id";
	};

    // --------- DAO Info Methods --------- //
    TagDaoHandler.prototype.entityType = function () {
        return this._entityType;
    };
    // --------- DAO Info Methods --------- //
	
	TagDaoHandler.prototype.getById = function(opts) {
		var objectType = this._entityType;
		return $.ajax({
			url:'/getTagWithPost',
			data:{
				tagId:opts.id,
				level:opts.level
			},
			dataType:'json'
			
		}).done(function(data){
			return data;
		});
	}
	
	TagDaoHandler.prototype.update = function(data) {
		app.dataSet = data;
		return data;
	}

	brite.dao.TagDaoHandler = TagDaoHandler;
	// ------ /DAO Interface Implementation ------ //

})(jQuery);
// --------- /Tag Dao --------- //