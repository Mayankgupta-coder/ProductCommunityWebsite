package com.nagarro.exittest.ProductCommunityWebsiteBackend.services;

import java.util.List;

import com.nagarro.exittest.ProductCommunityWebsiteBackend.entities.Users;

public interface UsersService {

	public Users registerUser(Users user);
	
	public List<Users> getUsers();
}
