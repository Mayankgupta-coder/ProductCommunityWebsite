package com.nagarro.exittest.ProductCommunityWebsiteBackend.dao;

import org.springframework.data.repository.CrudRepository;

import com.nagarro.exittest.ProductCommunityWebsiteBackend.entities.Users;

public interface UsersDao extends CrudRepository<Users,Integer>{

	public Users findByUserId(int id);
}
