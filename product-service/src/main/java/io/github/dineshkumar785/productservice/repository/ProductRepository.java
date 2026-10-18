package io.github.dineshkumar785.productservice.repository;

import io.github.dineshkumar785.productservice.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long>{
    List<Product> findByNameContainingIgnoreCase(String name);

    List<Product> findByCategoryIgnoreCase(String category);

    List<Product> findByNameContainingIgnoreCaseAndCategoryIgnoreCase(
            String name,
            String category
    );
}