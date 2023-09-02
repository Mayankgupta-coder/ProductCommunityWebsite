package com.project.productcommunitywebsite.ProductCommunityApplicationBackend.dao;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.project.productcommunitywebsite.ProductCommunityApplicationBackend.entities.Categories;
import com.project.productcommunitywebsite.ProductCommunityApplicationBackend.entities.Products;

public interface ProductsDao extends CrudRepository<Products,Integer>{

	public Products findByProductId(int id);
	public Products findByProductBrand(String brand);
	public List<Products> findByCategory(Categories category);

}
