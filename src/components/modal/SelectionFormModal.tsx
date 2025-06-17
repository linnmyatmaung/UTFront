import React, { FormEvent } from "react";

interface SelectionFormModalProps {
  isOpen: boolean;
  formData: {
    name: string;
    major: string;
    hobby: string;
    gender: string;
    profileImg?: File | null;
  };
  previewImg: string | null;
  isEdit: boolean;
  onClose: () => void;
  onSubmit: (e: FormEvent) => void;
  onChange: (updated: any) => void;
  onImageChange: (file: File | null, preview: string | null) => void;
}

const SelectionFormModal: React.FC<SelectionFormModalProps> = ({
  isOpen,
  formData,
  previewImg,
  isEdit,
  onClose,
  onSubmit,
  onChange,
  onImageChange,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white text-black p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-black">
          {isEdit ? "Edit Candidate" : "Add Candidate"}
        </h2>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            placeholder="Name"
            className="w-full mb-2 p-2 border rounded text-black"
            value={formData.name}
            onChange={(e) => onChange({ ...formData, name: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Major"
            className="w-full mb-2 p-2 border rounded text-black"
            value={formData.major}
            onChange={(e) => onChange({ ...formData, major: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Hobby"
            className="w-full mb-2 p-2 border rounded text-black"
            value={formData.hobby}
            onChange={(e) => onChange({ ...formData, hobby: e.target.value })}
            required
          />
          <select
            className="w-full mb-2 p-2 border rounded text-black"
            value={formData.gender}
            onChange={(e) => onChange({ ...formData, gender: e.target.value })}
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>

          {isEdit && (
            <p className="text-sm text-gray-500 mb-2">
              📸 You can upload a new image or keep the existing one.
            </p>
          )}

          <input
            type="file"
            name="profileImg"
            accept="image/*"
            className="w-full mb-2 p-2 border rounded text-black"
            onChange={(e) => {
              const file = e.target.files?.[0] || null;
              const preview = file ? URL.createObjectURL(file) : null;
              onImageChange(file, preview);
            }}
            required={!isEdit}
          />

          {previewImg && (
            <img
              src={previewImg}
              alt="Preview"
              className="w-24 h-24 object-cover rounded-full mb-2"
            />
          )}

          <div className="flex justify-end space-x-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SelectionFormModal;
