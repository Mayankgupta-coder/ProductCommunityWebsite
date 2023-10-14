package com.project.productcommunitywebsite.ProductCommunityApplicationBackend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.project.productcommunitywebsite.ProductCommunityApplicationBackend.entities.Products;
import com.project.productcommunitywebsite.ProductCommunityApplicationBackend.entities.Reviews;
import com.project.productcommunitywebsite.ProductCommunityApplicationBackend.entities.Users;
import com.project.productcommunitywebsite.ProductCommunityApplicationBackend.services.ProductsServiceImpl;
import com.project.productcommunitywebsite.ProductCommunityApplicationBackend.services.ReviewsServiceImpl;
import com.project.productcommunitywebsite.ProductCommunityApplicationBackend.services.UsersServiceImpl;

@RestController
public class StatsController {

	@Autowired
	private ProductsServiceImpl productsService;
	
	@Autowired
	private UsersServiceImpl usersService;
	
	@Autowired
	public ReviewsServiceImpl reviewsService;
	
	//	Api to get count of all products
	
	@GetMapping("stats/products")
	@CrossOrigin("*")
	public ResponseEntity<Integer> getTotalProducts() {
		try {
			List<Products> products=productsService.getProducts();
			int totalProducts=products.size();
			if(products.size()==0) {
				return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
			}
			return new ResponseEntity<>(totalProducts,HttpStatus.OK);
		} catch(Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}
	
	//	Api to get count of all users
	
	@GetMapping("stats/users")
	@CrossOrigin("*")
	public ResponseEntity<Integer> getTotalUsers() {
		try {
			List<Users> users=usersService.getUsers();
			int totalUsers=users.size();
			if(users.size()==0) {
				return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
			}
			return new ResponseEntity<>(totalUsers,HttpStatus.OK);
		} catch(Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}
	
	//	Api to get count of reviews
	
	@GetMapping("stats/reviews")
	@CrossOrigin("*")
	public ResponseEntity<Integer> getTotalReviews() {
		try {
			List<Reviews>reviews=reviewsService.getReviews();
			int totalReviews=reviews.size();
			if(reviews.size()==0) {
				return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
			}
			return new ResponseEntity<>(totalReviews,HttpStatus.OK);
		} catch(Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}
	
	//	Api to get average rating of products
	
	@GetMapping("stats/product/{id}/rating")
	@CrossOrigin("*")
	public ResponseEntity<Integer> getProductRating(@PathVariable("id") int id) {
		List<Reviews>reviews=reviewsService.getReviews();
		int totalReviews=reviews.size();
		int totalRating=0,totalProductReviews=0,avgRating=0;
		for(int i=0;i<totalReviews;i++) {
			if(reviews.get(i).getProduct().getProductId()==id && reviews.get(i).isApproved()==true) {
				totalRating+=reviews.get(i).getRating();
				totalProductReviews++;
			}
		}
		try {
			avgRating=Math.round(totalRating/totalProductReviews);
		} catch(Exception e) {
			return new ResponseEntity<>(0,HttpStatus.NOT_FOUND);
		}
		if(totalProductReviews==0) {
			return new ResponseEntity<>(0,HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<>(avgRating,HttpStatus.OK);
	}
	
}

