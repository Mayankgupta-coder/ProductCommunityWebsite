package com.project.productcommunitywebsite.ProductCommunityApplicationBackend.dao;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.project.productcommunitywebsite.ProductCommunityApplicationBackend.entities.Categories;
import com.project.productcommunitywebsite.ProductCommunityApplicationBackend.entities.Products;

public interface ProductsDao extends CrudRepository<Products,Integer>{

	public Products findByProductId(int id);
	@Query("SELECT p FROM Products p WHERE p.productBrand in :brands")
	public List<Products> findByProductBrand(@Param("brands")ArrayList<String> brand);
	public List<Products> findByCategory(Categories category);

}
