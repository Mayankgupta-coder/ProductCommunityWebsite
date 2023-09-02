package com.project.productcommunitywebsite.ProductCommunityApplicationBackend.services;

import java.util.List;

import com.project.productcommunitywebsite.ProductCommunityApplicationBackend.entities.Users;

public interface UsersService {

public Users registerUser(Users user);
	
	public List<Users> getUsers();
}
