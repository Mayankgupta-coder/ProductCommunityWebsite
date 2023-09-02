package com.nagarro.exittest.ProductCommunityWebsiteBackend.dao;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.nagarro.exittest.ProductCommunityWebsiteBackend.entities.Categories;
import com.nagarro.exittest.ProductCommunityWebsiteBackend.entities.Products;

public interface ProductsDao extends CrudRepository<Products,Integer>{

	public Products findByProductId(int id);
	public Products findByProductBrand(String brand);
	public List<Products> findByCategory(Categories category);
}
