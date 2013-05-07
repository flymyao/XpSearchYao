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
		sql.append("select ")
		.append("ts_headline(title, plainto_tsquery('")
		.append(query).append("'))  as title ")
		.append(",ts_headline(body, plainto_tsquery('")
		.append(query).append("'))  as body ")
		.append(",ts_rank(to_tsvector(body), plainto_tsquery('")
		.append(query)
		.append("')) as bodyRank ")
		.append(",ts_rank(to_tsvector(title), plainto_tsquery('")
		.append(query)
		.append("')) as titleRank ")
		.append(" from xpsearchyao_schema.post ")
		.append(" where ts_rank(to_tsvector(body), plainto_tsquery('")
		.append(query)
		.append(" '))>0 ")
		.append(" order by titleRank,bodyRank desc");
		return daoHelper.getSession().createSQLQuery(sql.toString())
		.setResultTransformer(Transformers.ALIAS_TO_ENTITY_MAP).list();
	}
	
}
