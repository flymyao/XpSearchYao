package com.example.xpsearchyao.web;

import java.util.Map;

import com.britesnow.snow.web.handler.annotation.WebModelHandler;
import com.britesnow.snow.web.param.annotation.WebModel;
import com.britesnow.snow.web.param.annotation.WebParam;
import com.google.inject.Singleton;

@Singleton
public class FTSWebHandlers {

	@WebModelHandler(startsWith="/search")
	public void search(@WebModel Map m, @WebParam("keywords")String keywords){
		m.put("key", "keyword");
	}
	
}
