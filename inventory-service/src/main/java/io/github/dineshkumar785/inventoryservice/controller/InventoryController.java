package io.github.dineshkumar785.inventoryservice.controller;

import io.github.dineshkumar785.inventoryservice.entity.Inventory;
import io.github.dineshkumar785.inventoryservice.service.InventoryService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/inventory")
public class InventoryController {

    private final InventoryService inventoryService;

    public InventoryController(InventoryService inventoryService) {
        this.inventoryService = inventoryService;
    }

    @GetMapping("/{productId}")
    public Inventory getInventory(@PathVariable Long productId) {
        return inventoryService.getInventory(productId);
    }

    @PostMapping("/{productId}/add")
    public Inventory addStock(
            @PathVariable Long productId,
            @RequestParam int quantity) {

        return inventoryService.addStock(productId, quantity);
    }

    @PostMapping("/{productId}/remove")
    public Inventory removeStock(
            @PathVariable Long productId,
            @RequestParam int quantity) {

        return inventoryService.removeStock(productId, quantity);
    }

    @GetMapping
    public List<Inventory> getAllInventory() {
        return inventoryService.getAllInventory();
    }
}