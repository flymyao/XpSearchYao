
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


	TagDaoHandler.prototype.get = function(id) {
		var objectType = this._entityType;
		var resultSet = {};
		var dataSet = app.dataSet;

		//get the first one as default
		if(typeof id == "undefined"){
			var dataPart = dataSet[0];
			resultSet.id = dataPart.id;
			resultSet.name = dataPart.name;
			resultSet.children = dataPart.friends;
		}else{
			$.each(dataSet,function(i,user){
				if(id == user.id){
					var dataPart = dataSet[i];
					resultSet.id = dataPart.id;
					resultSet.name = dataPart.name;
					resultSet.children = dataPart.friends;
				}
			});
		}
		return resultSet;
	}
	
	TagDaoHandler.prototype.getByName = function(name) {
		var objectType = this._entityType;
		var resultSet = {};
		var dataSet = app.dataSet;

		//get the first one as default
		if(typeof name == "undefined"){
			var dataPart = dataSet[0];
			resultSet.id = dataPart.id;
			resultSet.name = dataPart.name;
			resultSet.children = dataPart.friends;
		}else{
			$.each(dataSet,function(i,user){
				if(name == user.name){
					var dataPart = dataSet[i];
					resultSet.id = dataPart.id;
					resultSet.name = dataPart.name;
					resultSet.children = dataPart.friends;
				}
			});
		}
		return resultSet;
	}
	
	TagDaoHandler.prototype.getById = function(id) {
		var objectType = this._entityType;
		var resultSet = {};
		var dataSet = app.dataSet;

		return $.ajax({
			url:'/getTagWithPost',
			data:{
				tagId:id
			},
			dataType:'json'
			
		}).done(function(data){
			console.log(data);
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