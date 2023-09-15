package com.project.productcommunitywebsite.ProductCommunityApplicationBackend.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.project.productcommunitywebsite.ProductCommunityApplicationBackend.entities.Reviews;
import com.project.productcommunitywebsite.ProductCommunityApplicationBackend.services.ReviewsServiceImpl;

@RestController
public class ReviewsController {

	@Autowired
	public ReviewsServiceImpl reviewsService;
	
	//	Api to post review
	
	@PostMapping("reviews")
	@CrossOrigin("*")
	public ResponseEntity<Reviews> addReview(@RequestBody Reviews review) {
		try {
			review.setApproved(true);
			Reviews addedReview=reviewsService.addReviews(review);
			return ResponseEntity.of(Optional.of(addedReview));
		}catch(Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}
	
	//	Api to get all reviews
	
	@GetMapping("reviews")
	@CrossOrigin("*")
	public ResponseEntity<List<Reviews>> getReviews() {
		try {
			List<Reviews>reviews=reviewsService.getReviews();
			if(reviews.size()==0) {
				return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
			}
			return new ResponseEntity<>(reviews,HttpStatus.OK);
		} catch(Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}
	
	//	Api to update review
	
	@PutMapping("/reviews/{id}")
	@CrossOrigin("*")
	public ResponseEntity<Reviews> updateReview(@RequestBody Reviews review,@PathVariable("id") int id) {
		try {
			reviewsService.updateReview(review, id);
			return ResponseEntity.of(Optional.of(review));
		}catch(Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}
}

