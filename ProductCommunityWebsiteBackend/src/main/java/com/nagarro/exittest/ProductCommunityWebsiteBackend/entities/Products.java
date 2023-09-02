package com.nagarro.exittest.ProductCommunityWebsiteBackend.entities;

import java.util.LinkedHashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Products {
	
	@Column(nullable = false,name = "id")
    @Id
	private int productId;
	
	@Column(nullable = false,name = "name")
	private String productName;
	
	@Column(nullable = false,name = "brand")
	private String productBrand;
	
	@Column(nullable = false,name = "price")
	private int productPrice;
	
	@Lob
	@Column(nullable = false,name = "description",columnDefinition="TEXT",length = 5000)
	private String productDescription;
	
	@Column(nullable = false,name = "image")
	private String productImage;
	
	@ManyToOne
	private Categories category;
	
	@OneToMany(mappedBy="product", cascade=CascadeType.ALL)
	@JsonIgnore
	private Set<Reviews>review=new LinkedHashSet<>();
	
	public Products(int productId, String productName, String productBrand, int productPrice, String productDescription,
			String productImage, Categories category, Set<Reviews> review) {
		super();
		this.productId = productId;
		this.productName = productName;
		this.productBrand = productBrand;
		this.productPrice = productPrice;
		this.productDescription = productDescription;
		this.productImage = productImage;
		this.category = category;
		this.review = review;
	}
	
	public Products() {
		super();
	}

	public int getProductId() {
		return productId;
	}

	public void setProductId(int productId) {
		this.productId = productId;
	}

	public String getProductName() {
		return productName;
	}

	public void setProductName(String productName) {
		this.productName = productName;
	}

	public String getProductBrand() {
		return productBrand;
	}

	public void setProductBrand(String productBrand) {
		this.productBrand = productBrand;
	}

	public int getProductPrice() {
		return productPrice;
	}

	public void setProductPrice(int productPrice) {
		this.productPrice = productPrice;
	}

	public String getProductDescription() {
		return productDescription;
	}

	public void setProductDescription(String productDescription) {
		this.productDescription = productDescription;
	}

	public String getProductImage() {
		return productImage;
	}

	public void setProductImage(String productImage) {
		this.productImage = productImage;
	}

	public Categories getCategory() {
		return category;
	}

	public void setCategory(Categories category) {
		this.category = category;
	}

	public Set<Reviews> getReview() {
		return review;
	}

	public void setReview(Set<Reviews> review) {
		this.review = review;
	}
}
