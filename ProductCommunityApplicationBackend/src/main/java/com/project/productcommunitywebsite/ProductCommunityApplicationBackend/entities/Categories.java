package com.project.productcommunitywebsite.ProductCommunityApplicationBackend.entities;

import java.util.LinkedHashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Categories {

	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(nullable = false,name = "id")
    @Id
	private int categoryId;
	
	@Column(nullable = false,name = "name")
	private String categoryName;
	
	@Column(nullable = false,name = "image")
	private String categoryImage;

	@OneToMany(mappedBy="category", cascade=CascadeType.ALL)
	@JsonIgnore
	private Set<Products> products=new LinkedHashSet<>();

	public Categories(String categoryName, String categoryImage, Set<Products> products) {
		super();
		this.categoryName = categoryName;
		this.categoryImage = categoryImage;
		this.products = products;
	}

	public Categories() {
		super();
	}


	public int getCategoryId() {
		return categoryId;
	}

	public void setCategoryId(int categoryId) {
		this.categoryId = categoryId;
	}

	public String getCategoryName() {
		return categoryName;
	}

	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}
	
	public String getCategoryImage() {
		return categoryImage;
	}

	public void setCategoryImage(String categoryImage) {
		this.categoryImage = categoryImage;
	}

	public Set<Products> getProducts() {
		return products;
	}

	public void setProducts(Set<Products> products) {
		this.products = products;
	}
	
}

