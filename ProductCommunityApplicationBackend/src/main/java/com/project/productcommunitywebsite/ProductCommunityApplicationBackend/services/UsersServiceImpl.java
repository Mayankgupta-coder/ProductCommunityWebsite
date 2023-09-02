package com.project.productcommunitywebsite.ProductCommunityApplicationBackend.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.productcommunitywebsite.ProductCommunityApplicationBackend.dao.UsersDao;
import com.project.productcommunitywebsite.ProductCommunityApplicationBackend.entities.Users;

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
