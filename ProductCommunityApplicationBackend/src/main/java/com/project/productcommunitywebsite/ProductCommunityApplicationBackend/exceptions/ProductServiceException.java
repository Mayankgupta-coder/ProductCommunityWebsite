package com.project.productcommunitywebsite.ProductCommunityApplicationBackend.exceptions;

@SuppressWarnings("serial")
public class ProductServiceException extends RuntimeException {
	
	public ProductServiceException(String message) {
		super(message);
	}
}
