package com.project.productcommunitywebsite.ProductCommunityApplicationBackend.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.project.productcommunitywebsite.ProductCommunityApplicationBackend.entities.Categories;
import com.project.productcommunitywebsite.ProductCommunityApplicationBackend.entities.Products;
import com.project.productcommunitywebsite.ProductCommunityApplicationBackend.model.Brands;
import com.project.productcommunitywebsite.ProductCommunityApplicationBackend.services.ProductsServiceImpl;

@RestController
public class ProductsController {

	@Autowired
	private ProductsServiceImpl productsService;
	
	//	Api to add products
	
	@PostMapping("products")
	@CrossOrigin("*")
	public ResponseEntity<Products> addProduct(@RequestBody Products product) {
		try {
			Products addedProduct=productsService.addProduct(product);
			return ResponseEntity.of(Optional.of(addedProduct));
		}catch(Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}
	
	//	Api to get all products
	
	@GetMapping("products")
	@CrossOrigin("*")
	public ResponseEntity<List<Products>> getProducts() {
		try {
			List<Products> products=productsService.getProducts();
			if(products.size()==0) {
				return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
			}
			return new ResponseEntity<>(products,HttpStatus.OK);
		} catch(Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}
	
	//	Api to get product by their id
	
	@GetMapping("/products/{id}")
	@CrossOrigin("*")
	public ResponseEntity<Products> getProduct(@PathVariable("id") int id) {
		Products product=productsService.getProduct(id);
		if(product==null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		}
	
		return ResponseEntity.of(Optional.of(product));
	}
	
	//	Api to get product by category
	
	@GetMapping("/products/category/{id}")
	@CrossOrigin("*")
	public ResponseEntity<List<Products>> getProductsByCategory(@PathVariable("id") int id) {
		try {
			Categories category=new Categories();
			category.setCategoryId(id);
			List<Products> products=productsService.getProductsByCategory(category);
			if(products.size()==0) {
				return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
			}
			return new ResponseEntity<>(products,HttpStatus.OK);
		} catch(Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}
	
	//	Api to update product details
	
	@PutMapping("/products/{id}")
	@CrossOrigin("*")
	public ResponseEntity<Products> updateProduct(@RequestBody Products product,@PathVariable("id") int id) {
		try {
			productsService.updateProduct(product,id);
			return ResponseEntity.of(Optional.of(product));
		}catch(Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}
	
	//	Api to delete product
	
	@DeleteMapping("/products/{id}")
	@CrossOrigin("*")
	public ResponseEntity<Void> deleteProduct(@PathVariable("id") int id) {
		try {
			productsService.deleteProduct(id);
			return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
		} catch(Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}
	
	//	Api to search products

	@PostMapping("/search/products/{id}")
	@CrossOrigin("*")
	public ResponseEntity<List<Products>>searchProduct(@RequestBody Brands brands,@PathVariable("id") int id){
		List<Object>brand=brands.getBrands();
		List<Products>finaProducts = new ArrayList<Products>();
		List<Products> products=productsService.getProducts();
		if(id==-1) {
			for(int i=0;i<brand.size();i++) {
				for(int j=0;j<products.size();j++) {
					boolean flag=String.valueOf(products.get(j).getProductBrand()).equals(String.valueOf(brand.get(i)));
					if(flag) {
						System.out.println(products.get(j));
						finaProducts.add(products.get(j));
					}
				}
			}
		} else {
			for(int i=0;i<brand.size();i++) {
				for(int j=0;j<products.size();j++) {
					boolean flag=String.valueOf(products.get(j).getProductBrand()).equals(String.valueOf(brand.get(i)));
					if(flag && (products.get(j).getCategory().getCategoryId()==id)) {
						System.out.println(products.get(j));
						finaProducts.add(products.get(j));
					}
				}
			}
		}
		return new ResponseEntity<>(finaProducts,HttpStatus.OK);
	}
	
	//	Api to upload product image

	@PostMapping("/product/image/uplaod/{id}")
	@CrossOrigin("*")
	public void uploadProductImage(@RequestParam("productImage") MultipartFile image,@PathVariable("id") int id) throws IOException {
		Products product=productsService.getProduct(id);
//		System.out.println(product);
		String path="C:\\Users\\mayankgupta08\\Desktop\\java_task\\mayank-gupta\\Assignments\\ExitTest\\ProductCommunityWebsiteFrontend\\src\\assets\\images\\products";
		String fileName=productsService.uploadProductImage(path, image);
//		System.out.println(path);
		product.setProductImage(fileName);
		productsService.updateProduct(product, id);
	}
}

