package com.example.expensetracker.repository;

import com.example.expensetracker.model.PresetAverages;
import com.example.expensetracker.model.PresetTransactions;
import com.example.expensetracker.model.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    List<Transaction> findByUserId(Long id);

    @Query("SELECT COALESCE(SUM(t.amount), 0) FROM Transaction t WHERE t.userId = ?1 AND t.type = 'earn' AND t.transactionDate = ?2")
    Double sumEarnByDay(Long userId, String date);

    @Query("SELECT COALESCE(SUM(t.amount), 0) FROM Transaction t WHERE t.userId = ?1 AND t.type = 'spend' AND t.transactionDate = ?2")
    Double sumSpendByDay(Long userId, String date);

    @Query("SELECT COALESCE(SUM(t.amount), 0) FROM Transaction t WHERE t.userId = ?1 AND t.type = 'earn' AND t.transactionDate LIKE ?2%")
    Double sumEarnByMonth(Long userId, String month);

    @Query("SELECT COALESCE(SUM(t.amount), 0) FROM Transaction t WHERE t.userId = ?1 AND t.type = 'spend' AND t.transactionDate LIKE ?2%")
    Double sumSpendByMonth(Long userId, String month);

    @Query("SELECT COALESCE(SUM(t.amount), 0) FROM Transaction t WHERE t.userId = ?1 AND t.type = 'earn' AND t.transactionDate LIKE ?2%")
    Double sumEarnByYear(Long userId, String year);

    @Query("SELECT COALESCE(SUM(t.amount), 0) FROM Transaction t WHERE t.userId = ?1 AND t.type = 'spend' AND t.transactionDate LIKE ?2%")
    Double sumSpendByYear(Long userId, String year);


    default PresetTransactions getPresetTransactions(Long userId, String date) {
        return PresetTransactions.builder()
                .dailyEarn(sumEarnByDay(userId, date))
                .dailySpend(sumSpendByDay(userId, date))
                .monthlyEarn(sumEarnByMonth(userId, date.substring(0, 7)))
                .monthlySpend(sumSpendByMonth(userId, date.substring(0, 7)))
                .annualEarn(sumEarnByYear(userId, date.substring(0, 4)))
                .annualSpend(sumSpendByYear(userId, date.substring(0, 4)))
                .build();
    }

    @Query("SELECT t FROM Transaction t WHERE t.userId = ?1 AND t.transactionDate BETWEEN ?2 AND ?3")
    List<Transaction> findAllByUserIdAndTransactionDateBetween(Long userId, String startDate, String endDate);

    @Query("SELECT COALESCE(SUM(t.amount), 0) from Transaction t WHERE t.userId = ?1 AND t.type = 'earn' AND t.transactionDate BETWEEN ?2 AND ?3")
    Double earnBetweenDates(Long userId, String startDate, String endDate);

    @Query("SELECT COALESCE(SUM(t.amount), 0) from Transaction t WHERE t.userId = ?1 AND t.type = 'spend' AND t.transactionDate BETWEEN ?2 AND ?3")
    Double spendBetweenDates(Long userId, String startDate, String endDate);

    default PresetAverages getPresetAverages(Long userId, String Date){
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate date = LocalDate.parse(Date, formatter);
        LocalDate currentDate = LocalDate.now();
        LocalDate last7DaysStartDate = currentDate.minusDays(6);
        LocalDate monthStartDate = LocalDate.of(date.getYear(), date.getMonth(), 1);
        LocalDate yearStartDate = LocalDate.of(date.getYear(), 1, 1);

        Double sevenDaysEarn = earnBetweenDates(userId, last7DaysStartDate.toString(), currentDate.toString());
        Double sevenDaysSpend = spendBetweenDates(userId, last7DaysStartDate.toString(), currentDate.toString());
        Double sevenDaysAverage = (sevenDaysEarn - sevenDaysSpend) / 7;

        Double monthEarn = earnBetweenDates(userId, monthStartDate.toString(), currentDate.toString());
        Double monthSpend = spendBetweenDates(userId, monthStartDate.toString(), currentDate.toString());
        Integer noOfDaysPassedInMonth = currentDate.getDayOfMonth();
        Double monthlyAverage = (monthEarn - monthSpend) / noOfDaysPassedInMonth;

        Double yearEarn = earnBetweenDates(userId, yearStartDate.toString(), currentDate.toString());
        Double yearSpend = spendBetweenDates(userId, yearStartDate.toString(), currentDate.toString());
        Integer noOfDaysPassedInYear = currentDate.getDayOfYear();
        Double annualAverage = (yearEarn - yearSpend) / noOfDaysPassedInYear;

        return PresetAverages.builder()
                .sevenDaysAverage(sevenDaysAverage)
                .monthlyAverage(monthlyAverage)
                .annualAverage(annualAverage)
                .build();
    }
}



