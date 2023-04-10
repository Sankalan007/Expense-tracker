package com.example.expensetracker.service;

import com.example.expensetracker.model.Budget;
import com.example.expensetracker.model.SpendCategory;
import com.example.expensetracker.repository.BudgetRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BudgetService {
    private final BudgetRepository budgetRepository;
    public Optional<Budget> getBudgetByCategory(String category){
        return budgetRepository.findBudgetByCategory(category);
    }
    public Budget findBudgetById(Long id){
        Optional<Budget> budgetOptional = budgetRepository.findById(id);
        return budgetOptional.orElse(null);
    }
    public SpendCategory getAllBudgetsByUserId(Long id){
        return budgetRepository.findCategories(id);
    }
    public Budget addBudget(Budget budget){
        return budgetRepository.save(budget);
    }

    public Budget updateBudget(Budget budget){
        return budgetRepository.save(budget);
    }
    public void deleteBudget(Long id){
        budgetRepository.deleteById(id);
    }
}
