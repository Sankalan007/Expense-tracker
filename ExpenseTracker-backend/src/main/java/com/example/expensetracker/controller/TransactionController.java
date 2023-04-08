package com.example.expensetracker.controller;

import com.example.expensetracker.model.PresetAverages;
import com.example.expensetracker.model.PresetTransactions;
import com.example.expensetracker.model.Transaction;
import com.example.expensetracker.service.TransactionService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/v1/transaction")
@RequiredArgsConstructor
public class TransactionController {
    private final TransactionService transactionService;
    @Transactional
    @GetMapping("/all/{id}")
    public ResponseEntity<List<Transaction>> getAllTransactionsByUserId(@PathVariable("id") Long id){
        List<Transaction> transactions = transactionService.findAllTransactionsByUserId(id);
        return new ResponseEntity<>(transactions, HttpStatus.OK);
    }
    @GetMapping("/preset-transactions/{userId}/{date}")
    public ResponseEntity<PresetTransactions> getPresetTransactions(@PathVariable Long userId, @PathVariable String date) {
        PresetTransactions presetTransactions = transactionService.getPresetTransactions(userId, date);
        return new ResponseEntity<>(presetTransactions, HttpStatus.OK);
    }

    @GetMapping("/preset-averages/{userId}/{date}")
    public ResponseEntity<PresetAverages> getPresetAverages(@PathVariable Long userId, @PathVariable String date) {
        PresetAverages presetaverages = transactionService.getPresetAverages(userId, date);
        return new ResponseEntity<>(presetaverages, HttpStatus.OK);
    }

    @Transactional
    @GetMapping("/transactions-between/{from}/{to}/{userId}")
    public ResponseEntity<List<Transaction>> getAllTransactionsBetweenDates(@PathVariable("userId") Long userId ,@PathVariable("from") String from, @PathVariable("to") String to){
        List<Transaction> transactions = transactionService.getTransactionsBetweenDates(userId, from, to);
        return new ResponseEntity<>(transactions, HttpStatus.OK);
    }


    @PostMapping("/add")
    public ResponseEntity<Transaction> addNewTransaction(@RequestBody Transaction transaction){
        Transaction newTransaction = transactionService.addTransaction(transaction);
        return new ResponseEntity<>(newTransaction, HttpStatus.CREATED);
    }
}
