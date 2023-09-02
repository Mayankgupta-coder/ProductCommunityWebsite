package com.project.productcommunitywebsite.ProductCommunityApplicationBackend.dao;

import org.springframework.data.repository.CrudRepository;

import com.project.productcommunitywebsite.ProductCommunityApplicationBackend.entities.Categories;

public interface CategoriesDao extends CrudRepository<Categories,Integer>{

	public Categories findByCategoryId(int id);

}
