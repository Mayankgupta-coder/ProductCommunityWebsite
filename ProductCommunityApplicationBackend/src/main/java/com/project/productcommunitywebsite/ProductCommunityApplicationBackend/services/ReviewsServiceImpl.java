package com.project.productcommunitywebsite.ProductCommunityApplicationBackend.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.productcommunitywebsite.ProductCommunityApplicationBackend.dao.ReviewsDao;
import com.project.productcommunitywebsite.ProductCommunityApplicationBackend.entities.Reviews;

@Service
public class ReviewsServiceImpl implements ReviewsService {

	@Autowired
	public ReviewsDao reviewsDao;
	
	// Service to post reviews
	
	@Override
	public Reviews addReviews(Reviews review) {
		return reviewsDao.save(review);
	}
	
	// Service to get reviews
	
	@Override
	public List<Reviews> getReviews() {
		List<Reviews>reviews=(List<Reviews>) reviewsDao.findAll();
		return reviews;
	}
	
	// Service to update reviews
	
	@Override
	public Reviews updateReview(Reviews review,int id) {
		return reviewsDao.save(review);
	}
}

