package com.nagarro.exittest.ProductCommunityWebsiteBackend.dao;

import org.springframework.data.repository.CrudRepository;

import com.nagarro.exittest.ProductCommunityWebsiteBackend.entities.Admin;

public interface AdminDao extends CrudRepository<Admin,Integer> {
	
	public Admin findByAdminId(int id);
}
