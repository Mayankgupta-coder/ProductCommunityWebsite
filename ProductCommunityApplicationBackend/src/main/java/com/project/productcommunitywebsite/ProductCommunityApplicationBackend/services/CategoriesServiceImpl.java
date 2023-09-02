package com.project.productcommunitywebsite.ProductCommunityApplicationBackend.services;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import com.project.productcommunitywebsite.ProductCommunityApplicationBackend.dao.CategoriesDao;
import com.project.productcommunitywebsite.ProductCommunityApplicationBackend.entities.Categories;

@Component
public class CategoriesServiceImpl implements CategoriesService {

	@Autowired
	private CategoriesDao categoriesDao;
	
	//	Service to add categories
	
	@Override
	public Categories addCategory(Categories category) {
		return categoriesDao.save(category);
	}
	
    //	Service to get all categories
	
	@Override
	public List<Categories> getCategories() {
		List<Categories> categories=(List<Categories>) categoriesDao.findAll();
		return categories;
	}
	
	@Override
	public List<Categories> getCategoriesUsingPagination() {
		List<Categories> categories=(List<Categories>) categoriesDao.findAll();
		return categories;
	}
	
	//	Service to get category by their id
	
	@Override
	public Categories getCategory(int id) {
		Categories category=categoriesDao.findByCategoryId(id);
		return category;
	}
	
	//	Service to update category
	
	@Override
	public Categories updateCategory(Categories category,int id) {
		return categoriesDao.save(category);
	}
	
	//	Service to upload category image
	
	@Override
	public String uploadCategoryImage(String path,MultipartFile file) throws IOException {
		
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

