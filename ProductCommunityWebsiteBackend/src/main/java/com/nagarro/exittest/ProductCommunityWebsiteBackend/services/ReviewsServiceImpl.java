package com.nagarro.exittest.ProductCommunityWebsiteBackend.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nagarro.exittest.ProductCommunityWebsiteBackend.dao.ReviewsDao;
import com.nagarro.exittest.ProductCommunityWebsiteBackend.entities.Reviews;

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
