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
	public void search(@WebModel Map m, @WebParam("keywords")String keywords,@WebParam("pg")Integer pg) throws SQLException{
		if(pg==null||pg<1){
			pg = 1;
		}
		List<Map> results = new ArrayList<Map>();
		StringBuffer sql = new StringBuffer();
		sql.append("select ")
		.append("ts_headline(title, plainto_tsquery('")
		.append(keywords).append("'))  as title ")
		.append(",ts_headline(body, plainto_tsquery('")
		.append(keywords).append("'))  as body ")
		.append(",ts_rank(btsv, plainto_tsquery('")
		.append(keywords)
		.append("')) as bodyRank ")
		.append(",ts_rank(ttsv, plainto_tsquery('")
		.append(keywords)
		.append("')) as titleRank ")
		.append(" from xpsearchyao_schema.post ")
		.append(" where btsv @@ plainto_tsquery('")
		.append(keywords)
		.append(" ') or  ")
		.append("  ttsv @@ plainto_tsquery('")
		.append(keywords)
		.append(" ')")
		.append(" order by titleRank,bodyRank desc  offset ")
		.append((pg-1)*10)
		.append(" limit 10");
		Long startTime = System.currentTimeMillis();
		PreparedStatement statement = dbConnectionManager.getConnection().prepareStatement(sql.toString());
		ResultSet resultSet = statement.executeQuery();
		while(resultSet.next()){
			Map map = new HashMap();
			map.put("title", resultSet.getString("title"));
			map.put("body", resultSet.getString("body"));
			results.add(map);
		}
		m.put("results", results);
		m.put("keywords", keywords);
		m.put("pg", pg);
		m.put("costTime", (" cost time:"+(System.currentTimeMillis()-startTime)+"millis"));
		resultSet.close();
		statement.close();
		
	}
	
}
