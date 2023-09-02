package com.nagarro.exittest.ProductCommunityWebsiteBackend.services;

import java.io.IOException;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.nagarro.exittest.ProductCommunityWebsiteBackend.entities.Categories;
import com.nagarro.exittest.ProductCommunityWebsiteBackend.entities.Products;

public interface ProductsService {

	public Products addProduct(Products product);
	
	public List<Products> getProducts();
	
	public Products getProduct(int id);
	
	public List<Products> getProductsByCategory(Categories category);
	
	public Products updateProduct(Products product,int id);
	
	public void deleteProduct(int id);
	
	public String uploadProductImage(String path,MultipartFile file) throws IOException;
}
