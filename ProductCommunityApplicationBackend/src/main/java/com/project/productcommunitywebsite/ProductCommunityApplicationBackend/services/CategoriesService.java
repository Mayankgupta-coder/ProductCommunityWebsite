package com.project.productcommunitywebsite.ProductCommunityApplicationBackend.services;

import java.io.IOException;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.project.productcommunitywebsite.ProductCommunityApplicationBackend.entities.Categories;

public interface CategoriesService {
public Categories addCategory(Categories category);
	
	public List<Categories> getCategories();
	
	public List<Categories> getCategoriesUsingPagination();
	
	public Categories getCategory(int id);
	
	public Categories updateCategory(Categories category,int id);
	
	public String uploadCategoryImage(String path,MultipartFile file) throws IOException;
}
