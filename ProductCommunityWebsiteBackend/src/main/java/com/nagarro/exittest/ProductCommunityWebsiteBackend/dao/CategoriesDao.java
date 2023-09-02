package com.nagarro.exittest.ProductCommunityWebsiteBackend.dao;

import org.springframework.data.repository.CrudRepository;

import com.nagarro.exittest.ProductCommunityWebsiteBackend.entities.Categories;

public interface CategoriesDao extends CrudRepository<Categories,Integer>{

	public Categories findByCategoryId(int id);
}
