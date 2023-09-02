package com.project.productcommunitywebsite.ProductCommunityApplicationBackend.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.productcommunitywebsite.ProductCommunityApplicationBackend.dao.AdminDao;
import com.project.productcommunitywebsite.ProductCommunityApplicationBackend.entities.Admin;

@Service
public class AdminServiceImpl implements AdminService {

	@Autowired
	private AdminDao adminDao;
	
	//	Service to register admins
	
	@Override
	public Admin registerAdmin(Admin admin) {
		return adminDao.save(admin);
	}
	
	//	Service to get details of all admins
	
	@Override
	public List<Admin> getAdmin() {
		List<Admin> admin=(List<Admin>) adminDao.findAll();
		return admin;
	}
}

