package com.project.productcommunitywebsite.ProductCommunityApplicationBackend.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.project.productcommunitywebsite.ProductCommunityApplicationBackend.entities.Users;
import com.project.productcommunitywebsite.ProductCommunityApplicationBackend.exceptions.ProductServiceException;
import com.project.productcommunitywebsite.ProductCommunityApplicationBackend.exceptions.UserServiceException;
import com.project.productcommunitywebsite.ProductCommunityApplicationBackend.services.UsersServiceImpl;

@RestController
public class UsersController {

	@Autowired
	private UsersServiceImpl usersService;
	
	//	Api to register user
	
	@PostMapping("users")
	@CrossOrigin("*")
	public ResponseEntity<Users> registerUser(@RequestBody Users user) {
		System.out.println(user);
		try {
			Users addedUser=usersService.registerUser(user);
			return ResponseEntity.of(Optional.of(addedUser));
		}catch(Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}
	
	//	Api to get all users details
	
	@GetMapping("users")
	@CrossOrigin("*")
	public ResponseEntity<List<Users>> getusers() {
		try {
			List<Users> users=usersService.getUsers();
			if(users.size()==0) {
				throw new UserServiceException("Users not found");
			}
			return new ResponseEntity<>(users,HttpStatus.OK);
		} catch(Exception e) {
			if(e.getClass().getSimpleName().equals("UserServiceException")) {
				throw new UserServiceException("Users not found");
			}
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}
}
