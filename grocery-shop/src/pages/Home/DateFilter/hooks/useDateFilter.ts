import { useState, useCallback } from "react";
import { DateFilterProps } from "..";

export const useDateFilter = (dateFilterProps: DateFilterProps) => {
    const { setEndDate, setStartDate, startDate, endDate, fetchTransactions } = dateFilterProps;
    const [tempStartDate, setTempStartDate] = useState<Date | null>(startDate);
    const [tempEndDate, setTempEndDate] = useState<Date | null>(endDate);
  
    // פונקציה לעדכון התאריכים בפועל רק אחרי לחיצה על הכפתור
    const handleFilterClick = useCallback(() => {
      fetchTransactions(tempStartDate, tempEndDate, 1);
      setStartDate(tempStartDate);
      setEndDate(tempEndDate);
    }, [fetchTransactions, tempStartDate, tempEndDate, setStartDate, setEndDate]);
    
    return {
        handleFilterClick,
        setTempStartDate,
        setTempEndDate,
        tempStartDate,
        tempEndDate
    };
};
