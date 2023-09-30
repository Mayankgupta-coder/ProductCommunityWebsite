package com.project.productcommunitywebsite.ProductCommunityApplicationBackend.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.project.productcommunitywebsite.ProductCommunityApplicationBackend.entities.Categories;
import com.project.productcommunitywebsite.ProductCommunityApplicationBackend.services.CategoriesServiceImpl;

@RestController
public class CategoriesController {
	
	@Autowired
	private CategoriesServiceImpl categoriesService;

	//	Api to add product category
	
	@PostMapping("categories")
	@CrossOrigin("*")
	public ResponseEntity<Categories> addCategory(@RequestBody Categories category) {
		try {
			Categories addedCategory=categoriesService.addCategory(category);
			return ResponseEntity.of(Optional.of(addedCategory));
		} catch(Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}
	
	//	Api to get all the categories
	
	@GetMapping("categories")
	@CrossOrigin("*")
	public ResponseEntity<List<Categories>> getCategories() {
		try {
			List<Categories> categories=categoriesService.getCategories();
			if(categories.size()==0) {
				return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
			}
			return new ResponseEntity<>(categories,HttpStatus.OK);
		} catch(Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}
	
	@GetMapping("categories/page/{page_num}")
	@CrossOrigin("*")
	public ResponseEntity<List<Categories>> getCategoriesUsingPagination(@PathVariable("page_num") int page_num) {
		List<Categories> categories=categoriesService.getCategories();
		List<Categories> finalCategories = new ArrayList<Categories>();
		if(categories.size()==0 || 3*(page_num-1)>=categories.size()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		}
//		System.out.println(categories.get(2).getCategoryName());
		for(int i=3*(page_num-1);i<3*page_num;i++) {
			finalCategories.add(categories.get(i));
			if(i>=categories.size()-1) {
				break;
			}
		}
		return new ResponseEntity<>(finalCategories,HttpStatus.OK);
	}
	
	//	Api to get categories by their id
	
	@GetMapping("/categories/{id}")
	@CrossOrigin("*")
	public ResponseEntity<Categories> getCategory(@PathVariable("id") int id) {
		try {
			Categories category=categoriesService.getCategory(id);
			if(category==null) {
				return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
			}
		
			return ResponseEntity.of(Optional.of(category));
		} catch(Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}
	
	//	Api to upload category image
	
	@PostMapping("/category/image/uplaod/{id}")
	@CrossOrigin("*")
	public void uploadCategoryImage(@RequestParam("categoryImage") MultipartFile image,@PathVariable("id") int id) throws IOException {
		Categories category=categoriesService.getCategory(id);
		String path="C:\\Users\\DELL\\Desktop\\ProductCommunityWebsite\\frontend\\public\\images";
		String fileName=categoriesService.uploadCategoryImage(path, image);
		category.setCategoryImage(fileName);
		categoriesService.updateCategory(category, id);
	}
	
}

