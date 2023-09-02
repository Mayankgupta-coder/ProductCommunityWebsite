package com.project.productcommunitywebsite.ProductCommunityApplicationBackend.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

@Entity
public class Reviews {

	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(nullable = false,name = "id")
    @Id
	private int reviewId;
	
	@Column(nullable = false,name = "review")
	private String review;
	
	@Column(nullable = false,name = "rating")
	private int rating;
	
	@Column(nullable = false,name = "approved")
	private boolean isApproved;
	
	@ManyToOne
	private Products product;
	
	@ManyToOne
	private Users user;

	public Reviews(String review, int rating, boolean isApproved, Products product, Users user) {
		super();
		this.review = review;
		this.rating = rating;
		this.isApproved = isApproved;
		this.product = product;
		this.user = user;
	}
	
	public Reviews() {
		super();
	}


	public int getReviewId() {
		return reviewId;
	}

	public void setReviewId(int reviewId) {
		this.reviewId = reviewId;
	}

	public String getReview() {
		return review;
	}

	public void setReview(String review) {
		this.review = review;
	}

	public int getRating() {
		return rating;
	}

	public void setRating(int rating) {
		this.rating = rating;
	}

	public boolean isApproved() {
		return isApproved;
	}

	public void setApproved(boolean isApproved) {
		this.isApproved = isApproved;
	}

	public Products getProduct() {
		return product;
	}

	public void setProduct(Products product) {
		this.product = product;
	}

	public Users getUser() {
		return user;
	}

	public void setUser(Users user) {
		this.user = user;
	}
	
}

