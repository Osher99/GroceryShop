import { DayData } from "./DayData";

export interface PaginationData {
    items: DayData[];
    totalPages: number;
    pageSize: number;
    totalItems: number;
}
