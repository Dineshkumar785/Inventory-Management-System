package io.github.dineshkumar785.productservice.service;

import io.github.dineshkumar785.productservice.entity.Product;
import io.github.dineshkumar785.productservice.exception.ProductNotFoundException;
import io.github.dineshkumar785.productservice.repository.ProductRepository;
import org.springframework.stereotype.Service;


import java.util.List;

@Service
public class ProductService{
    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Product createProduct(Product product) {
        return productRepository.save(product);
    }

    public Product getProductById(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new ProductNotFoundException(
                        "Product not found with id: " + id));
    }

    public Product updateProduct(Long id, Product updatedProduct) {

        Product existingProduct = productRepository.findById(id)
                .orElseThrow(() -> new ProductNotFoundException(
                        "Product not found with id: " + id));

        existingProduct.setName(updatedProduct.getName());
        existingProduct.setCategory(updatedProduct.getCategory());
        existingProduct.setPrice(updatedProduct.getPrice());
        existingProduct.setDescription(updatedProduct.getDescription());

        return productRepository.save(existingProduct);
    }

    public void deleteProduct(Long id) {

        Product existingProduct = productRepository.findById(id)
                .orElseThrow(() -> new ProductNotFoundException(
                        "Product not found with id: " + id));

        productRepository.delete(existingProduct);
    }
    public List<Product> searchProducts(
            String name,
            String category) {

        boolean hasName = name != null && !name.isBlank();
        boolean hasCategory = category != null && !category.isBlank();

        if (hasName && hasCategory) {
            return productRepository
                    .findByNameContainingIgnoreCaseAndCategoryIgnoreCase(
                            name,
                            category
                    );
        }

        if (hasName) {
            return productRepository
                    .findByNameContainingIgnoreCase(name);
        }

        if (hasCategory) {
            return productRepository
                    .findByCategoryIgnoreCase(category);
        }

        return productRepository.findAll();
    }
}