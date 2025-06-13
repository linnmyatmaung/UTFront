import { getAllSelections, SelectionResponse } from "@/api/selectionApi";
import { base_img_url } from "@/api/apiClient";
import React, { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import Loader from "@/common/Loader";

const AdminSelection: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [maleData, setMaleData] = useState<SelectionResponse[]>([]);
  const [femaleData, setFemaleData] = useState<SelectionResponse[]>([]);

  const fetchData = async () => {
    try {
      const data: SelectionResponse[] = await getAllSelections();
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

  const handleEdit = (id: number) => {
    console.log("Edit clicked for ID:", id);
  };

  const handleDelete = (id: number) => {
    console.log("Delete clicked for ID:", id);
  };

  const renderTable = (data: SelectionResponse[], title: string) => (
    <div className="mb-10 w-full overflow-x-auto">
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>
      <table className="min-w-full border border-gray-200">
        <thead className="bg-gray-100 text-black">
          <tr>
            <th className="p-3 border">Profile</th>
            <th className="p-3 border">Name</th>
            <th className="p-3 border">Major</th>
            <th className="p-3 border">Hobby</th>
            <th className="p-3 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id} className="text-center border-t">
              <td className="p-3 border">
                <img
                  className="size-28 object-cover rounded-full mx-auto"
                  src={base_img_url + item.profileImg}
                  alt={item.name}
                />
              </td>
              <td className="p-3 border">{item.name}</td>
              <td className="p-3 border">{item.major}</td>
              <td className="p-3 border">{item.hobby}</td>
              <td className="p-3 border space-x-2">
                <button onClick={() => handleEdit(item.id)} title="Edit">
                  ✏️
                </button>
                <button onClick={() => handleDelete(item.id)} title="Delete">
                  🗑️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  if (loading) return <Loader />;

  return (
    <div className="flex min-h-screen">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 ml-0 md:ml-64 p-6">
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
          <h1 className="text-3xl font-bold mb-6">Admin Selection</h1>
          <div className="w-full max-w-6xl">
            {/* Create Button */}
            <div className="flex justify-end mb-4">
              <button
                onClick={() => console.log("Create clicked")}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                + Create
              </button>
            </div>

            {renderTable(maleData, "Male Candidates")}
            {renderTable(femaleData, "Female Candidates")}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSelection;
