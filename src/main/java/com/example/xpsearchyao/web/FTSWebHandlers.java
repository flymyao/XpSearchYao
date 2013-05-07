package com.example.xpsearchyao.web;

import java.util.Map;

import com.britesnow.snow.web.handler.annotation.WebModelHandler;
import com.britesnow.snow.web.param.annotation.WebModel;
import com.britesnow.snow.web.param.annotation.WebParam;
import com.example.xpsearchyao.dao.PostDao;
import com.example.xpsearchyao.hook.DbConnectionManager;
import com.google.inject.Inject;
import com.google.inject.Singleton;

@Singleton
public class FTSWebHandlers {

	@Inject
	private PostDao postDao;
	
	@Inject
	private DbConnectionManager dbConnectionManager;
	
	@WebModelHandler(startsWith="/search")
	public void search(@WebModel Map m, @WebParam("keywords")String keywords){
		System.out.println(dbConnectionManager.getConnection());
		m.put("results", postDao.fts(keywords));
		m.put("keywords", keywords);
	}
	
}
