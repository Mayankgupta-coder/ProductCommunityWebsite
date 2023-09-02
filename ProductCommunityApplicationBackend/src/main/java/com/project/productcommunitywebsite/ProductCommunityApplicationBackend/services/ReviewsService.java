package com.project.productcommunitywebsite.ProductCommunityApplicationBackend.services;

import java.util.List;

import com.project.productcommunitywebsite.ProductCommunityApplicationBackend.entities.Reviews;

public interface ReviewsService {

public Reviews addReviews(Reviews review);
	
	public List<Reviews> getReviews();
	
	public Reviews updateReview(Reviews review,int id);
}
