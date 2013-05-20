package com.example.xpsearchyao.web;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.britesnow.snow.web.handler.annotation.WebModelHandler;
import com.britesnow.snow.web.param.annotation.WebModel;
import com.britesnow.snow.web.param.annotation.WebParam;
import com.britesnow.snow.web.rest.annotation.WebGet;
import com.britesnow.snow.web.rest.annotation.WebPost;
import com.example.xpsearchyao.DbConnectionManager;
import com.google.inject.Inject;
import com.google.inject.Singleton;

@Singleton
public class FTSWebHandlers {
	
	@Inject
	private DbConnectionManager dbConnectionManager;
	
	@WebGet("/search")
	public Map search(@WebParam("keywords")String keywords,@WebParam("pg")Integer pg,@WebParam("type")String type) throws SQLException{
		if(pg==null||pg<1){
			pg = 1;
		}
		if(type==null){
			type="default";
		}
		List<Map> results = new ArrayList<Map>();
		StringBuffer sql = new StringBuffer();
		sql.append("select ");
		if("title".equals(type)){
			sql.append("ts_headline(title, plainto_tsquery('")
			.append(keywords).append("'))  as title ,body")
			.append(",ts_rank(ttsv, plainto_tsquery('")
			.append(keywords)
			.append("')) as titleRank, ")
			.append("tag from xpsearchyao_schema.post")
			.append(" where ")
			.append("  ttsv @@ plainto_tsquery('")
			.append(keywords)
			.append(" ')")
			.append(" order by titleRank desc  offset ");
		}else if("body".equals(type)){
			sql.append("title,ts_headline(body, plainto_tsquery('")
			.append(keywords).append("'))  as body ")
			.append(",ts_rank(btsv, plainto_tsquery('")
			.append(keywords)
			.append("')) as bodyRank,tag ")
			.append(" from xpsearchyao_schema.post ")
			.append(" where btsv @@ plainto_tsquery('")
			.append(keywords)
			.append(" ') ")
			.append(" order by bodyRank desc  offset ");
		}else if("default".equals(type)){
			sql.append("ts_headline(post.title, plainto_tsquery('")
			.append(keywords).append("'))  as title, ")
			.append("ts_headline(post.body, plainto_tsquery('")
			.append(keywords).append("'))  as body ")
			.append(",ts_rank(post.tsv, plainto_tsquery('")
			.append(keywords)
			.append("')) as rank,post.tag ")
			.append(",users.displayname as name")
			.append(" from xpsearchyao_schema.post post join xpsearchyao_schema.user users on users.id=post.owneruserid ")
			.append(" where post.tsv @@ plainto_tsquery('")
			.append(keywords)
			.append(" ')")
			.append(" order by rank desc  offset ");
		}
		sql.append((pg-1)*10)
		.append(" limit 10");
		System.out.println(sql.toString());
		Long startTime = System.currentTimeMillis();
		PreparedStatement statement = dbConnectionManager.getConnection().prepareStatement(sql.toString());
		ResultSet resultSet = statement.executeQuery();
		while(resultSet.next()){
			Map map = new HashMap();
			map.put("title", resultSet.getString("title"));
			map.put("body", resultSet.getString("body"));
			map.put("name", resultSet.getString("name"));
			map.put("tag", resultSet.getString("tag"));
			results.add(map);
		}
		Map m = new HashMap();
		m.put("results", results);
		m.put("keywords", keywords);
		m.put("pg", pg);
		m.put("type", type);
		m.put("costTime", (" cost time:"+(System.currentTimeMillis()-startTime)+"millis"));
		resultSet.close();
		statement.close();
		return m;
	}
	
	@WebModelHandler(startsWith="/relation")
	public void showRealtion(@WebModel Map m) throws SQLException{
		
	}
	
	@WebGet("/getUsers")
	public Map getUsers(@WebParam("userId")Long userId) throws SQLException{
		if(userId==null){
			userId = 10L;
		}
		List<Map> results = new ArrayList<Map>();
		String sql = "select distinct c.userid as userid,u.displayname as name " +
				"from xpsearchyao_schema.post p join xpsearchyao_schema.comment c " +
				"on p.owneruserid = "+userId+" and c.postid = p.id join xpsearchyao_schema.user u on u.id = c.userid limit 10 offset 0";
		PreparedStatement statement = dbConnectionManager.getConnection().prepareStatement(sql.toString());
		ResultSet resultSet = statement.executeQuery();
		while(resultSet.next()){
			Map map = new HashMap();
			map.put("id", resultSet.getString("userid"));
			map.put("name", resultSet.getString("name"));
			map.put("parentId",userId);
			map.put("weight", 1);
			map.put("children",getUsersSet(Long.parseLong(resultSet.getString("userid"))));
			results.add(map);
		}
		
		resultSet.close();
		statement.close();
		
		Map m = new HashMap();
		Map user = getUser(userId);
		m.put("id", user.get("id"));
		m.put("name", user.get("name"));
		m.put("friends", results);
		return m;
	}
	
	private List getUsersSet(Long userId) throws SQLException{
		List<Map> results = new ArrayList<Map>();
		String sql = "select distinct c.userid as userid,u.displayname as name " +
				"from xpsearchyao_schema.post p join xpsearchyao_schema.comment c " +
				"on p.owneruserid = "+userId+" and c.postid = p.id join xpsearchyao_schema.user u on u.id = c.userid limit 10 offset 0";
		PreparedStatement statement = dbConnectionManager.getConnection().prepareStatement(sql.toString());
		ResultSet resultSet = statement.executeQuery();
		while(resultSet.next()){
			Map map = new HashMap();
			map.put("id", resultSet.getString("userid"));
			map.put("name", resultSet.getString("name"));
			map.put("parentId",userId);
			map.put("weight", 1);
			map.put("friends",new HashMap());
			results.add(map);
		}
		
		resultSet.close();
		statement.close();
		return results;
	}
	private Map getUser(Long userId) throws SQLException{
		String sql = "select id,displayname from xpsearchyao_schema.user where id = "+userId;
		PreparedStatement statement = dbConnectionManager.getConnection().prepareStatement(sql.toString());
		ResultSet resultSet = statement.executeQuery();
		Map m = new HashMap();
		while(resultSet.next()){
			Map map = new HashMap();
			map.put("id", resultSet.getString("id"));
			map.put("name", resultSet.getString("displayname"));
			m = map;
			break;
		}
		resultSet.close();
		statement.close();
		return m;
	}
	
	@WebPost("/addTag")
	public Map addTag(@WebParam("name") String name) throws SQLException{
		Map m = new HashMap();
		String sql = "insert into  xpsearchyao_schema.tag(name) values('"+name+"')";
		PreparedStatement statement = dbConnectionManager.getConnection().prepareStatement(sql.toString());
		int result = statement.executeUpdate();
		m.put("result", result);
		return m;
	}
}
