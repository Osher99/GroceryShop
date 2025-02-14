import React from "react";
import ChartComponent from "../../components/Chart";
import DateFilter from "./DateFilter";
import { PaginationData } from "../../interfaces/PaginationData";

interface HomeProps {
  startDate: Date | null;
  endDate: Date | null;
  setStartDate: (date: Date | null) => void;
  setEndDate: (date: Date | null) => void;
  data: PaginationData | null;
  fetchTransactions: (sDate: Date | null, eDate: Date | null, page: number) => void;
  page: number;
}

const Home: React.FC<HomeProps> = ({ startDate, endDate, setStartDate, setEndDate, data, fetchTransactions, page }) => {
  return (
    <div className="flex flex-col items-center justify-center p-6">
      <h1 className="text-2xl font-bold mb-4">📊 דוח הכנסות והוצאות</h1>
      <p className="text-gray-600">בחר טווח תאריכים וצפה בנתוני החנות.</p>
      <div className="">
          <DateFilter
            startDate={startDate}
            endDate={endDate}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
            fetchTransactions={fetchTransactions}
          />
          {data && <ChartComponent data={data} />}
          <hr/>
          <div className="page-data">
          <span >עמוד {page} מתוך {data?.totalPages}</span>
            <br/>
            {data?.items?.length && <span>מציג {data?.items?.length} תוצאות מתוך {data?.totalItems} סה"כ</span>}
        </div>
        <hr/>

        <button
          className="px-4 py-2 border rounded disabled:opacity-50"
          disabled={page === data?.totalPages}
          onClick={() => fetchTransactions(startDate, endDate, page+1)}
        >
          הבא
        </button>
        <button
          className="px-4 py-2 border rounded disabled:opacity-50"
          disabled={page === 1}
          onClick={() => fetchTransactions(startDate, endDate, page-1)}
        >
          הקודם
        </button>
        </div>
    </div>
  );
};

export default Home;
