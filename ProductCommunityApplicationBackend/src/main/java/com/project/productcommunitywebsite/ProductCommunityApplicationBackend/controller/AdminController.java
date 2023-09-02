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

import com.project.productcommunitywebsite.ProductCommunityApplicationBackend.entities.Admin;
import com.project.productcommunitywebsite.ProductCommunityApplicationBackend.services.AdminServiceImpl;

@RestController
public class AdminController {
	
	@Autowired
	public AdminServiceImpl adminService;
	
	//	Api to register admin
	
	@PostMapping("admin")
	@CrossOrigin("*")
	public ResponseEntity<Admin> registerAdmin(@RequestBody Admin admin) {
		try {
			Admin addedAdmin=adminService.registerAdmin(admin);
			return ResponseEntity.of(Optional.of(addedAdmin));
		}catch(Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}
	
	//	Api to get admins
	
	@GetMapping("admin")
	@CrossOrigin("*")
	public ResponseEntity<List<Admin>> getAdmins() {
		try {
			List<Admin> admins=adminService.getAdmin();
			if(admins.size()==0) {
				return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
			}
			return new ResponseEntity<>(admins,HttpStatus.OK);
		} catch(Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}
}

