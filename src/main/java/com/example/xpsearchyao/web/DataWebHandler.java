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
		Post,Comment,User
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
		}else if(table.equals(Table.User)){
			sql.append("insert into xpsearchyao_schema.").append(table)
			.append(" (id,reputation,creationdate,aboutme,displayname,lastaccessdate,")
			.append("location,views,upvotes,downvotes,emailhash)")
			.append(" values ");
			for(Map m:DataReader.readXML(table.name())){
				sql.append("(").append(m.get("id")).append(",")
					.append(m.get("reputation")).append(",")
					.append(getDateString(m.get("creationdate"))).append(",")
					.append(getString(m.get("aboutme"))).append(",")
					.append(getString(m.get("displayname"))).append(",")
					.append(getDateString(m.get("lastaccessdate"))).append(",")
					.append(getString(m.get("location"))).append(",")
					.append(m.get("views")).append(",")
					.append(m.get("upvotes")).append(",")
					.append(m.get("downvotes")).append(",")
					.append(getString(m.get("emailhash"))).append("),");
			}
			
		}
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
