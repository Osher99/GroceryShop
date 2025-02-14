import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import Button from "../../../components/Button";
import { useDateFilter } from "./hooks/useDateFilter";
import CustomDatePicker from "../../../components/DatePicker";

export interface DateFilterProps {
  startDate: Date | null;
  endDate: Date | null;
  setStartDate: (date: Date | null) => void;
  setEndDate: (date: Date | null) => void;
  fetchTransactions: (sDate: Date | null, eDate: Date | null, page: number) => void;
}

const DateFilter: React.FC<DateFilterProps> = (dateFilterProps: DateFilterProps) => {
  const { handleFilterClick, setTempStartDate, setTempEndDate, tempStartDate, tempEndDate } = useDateFilter(dateFilterProps);
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 p-4">
      <Button onClick={handleFilterClick} className="bg-green-500 hover:bg-green-600 font-bold">
        סינון
      </Button>
      <CustomDatePicker
        selected={tempStartDate}
        onChange={setTempStartDate}
      />
      <CustomDatePicker
        selected={tempEndDate}
        onChange={setTempEndDate}
      />
    </div>
  );
};

export default DateFilter;