package com.project.productcommunitywebsite.ProductCommunityApplicationBackend.exceptions;

@SuppressWarnings("serial")
public class UserServiceException extends RuntimeException{

	public UserServiceException(String message) {
		super(message);
	}
}
