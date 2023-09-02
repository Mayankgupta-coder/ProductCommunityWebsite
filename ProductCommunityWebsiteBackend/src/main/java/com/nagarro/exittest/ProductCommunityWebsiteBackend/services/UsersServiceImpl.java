package com.nagarro.exittest.ProductCommunityWebsiteBackend.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nagarro.exittest.ProductCommunityWebsiteBackend.dao.UsersDao;
import com.nagarro.exittest.ProductCommunityWebsiteBackend.entities.Users;

@Service
public class UsersServiceImpl implements UsersService {

	@Autowired
	private UsersDao usersDao;
	
	//	Service to register users
	
	@Override
	public Users registerUser(Users user) {
		return usersDao.save(user);
	}
	
	//	Service to get all users details
	
	@Override
	public List<Users> getUsers() {
		List<Users> users=(List<Users>) usersDao.findAll();
		return users;
	}
}
