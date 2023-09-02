package com.project.productcommunitywebsite.ProductCommunityApplicationBackend.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Admin {
	@Column(nullable = false,name = "id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
	private int adminId;
	
	@Column(nullable = false,name = "username")
	private String userName;
	
	@Column(nullable = false,name = "password")
	private String password;

	public Admin(String userName, String password) {
		super();
		this.userName = userName;
		this.password = password;
	}

	public Admin() {
		super();
	}

	public int getAdminId() {
		return adminId;
	}

	public void setAdminId(int adminId) {
		this.adminId = adminId;
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
}
