import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import { useApp } from "./hooks/useApp";
import './App.css';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App: React.FC = () => {
  const { startDate, endDate, setStartDate, setEndDate, fetchTransactions, transactions, currentPage } = useApp();

  return (
    <div className="bg-gray-100">
      <Header startDate={startDate} endDate={endDate} />
      <ToastContainer position="top-center" autoClose={3000} />
      <main className="flex-grow flex justify-center items-center p-6">
        <div className="bg-white shadow-lg rounded-lg p-6 home">
          <Home data={transactions} startDate={startDate} endDate={endDate} setStartDate={setStartDate} setEndDate={setEndDate} fetchTransactions={fetchTransactions} page={currentPage} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;