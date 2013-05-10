package com.example.xpsearchyao.web;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;

import com.britesnow.snow.web.param.annotation.PathVar;
import com.britesnow.snow.web.rest.annotation.WebGet;
import com.example.xpsearchyao.DbConnectionManager;
import com.example.xpsearchyao.util.DataReader;
import com.google.inject.Inject;
import com.google.inject.Singleton;

@Singleton
public class DataWebHandler {

	@Inject
	private DbConnectionManager dbConnectionManager;
	
	enum Table{
		Post,Comment
	}
	@WebGet("/api/import/{name}")
	public Map<String,Object> importData(@PathVar("name")Table table) throws SQLException{
		Map<String,Object> result = new HashMap<String,Object>();
		StringBuffer sql = new StringBuffer();
		if(table.equals(Table.Post)){
			sql.append("insert into xpsearchyao_schema.").append(table)
			.append(" (id,acceptedanswerid,answercount,body,commentcount,communityowneddate,")
			.append("creationdate,favoritecount,lasteditoruserid,owneruserid,posttypeid,score,tag,title,viewcount)")
			.append(" values ");
			for(Map m:DataReader.readXML(table.name())){
				sql.append("(").append(m.get("id")).append(",")
					.append(m.get("acceptedanswerid")).append(",")
					.append(m.get("answercount")).append(",")
					.append(getString(m.get("body"))).append(",")
					.append(m.get("commentcount")).append(",")
					.append(getDateString(m.get("communityowneddate"))).append(",")
					.append(getDateString(m.get("creationdate"))).append(",")
					.append(m.get("favoritecount")).append(",")
					.append(m.get("lasteditoruserid")).append(",")
					.append(m.get("owneruserid")).append(",")
					.append(m.get("posttypeid")).append(",")
					.append(m.get("score")).append(",")
					.append(getString(m.get("tag"))).append(",")
					.append(getString(m.get("title"))).append(",")
					.append(m.get("viewcount")).append("),");
				break;
			}
		}else if(table.equals(Table.Comment)){
			sql.append("insert into xpsearchyao_schema.").append(table)
			.append(" (id,postid,text,creationdate,userid)")
			.append(" values ");
			for(Map m:DataReader.readXML(table.name())){
				sql.append("(").append(m.get("id")).append(",")
					.append(m.get("postid")).append(",")
					.append(getString(m.get("text"))).append(",")
					.append(getDateString(m.get("creationdate"))).append(",")
					.append(m.get("userid")).append("),");
			}
		}
		System.out.println(sql);
		PreparedStatement statement = dbConnectionManager.getConnection().prepareStatement(sql.substring(0,sql.length()-1));
		statement.execute();
		return result;
	}
	
	private String getDateString(Object src){
		if(src==null){
			return null;
		}else {
			return "'"+(String)src+"'";
			}
	}
	
	private String getString(Object src){
		if(src==null){
			return "''";
		}else {
			return "'"+(String)src+"'";
			}
	}
}
