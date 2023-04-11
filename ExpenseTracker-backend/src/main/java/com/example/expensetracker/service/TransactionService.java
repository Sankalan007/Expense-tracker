package com.example.expensetracker.service;

import com.example.expensetracker.model.*;
import com.example.expensetracker.repository.TransactionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TransactionService {
    private final TransactionRepository transactionRepository;
    public List<Transaction> findAllTransactionsByUserId(Long id){
        return transactionRepository.findByUserId(id);
    }
    public Transaction findTransactionById(Long id){
        Optional<Transaction> transactionOptional = transactionRepository.findById(id);
        return transactionOptional.orElse(null);
    }
    public Transaction addTransaction(Transaction transaction){
        return transactionRepository.save(transaction);
    }

    public Transaction updateTransaction(Transaction transaction){
        return transactionRepository.save(transaction);
    }

    public void deleteTransaction(Long id){
        transactionRepository.deleteById(id);
    }
    public List<Transaction> findAllTransactionsByUserIdCreatedDesc(Long id){
        return transactionRepository.findByUserIdCreatedDesc(id);
    }

    public PresetTransactions getPresetTransactions(Long userId, String date) {
        return transactionRepository.getPresetTransactions(userId, date);
    }

    public List<Transaction> getTransactionsBetweenDates(Long userId, String from, String to){
        return transactionRepository.findAllByUserIdAndTransactionDateBetween(userId, from, to);
    }
    public List<Transaction> getTransactionsBetweenDatesDesc(Long userId, String from, String to){
        return transactionRepository.findAllByUserIdAndTransactionDateBetweenDesc(userId, from, to);
    }

    public List<Transaction> getTransactionsOfCurrentDay(Long userId, String date){
        return transactionRepository.findAllByUserIdFromCurrentDay(userId, date);
    }
    public List<Transaction> getTransactionsOfCurrentMonth(Long userId, String date){
        return transactionRepository.findAllByUserIdFromCurrentMonth(userId, date);
    }

    public List<Transaction> getTransactionsOfCurrentYear(Long userId, String date){
        return transactionRepository.findAllByUserIdFromCurrentYear(userId, date);
    }
    public List<Transaction> getTransactionsOfCurrentDayDesc(Long userId, String date){
        return transactionRepository.findAllByUserIdFromCurrentDayDesc(userId, date);
    }
    public List<Transaction> getTransactionsOfCurrentMonthDesc(Long userId, String date){
        return transactionRepository.findAllByUserIdFromCurrentMonthDesc(userId, date);
    }

    public List<Transaction> getTransactionsOfCurrentYearDesc(Long userId, String date){
        return transactionRepository.findAllByUserIdFromCurrentYearDesc(userId, date);
    }

    public PresetAverages getPresetAverages(Long userId, String date){
        return transactionRepository.getPresetAverages(userId, date);
    }

    public SpendCategory getAmountByCategory(Long userId, String date){
        return transactionRepository.findMonthlySpendCategorySumByUserId(userId, date);
    }

}
