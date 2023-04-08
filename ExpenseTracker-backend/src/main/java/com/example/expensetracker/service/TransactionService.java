package com.example.expensetracker.service;

import com.example.expensetracker.model.PresetAverages;
import com.example.expensetracker.model.PresetTransactions;
import com.example.expensetracker.model.Transaction;
import com.example.expensetracker.repository.TransactionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TransactionService {
    private final TransactionRepository transactionRepository;
    public List<Transaction> findAllTransactionsByUserId(Long id){
        return transactionRepository.findByUserId(id);
    }

    public Transaction addTransaction(Transaction transaction){
        return transactionRepository.save(transaction);
    }

    public PresetTransactions getPresetTransactions(Long userId, String date) {
        return transactionRepository.getPresetTransactions(userId, date);
    }

    public List<Transaction> getTransactionsBetweenDates(Long userId, String from, String to){
        return transactionRepository.findAllByUserIdAndTransactionDateBetween(userId, from, to);
    }

    public PresetAverages getPresetAverages(Long userId, String date){
        return transactionRepository.getPresetAverages(userId, date);
    }

}
