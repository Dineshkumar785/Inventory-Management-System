package io.github.dineshkumar785.productservice.controller;

import io.github.dineshkumar785.productservice.service.ProductService;
import io.github.dineshkumar785.productservice.entity.Product;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;


import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController{
    private final ProductService productService;

    public ProductController(ProductService productService){
        this.productService = productService;
    }

    @GetMapping
    public List<Product> getAllProducts(){
        return productService.getAllProducts();
    }

    @PostMapping
    public Product createProduct(@Valid @RequestBody Product product){
        return productService.createProduct(product);
    }

    @GetMapping("/{id}")
    public Product getProductById(@PathVariable Long id) {
        return productService.getProductById(id);
    }

    @PutMapping("/{id}")
    public Product updateProduct(
            @PathVariable Long id,
            @Valid @RequestBody Product product) {

        return productService.updateProduct(id, product);
    }

    @DeleteMapping("/{id}")
    public void deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
    }

    @GetMapping("/search")
    public List<Product> searchProducts(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String category) {

        return productService.searchProducts(name, category);
    }
}