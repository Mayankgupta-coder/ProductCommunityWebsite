package com.project.productcommunitywebsite.ProductCommunityApplicationBackend.dao;

import org.springframework.data.repository.CrudRepository;

import com.project.productcommunitywebsite.ProductCommunityApplicationBackend.entities.Reviews;

public interface ReviewsDao extends CrudRepository<Reviews,Integer> {
	public Reviews findByReviewId(int id);

}
