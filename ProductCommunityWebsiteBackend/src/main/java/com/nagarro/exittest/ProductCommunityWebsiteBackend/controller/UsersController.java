package com.nagarro.exittest.ProductCommunityWebsiteBackend.controller;

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

import com.nagarro.exittest.ProductCommunityWebsiteBackend.entities.Users;
import com.nagarro.exittest.ProductCommunityWebsiteBackend.services.UsersServiceImpl;

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
				return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
			}
			return new ResponseEntity<>(users,HttpStatus.OK);
		} catch(Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}
}
