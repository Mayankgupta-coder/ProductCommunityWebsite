package com.project.productcommunitywebsite.ProductCommunityApplicationBackend.dao;

import org.springframework.data.repository.CrudRepository;

import com.project.productcommunitywebsite.ProductCommunityApplicationBackend.entities.Admin;

public interface AdminDao extends CrudRepository<Admin,Integer> {
	
	public Admin findByAdminId(int id);

}
