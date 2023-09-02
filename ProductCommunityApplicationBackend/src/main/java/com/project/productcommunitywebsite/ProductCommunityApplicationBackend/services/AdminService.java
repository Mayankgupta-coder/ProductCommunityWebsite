package com.project.productcommunitywebsite.ProductCommunityApplicationBackend.services;

import java.util.List;

import com.project.productcommunitywebsite.ProductCommunityApplicationBackend.entities.Admin;

public interface AdminService {
public Admin registerAdmin(Admin admin);
	
	public List<Admin> getAdmin();
}
