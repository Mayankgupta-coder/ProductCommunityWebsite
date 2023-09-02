package com.project.productcommunitywebsite.ProductCommunityApplicationBackend.model;

import java.util.ArrayList;

public class Brands {
	private ArrayList<Object>brands;

	public Brands(ArrayList<Object> brands) {
		super();
		this.brands = brands;
	}

	public Brands() {
		super();
	}

	public ArrayList<Object> getBrands() {
		return brands;
	}

	public void setBrands(ArrayList<Object> brands) {
		this.brands = brands;
	}
}
