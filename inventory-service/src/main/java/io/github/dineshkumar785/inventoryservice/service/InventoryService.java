package io.github.dineshkumar785.inventoryservice.service;

import io.github.dineshkumar785.inventoryservice.entity.Inventory;
import io.github.dineshkumar785.inventoryservice.repository.InventoryRepository;
import org.springframework.stereotype.Service;
import java.util.List;
@Service
public class InventoryService {

    private final InventoryRepository inventoryRepository;

    public InventoryService(InventoryRepository inventoryRepository) {
        this.inventoryRepository = inventoryRepository;
    }

    public Inventory getInventory(Long productId) {
        return inventoryRepository.findByProductId(productId)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Inventory not found for product: " + productId));
    }

    public Inventory addStock(Long productId, int quantity) {

        if (quantity <= 0) {
            throw new IllegalArgumentException(
                    "Quantity must be greater than zero");
        }

        Inventory inventory = inventoryRepository
                .findByProductId(productId)
                .orElseGet(() -> {
                    Inventory newInventory = new Inventory();
                    newInventory.setProductId(productId);
                    newInventory.setQuantity(0);
                    return newInventory;
                });

        inventory.setQuantity(
                inventory.getQuantity() + quantity
        );

        return inventoryRepository.save(inventory);
    }

    public Inventory removeStock(Long productId, int quantity) {

        if (quantity <= 0) {
            throw new IllegalArgumentException(
                    "Quantity must be greater than zero");
        }

        Inventory inventory = getInventory(productId);

        if (inventory.getQuantity() < quantity) {
            throw new IllegalArgumentException(
                    "Insufficient stock");
        }

        inventory.setQuantity(
                inventory.getQuantity() - quantity
        );

        return inventoryRepository.save(inventory);
    }
    public List<Inventory> getAllInventory() {
        return inventoryRepository.findAll();
    }
}