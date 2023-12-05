package com.project.productcommunitywebsite.ProductCommunityApplicationBackend.exceptions;

@SuppressWarnings("serial")
public class CategoryServiceException extends RuntimeException{
	
	public CategoryServiceException(String message) {
		super(message);
	}
}
