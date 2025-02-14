import React, { useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Calendar } from "lucide-react";

interface DatePickerProps {
  selected: Date | null;
  onChange: (date: Date | null) => void;
}

const CustomDatePicker: React.FC<DatePickerProps> = ({ selected, onChange }) => {
  const datepickerRef = useRef<any>(null);
  return (
    <div className="flex items-center gap-2 border border-gray-300 p-2 rounded-lg shadow-sm bg-gray-800 text-white border border-gray-500 p-2">
      <button onClick={() => datepickerRef.current?.setOpen(true)}>
        <Calendar size={20} className="text-gray-300 cursor-pointer" />
      </button>
      <DatePicker
        ref={datepickerRef}
        selected={selected}
        onChange={onChange}
        className="bg-gray-800 text-white border border-gray-500 p-2 text-center"
        dateFormat="dd/MM/yyyy"
      />
    </div>
  );
};

export default CustomDatePicker;