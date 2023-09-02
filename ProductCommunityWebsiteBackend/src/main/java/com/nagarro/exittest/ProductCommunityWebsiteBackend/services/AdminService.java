package com.nagarro.exittest.ProductCommunityWebsiteBackend.services;

import java.util.List;

import com.nagarro.exittest.ProductCommunityWebsiteBackend.entities.Admin;

public interface AdminService {
	
	public Admin registerAdmin(Admin admin);
	
	public List<Admin> getAdmin();
}
