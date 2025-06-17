import {
  getAllSelections,
  createCandidate,
  editCandidate,
  deleteCandidate,
  SelectionResponse,
} from "@/api/selectionApi";
import React, { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import Loader from "@/common/Loader";
import SelectionFormModal from "@/components/modal/SelectionFormModal";
import ConfirmDeleteModal from "@/components/modal/ConfirmDeleteModal";
import { toast } from "react-toastify";
import { uploadToCloudinary } from "@/api/cloudinaryUpload";
import "react-toastify/dist/ReactToastify.css";

const AdminSelection: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [maleData, setMaleData] = useState<SelectionResponse[]>([]);
  const [femaleData, setFemaleData] = useState<SelectionResponse[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedData, setSelectedData] = useState<SelectionResponse | null>(
    null
  );
  const [previewImg, setPreviewImg] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    major: "",
    hobby: "",
    gender: "Male",
    profileImg: null as File | null,
  });

  const fetchData = async () => {
    try {
      const data = await getAllSelections();
      setMaleData(data.filter((item) => item.gender === "Male"));
      setFemaleData(data.filter((item) => item.gender === "Female"));
    } catch (error) {
      console.error("Failed to fetch data:", error);
      toast.error("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreate = () => {
    setFormData({
      name: "",
      major: "",
      hobby: "",
      gender: "Male",
      profileImg: null,
    });
    setPreviewImg(null);
    setSelectedData(null);
    setIsDialogOpen(true);
  };

  const handleEdit = (id: number) => {
    const item = [...maleData, ...femaleData].find((i) => i.id === id);
    if (item) {
      setFormData({
        name: item.name,
        major: item.major,
        hobby: item.hobby,
        gender: item.gender,
        profileImg: null,
      });
      setPreviewImg(item.profileImg ?? null);
      setSelectedData(item);
      setIsDialogOpen(true);
    }
  };

  const handleDelete = (id: number) => {
    const item = [...maleData, ...femaleData].find((i) => i.id === id);
    if (item) {
      setSelectedData(item);
      setIsDeleteDialogOpen(true);
    }
  };

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      let imageUrl = selectedData?.profileImg || "";

      if (formData.profileImg instanceof File) {
        imageUrl = await uploadToCloudinary(formData.profileImg);
      }

      const payload = {
        name: formData.name,
        major: formData.major,
        hobby: formData.hobby,
        gender: formData.gender,
        profileImg: imageUrl,
      };

      if (selectedData) {
        await editCandidate(selectedData.id, payload);
        toast.success("Candidate updated successfully");
      } else {
        await createCandidate(payload);
        toast.success("Candidate created successfully");
      }

      await fetchData();
    } catch (error) {
      console.error("Form submission failed:", error);
      toast.error("Failed to submit form");
    } finally {
      setIsDialogOpen(false);
    }
  };

  const confirmDelete = async () => {
    if (selectedData) {
      try {
        await deleteCandidate(selectedData.id);
        toast.success("Candidate deleted successfully");
        await fetchData();
      } catch (error) {
        console.error("Delete failed:", error);
        toast.error("Failed to delete candidate");
      }
    }
    setIsDeleteDialogOpen(false);
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
                  src={item.profileImg}
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
            <div className="flex justify-end mb-4">
              <button
                onClick={handleCreate}
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

      <SelectionFormModal
        isOpen={isDialogOpen}
        formData={formData}
        previewImg={previewImg}
        isEdit={!!selectedData}
        onClose={() => setIsDialogOpen(false)}
        onSubmit={handleSubmitForm}
        onChange={setFormData}
        onImageChange={(file, preview) => {
          setFormData({ ...formData, profileImg: file });
          setPreviewImg(preview);
        }}
      />

      <ConfirmDeleteModal
        isOpen={isDeleteDialogOpen}
        candidateName={selectedData?.name || ""}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={confirmDelete}
      />
    </div>
  );
};

export default AdminSelection;
