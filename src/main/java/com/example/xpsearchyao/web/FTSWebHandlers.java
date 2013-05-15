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
import com.example.xpsearchyao.DbConnectionManager;
import com.google.inject.Inject;
import com.google.inject.Singleton;

@Singleton
public class FTSWebHandlers {
	
	@Inject
	private DbConnectionManager dbConnectionManager;
	
	@WebModelHandler(startsWith="/search")
	public void search(@WebModel Map m, @WebParam("keywords")String keywords,@WebParam("pg")Integer pg,@WebParam("type")String type) throws SQLException{
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
			.append("')) as titleRank ")
			.append(" from xpsearchyao_schema.post")
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
			.append("')) as bodyRank ")
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
			.append("')) as rank ")
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
			results.add(map);
		}
		m.put("results", results);
		m.put("keywords", keywords);
		m.put("pg", pg);
		m.put("type", type);
		m.put("costTime", (" cost time:"+(System.currentTimeMillis()-startTime)+"millis"));
		resultSet.close();
		statement.close();
		
	}
	
	@WebModelHandler(startsWith="/relation")
	public void showRealtion(){
		
	}
}
