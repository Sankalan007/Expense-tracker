package com.example.expensetracker.controller;

import com.example.expensetracker.model.Budget;
import com.example.expensetracker.model.SpendCategory;
import com.example.expensetracker.service.BudgetService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/v1/budget")
@RequiredArgsConstructor
public class BudgetController {
    private final BudgetService budgetService;
    @GetMapping("/all/{id}")
    public ResponseEntity<SpendCategory> findAll(@PathVariable("id") Long userId){
        SpendCategory budgets = budgetService.getAllBudgetsByUserId(userId);
        return new ResponseEntity<>(budgets, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<Budget> addBudget(@RequestBody Budget budget){
        Budget newBudget = budgetService.addBudget(budget);
        return new ResponseEntity<>(newBudget, HttpStatus.CREATED);
    }
}
