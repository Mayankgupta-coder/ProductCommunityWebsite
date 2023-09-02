package com.nagarro.exittest.ProductCommunityWebsiteBackend.services;

import java.util.List;

import com.nagarro.exittest.ProductCommunityWebsiteBackend.entities.Reviews;

public interface ReviewsService {

	public Reviews addReviews(Reviews review);
	
	public List<Reviews> getReviews();
	
	public Reviews updateReview(Reviews review,int id);
}
