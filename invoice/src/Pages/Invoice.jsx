import React from "react";
import { useNavigate } from "react-router-dom";
import { FilePlus, History, Search } from "lucide-react";

function Invoice() {
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        {/* Search Bar */}
        <div className="flex items-center gap-2 w-full max-w-md">
          <input
            type="text"
            placeholder="Search by invoice number, buyer..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="flex items-center gap-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition duration-200 transform hover:scale-105">
            <Search className="w-4 h-4" />
            <span className="hidden sm:inline">Search</span>
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={() => navigate("/invoice-form")}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition duration-200 transform hover:scale-105"
          >
            <FilePlus className="w-4 h-4" />
            <span>Create Invoice</span>
          </button>
          <button
            onClick={() => navigate("/invoice-history")}
            className="flex items-center gap-2 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-100 transition duration-200 transform hover:scale-105"
          >
            <History className="w-4 h-4" />
            <span>History</span>
          </button>
        </div>
      </div>

      {/* Placeholder Content */}
      <div className="border-2 border-dashed border-gray-300 p-10 rounded-xl text-center text-gray-500">
        📋 Your invoices will appear here. Use "Create Invoice" to add new entries.
      </div>
    </div>
  );
}

export default Invoice;
