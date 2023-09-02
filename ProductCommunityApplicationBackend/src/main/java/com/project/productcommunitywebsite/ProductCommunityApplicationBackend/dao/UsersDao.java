package com.project.productcommunitywebsite.ProductCommunityApplicationBackend.dao;

import org.springframework.data.repository.CrudRepository;

import com.project.productcommunitywebsite.ProductCommunityApplicationBackend.entities.Users;

public interface UsersDao extends CrudRepository<Users,Integer>{

	public Users findByUserId(int id);

}
