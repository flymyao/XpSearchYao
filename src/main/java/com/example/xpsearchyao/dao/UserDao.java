package com.example.xpsearchyao.dao;

import com.example.xpsearchyao.entity.User;
import com.google.inject.Singleton;

@Singleton
public class UserDao extends BaseHibernateDao<User> {
    
    
    public User getUserByUserName(String userName){
        return (User) daoHelper.findFirst("from " + entityClass.getSimpleName() + " where userName = ?", userName);
    }
}
