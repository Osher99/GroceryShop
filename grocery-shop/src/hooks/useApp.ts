import { useState, useEffect } from "react";
import { formatDateForAPI, parseDate } from "../utils";
import { fetchData } from "../request";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PaginationData } from "../interfaces/PaginationData";

export const useApp = () => {
    const [startDate, setStartDate] = useState<Date | null>(parseDate("01/06/2023"));
    const [endDate, setEndDate] = useState<Date | null>(parseDate("31/12/2023"));
    const [transactions, setTransactions] = useState<PaginationData | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);

    const pageSize = import.meta.env.PAGE_SIZE as number;

    const fetchTransactions = async (sDate: Date | null, eDate: Date | null, page: number) => {
        if (!sDate || !eDate) return;

        if (sDate > eDate) {
            toast.error("תאריך ההתחלה לא יכול להיות אחרי תאריך הסיום!", {
                position: "top-center",
                autoClose: 3000
            });
            return;
        }
        setCurrentPage(page);
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetchData(formatDateForAPI(sDate), formatDateForAPI(eDate), page, pageSize || 10);
            setTransactions(response);
        } catch (err) {
            console.error("Error fetching transactions:", err);
            setError("Failed to fetch transactions");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchTransactions(parseDate("01/06/2023"), parseDate("31/12/2023"), 1);
    }, []);

    return {
        startDate,
        endDate,
        setStartDate,
        setEndDate,
        transactions,
        isLoading,
        error,
        fetchTransactions,
        currentPage
    };
};
