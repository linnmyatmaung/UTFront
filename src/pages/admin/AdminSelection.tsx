import { getAllSelections, SelectionResponse } from "@/api/selectionApi"; // Adjust the import path as necessary
import React, { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar"; // Adjust path based on your project structure
import Loader from "@/common/Loader";

const AdminSelection: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [maleData, setMaleData] = useState<SelectionResponse[]>([]);
  const [femaleData, setFemaleData] = useState<SelectionResponse[]>([]);
  const fetchData = async () => {
    try {
      const data: SelectionResponse[] = await getAllSelections();

      // Separate male and female data
      const males = data.filter((item) => item.gender === "Male");
      const females = data.filter((item) => item.gender === "Female");

      setMaleData(males);
      setFemaleData(females);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar Component */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content */}
      <div className="flex-1 ml-0 md:ml-64 p-6">
        {/* Open Button */}
        {!sidebarOpen && (
          <button
            onClick={() => setSidebarOpen(true)}
            className="mb-4 text-3xl fixed top-4 left-4 z-20 text-gray-800 bg-gray-200 rounded p-1"
            aria-label="Open sidebar"
          >
            &#9776;
          </button>
        )}

        <div className="py-6 flex flex-col justify-center items-center sm:py-12">
          <h1>Selection</h1>
        </div>
      </div>
    </div>
  );
};

export default AdminSelection;
