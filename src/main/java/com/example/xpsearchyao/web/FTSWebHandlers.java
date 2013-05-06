package com.example.xpsearchyao.web;

import java.util.Map;

import com.britesnow.snow.web.handler.annotation.WebModelHandler;
import com.britesnow.snow.web.param.annotation.WebModel;
import com.britesnow.snow.web.param.annotation.WebParam;
import com.example.xpsearchyao.dao.PostDao;
import com.google.inject.Inject;
import com.google.inject.Singleton;

@Singleton
public class FTSWebHandlers {

	@Inject
	private PostDao postDao;
	
	@WebModelHandler(startsWith="/search")
	public void search(@WebModel Map m, @WebParam("keywords")String keywords){
		m.put("results", postDao.fts(keywords));
		m.put("keywords", keywords);
	}
	
}
