package com.nagarro.exittest.ProductCommunityWebsiteBackend.services;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.nagarro.exittest.ProductCommunityWebsiteBackend.dao.ProductsDao;
import com.nagarro.exittest.ProductCommunityWebsiteBackend.entities.Categories;
import com.nagarro.exittest.ProductCommunityWebsiteBackend.entities.Products;

@Service
public class ProductsServiceImpl implements ProductsService {

	@Autowired
	private ProductsDao productsDao;
	
	//	Service to add products
	
	@Override
	public Products addProduct(Products product) {
		return productsDao.save(product);
	}
	
	// Service to get all products
	
	@Override
	public List<Products> getProducts() {
		List<Products> products=(List<Products>) productsDao.findAll();
		return products;
	}
	
	// Service to get product by their id
	
	@Override
	public Products getProduct(int id) {
		Products product=productsDao.findByProductId(id);
		return product;
	}
	
	// Service to get product by category
	
	@Override
	public List<Products> getProductsByCategory(Categories category) {
		List<Products> products=(List<Products>) productsDao.findByCategory(category);
		return products;
	}
	
	//	Service to update product details
	
	@Override
	public Products updateProduct(Products product,int id) {
		return productsDao.save(product);
	}
	
	//Service to delete product
	
	@Override
	public void deleteProduct(int id) {
		productsDao.deleteById(id);
	}
	
	// Service to upload product image
	
	@Override
	public String uploadProductImage(String path,MultipartFile file) throws IOException {
		
		String fileName=file.getOriginalFilename();
		String filePath=path+File.separator+fileName;
		File f=new File(path);
		if(!f.exists()) {
			f.mkdir();
		}
		Files.copy(file.getInputStream(), Paths.get(filePath));
		return fileName;
	}
}