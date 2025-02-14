import React from "react";
import { formatDate } from "../../utils";

interface HeaderProps {
    startDate: Date | null;
    endDate: Date | null;
}

const Header: React.FC<HeaderProps> = ({ startDate, endDate }) => {
  return (
    <header className="bg-blue-500 text-white py-4 px-6 text-center">
      <h2 className="text-lg font-semibold">
        טווח תאריכים נוכחי: {formatDate(endDate)} - {formatDate(startDate)} 
      </h2>
    </header>
  );
};

export default Header;