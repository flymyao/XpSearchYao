package com.example.xpsearchyao.entity;

import java.util.Date;

import javax.persistence.Entity;

@Entity
public class Post extends BaseEntity{
	
	private Long postTypeId;
	
	private Long acceptedAnswerId;
	
	private Date creationDate;
	
	private Long score;
	
	private Long viewCount;
	
	private String body;
	
	private Long ownerUserId;
	
	private Long lastEditorUserId;
	
	private Date lastEditDate;
	
	private Date lastActivityDate;
	
	private String title;
	
	private String tag;
	
	private Long answerCount;
	
	private Long commentCount;
	
	private Long favoriteCount;
	
	private Date communityOwnedDate;

	public Long getPostTypeId() {
		return postTypeId;
	}

	public void setPostTypeId(Long postTypeId) {
		this.postTypeId = postTypeId;
	}

	public Long getAcceptedAnswerId() {
		return acceptedAnswerId;
	}

	public void setAcceptedAnswerId(Long acceptedAnswerId) {
		this.acceptedAnswerId = acceptedAnswerId;
	}

	public Date getCreationDate() {
		return creationDate;
	}

	public void setCreationDate(Date creationDate) {
		this.creationDate = creationDate;
	}

	public Long getScore() {
		return score;
	}

	public void setScore(Long score) {
		this.score = score;
	}

	public Long getViewCount() {
		return viewCount;
	}

	public void setViewCount(Long viewCount) {
		this.viewCount = viewCount;
	}

	public String getBody() {
		return body;
	}

	public void setBody(String body) {
		this.body = body;
	}

	public Long getOwnerUserId() {
		return ownerUserId;
	}

	public void setOwnerUserId(Long ownerUserId) {
		this.ownerUserId = ownerUserId;
	}

	public Long getLastEditorUserId() {
		return lastEditorUserId;
	}

	public void setLastEditorUserId(Long lastEditorUserId) {
		this.lastEditorUserId = lastEditorUserId;
	}

	public Date getLastEditDate() {
		return lastEditDate;
	}

	public void setLastEditDate(Date lastEditDate) {
		this.lastEditDate = lastEditDate;
	}

	public Date getLastActivityDate() {
		return lastActivityDate;
	}

	public void setLastActivityDate(Date lastActivityDate) {
		this.lastActivityDate = lastActivityDate;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getTag() {
		return tag;
	}

	public void setTag(String tag) {
		this.tag = tag;
	}

	public Long getAnswerCount() {
		return answerCount;
	}

	public void setAnswerCount(Long answerCount) {
		this.answerCount = answerCount;
	}

	public Long getCommentCount() {
		return commentCount;
	}

	public void setCommentCount(Long commentCount) {
		this.commentCount = commentCount;
	}

	public Long getFavoriteCount() {
		return favoriteCount;
	}

	public void setFavoriteCount(Long favoriteCount) {
		this.favoriteCount = favoriteCount;
	}

	public Date getCommunityOwnedDate() {
		return communityOwnedDate;
	}

	public void setCommunityOwnedDate(Date communityOwnedDate) {
		this.communityOwnedDate = communityOwnedDate;
	}
}
