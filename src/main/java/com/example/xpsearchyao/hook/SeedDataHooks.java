package com.example.xpsearchyao.hook;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import org.hibernate.jdbc.Work;

import com.britesnow.snow.web.db.hibernate.HibernateDaoHelper;
import com.britesnow.snow.web.db.hibernate.HibernateSessionInViewHandler;
import com.britesnow.snow.web.hook.AppPhase;
import com.britesnow.snow.web.hook.On;
import com.britesnow.snow.web.hook.annotation.WebApplicationHook;
import com.example.xpsearchyao.dao.PostDao;
import com.example.xpsearchyao.dao.UserDao;
import com.example.xpsearchyao.entity.Post;
import com.example.xpsearchyao.util.DataReader;
import com.google.inject.Singleton;

@Singleton
public class SeedDataHooks {

    /**
     * This will be called to see the database (for demo only)
     * 
     * @param itemDao
     *            will be injected by Snow with the Guice binding
     * @param userDao
     *            will be injected by Snow with the Guice binding
     * @param inView
     *            will be injected by Snow with the Guice binding (needed to open the connection for this thread to use
     *            daoHelper)
     * 
     */
    @WebApplicationHook(phase = AppPhase.INIT)
    public void seedStore(UserDao userDao,PostDao postDao, HibernateSessionInViewHandler inView) {
    	inView.openSessionInView();
    	List<Map> posts = DataReader.readXML("Posts.xml");
    	int i = 9;
    	for(Map m:posts){
    		i++;
    		if(i==10){
    			break;
    		}
    		System.out.println(m.get("Body"));
    		Post post = new Post();
    		post.setBody(((String)m.get("Body")));
    		post.setTitle((String)m.get("Title"));
    		postDao.save(post);
    	}
    }

    /**
     * Using HSQLDB we need to shutdown the database to be written in the file system.
     * 
     * Note that if you do not shutdown your webapp gracefully, the data won't be written to disk. 
     * 
     * @param inView
     * @param daoHelper
     */
    @WebApplicationHook(phase = AppPhase.SHUTDOWN,on=On.BEFORE)
    public void shutdownDb(HibernateSessionInViewHandler inView, HibernateDaoHelper daoHelper){
        try {
            inView.openSessionInView();
            daoHelper.getSession().doWork(new Work() {
                public void execute(Connection con) throws SQLException {
                    con.prepareStatement("shutdown compact").execute();
                }
            });
            inView.closeSessionInView();
        } catch (Throwable e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }        
    }
}
