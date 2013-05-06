package com.example.xpsearchyao.entity;

import java.util.Date;

import javax.persistence.Entity;

@Entity
public class User extends BaseEntity {

    private Long reputation;
    private Date createDate;
    private String displayName;
    private Date lastAccessDate;
    private String location;
    private String aboutMe;
    private Long views;
    private Long upVotes;
    private Long downVotes;
    private String emailHash;
    private String password;
    
	public Long getReputation() {
		return reputation;
	}
	public void setReputation(Long reputation) {
		this.reputation = reputation;
	}
	public Date getCreateDate() {
		return createDate;
	}
	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}
	public String getDisplayName() {
		return displayName;
	}
	public void setDisplayName(String displayName) {
		this.displayName = displayName;
	}
	public Date getLastAccessDate() {
		return lastAccessDate;
	}
	public void setLastAccessDate(Date lastAccessDate) {
		this.lastAccessDate = lastAccessDate;
	}
	public String getLocation() {
		return location;
	}
	public void setLocation(String location) {
		this.location = location;
	}
	public String getAboutMe() {
		return aboutMe;
	}
	public void setAboutMe(String aboutMe) {
		this.aboutMe = aboutMe;
	}
	public Long getViews() {
		return views;
	}
	public void setViews(Long views) {
		this.views = views;
	}
	public Long getUpVotes() {
		return upVotes;
	}
	public void setUpVotes(Long upVotes) {
		this.upVotes = upVotes;
	}
	public Long getDownVotes() {
		return downVotes;
	}
	public void setDownVotes(Long downVotes) {
		this.downVotes = downVotes;
	}
	public String getEmailHash() {
		return emailHash;
	}
	public void setEmailHash(String emailHash) {
		this.emailHash = emailHash;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
    
   
    
    
}
