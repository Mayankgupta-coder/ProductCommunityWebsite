package com.project.productcommunitywebsite.ProductCommunityApplicationBackend.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.project.productcommunitywebsite.ProductCommunityApplicationBackend.payload.APIResponse;

@RestControllerAdvice
public class GlobalExceptionHandler {
	
	@ExceptionHandler(ProductServiceException.class)
	public ResponseEntity<APIResponse> productServiceExceptionHandler(ProductServiceException exception) {
		String message=exception.getMessage();
		APIResponse response=new APIResponse("Failed",message);
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
	}
	
	@ExceptionHandler(CategoryServiceException.class)
	public ResponseEntity<APIResponse> categoryServiceExceptionHandler(CategoryServiceException exception) {
		String message=exception.getMessage();
		APIResponse response=new APIResponse("Failed",message);
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
	}
	
	@ExceptionHandler(AdminServiceException.class)
	public ResponseEntity<APIResponse> adminServiceExceptionHandler(AdminServiceException exception) {
		String message=exception.getMessage();
		APIResponse response=new APIResponse("Failed",message);
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
	}
	
	@ExceptionHandler(UserServiceException.class)
	public ResponseEntity<APIResponse> userServiceExceptionHandler(UserServiceException exception) {
		String message=exception.getMessage();
		APIResponse response=new APIResponse("Failed",message);
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
	}
}
