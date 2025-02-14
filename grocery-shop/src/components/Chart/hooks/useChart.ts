import { useMemo } from "react";
import { parseDate, formatStringDate } from "../../../utils";
import { PaginationData } from "../../../interfaces/PaginationData";

export const useChart = (data: PaginationData) => {
    const chartData = useMemo(() => {
        if (!data || data?.items?.length === 0) {
            return {
                labels: [],
                datasets: []
            };
        }

        // ממיינים את הנתונים לפי תאריך
        const sortedData = [...data.items].sort((a, b) => 
            parseDate(a.date).getTime() - parseDate(b.date).getTime()
        );

        // יצירת מערכים לגרף
        const labels = sortedData.map(item => formatStringDate(item.date));
        const incomeData = sortedData.map(item => item.income);
        const outcomeData = sortedData.map(item => item.outcome);
        const revenueData = sortedData.map(item => item.income - item.outcome);

        return {
            labels,
            datasets: [
                { label: "Daily Income", data: incomeData, borderColor: "red", fill: false },
                { label: "Daily Outcome", data: outcomeData, borderColor: "blue", fill: false },
                { label: "Clear Revenue", data: revenueData, borderColor: "green", fill: false },
            ],
        };
    }, [data]);

    return { chartData };
};
