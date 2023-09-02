package com.project.productcommunitywebsite.ProductCommunityApplicationBackend.entities;

import java.util.LinkedHashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Users {

	@Column(nullable = false,name = "id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
	private int userId;
	
	@Column(nullable = false,name = "username")
	private String userName;
	
	@Column(nullable = false,name = "password")
	private String password;

	@OneToMany(mappedBy="user", cascade=CascadeType.ALL)
	@JsonIgnore
	private Set<Reviews>review=new LinkedHashSet<>();
	
	public Users(String userName, String password, Set<Reviews> review) {
		super();
		this.userName = userName;
		this.password = password;
		this.review = review;
	}

	public Users() {
		super();
	}

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Set<Reviews> getReview() {
		return review;
	}

	public void setReview(Set<Reviews> review) {
		this.review = review;
	}
}

