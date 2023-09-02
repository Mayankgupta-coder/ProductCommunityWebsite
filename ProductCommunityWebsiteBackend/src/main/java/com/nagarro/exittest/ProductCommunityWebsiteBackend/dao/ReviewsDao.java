package com.nagarro.exittest.ProductCommunityWebsiteBackend.dao;

import org.springframework.data.repository.CrudRepository;

import com.nagarro.exittest.ProductCommunityWebsiteBackend.entities.Reviews;

public interface ReviewsDao extends CrudRepository<Reviews,Integer> {
	public Reviews findByReviewId(int id);
}
