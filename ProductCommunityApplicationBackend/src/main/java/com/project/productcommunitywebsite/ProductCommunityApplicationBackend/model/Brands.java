package com.project.productcommunitywebsite.ProductCommunityApplicationBackend.model;

import java.util.ArrayList;

public class Brands {
	private ArrayList<String>brands;

	public Brands(ArrayList<String> brands) {
		super();
		this.brands = brands;
	}

	public Brands() {
		super();
	}

	public ArrayList<String> getBrands() {
		return brands;
	}

	public void setBrands(ArrayList<String> brands) {
		this.brands = brands;
	}
}
