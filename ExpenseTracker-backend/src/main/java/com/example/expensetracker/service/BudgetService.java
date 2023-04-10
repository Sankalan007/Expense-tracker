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
    public SpendCategory getAllBudgetsByUserId(Long id){
        return budgetRepository.findCategories(id);
    }
    public Budget addBudget(Budget budget){
        return budgetRepository.save(budget);
    }
    public Budget deleteBudget()
}
