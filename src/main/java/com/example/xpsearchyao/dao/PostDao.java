package com.example.xpsearchyao.dao;

import java.util.List;
import java.util.Map;

import org.hibernate.transform.Transformers;

import com.example.xpsearchyao.entity.Post;
import com.google.inject.Singleton;

@Singleton
public class PostDao extends BaseHibernateDao<Post>{

	public List<Map> fts(String query){
		StringBuffer sql = new StringBuffer();
		sql.append("select title,ts_headline(body, plainto_tsquery('")
		.append(query).append("')) as body from xpsearchyao_schema.post");
		
		return daoHelper.getSession().createSQLQuery(sql.toString())
		.setResultTransformer(Transformers.ALIAS_TO_ENTITY_MAP).list();
	}
	
}
