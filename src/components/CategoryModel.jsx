import React from 'react';
import { FiX } from 'react-icons/fi';

const CategoryModal = ({
  theme,
  isLoading,
  newCategoryName,
  setNewCategoryName,
  error,
  handleAddCategory,
  onClose,
}) => {
  const handleClose = () => {
    setNewCategoryName('');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className={`p-6 rounded-lg shadow-lg w-full max-w-md ${theme === 'dark' ? 'bg-indigo-800' : 'bg-white'}`}>
        <div className="flex justify-between items-center mb-4">
          <h3 className={`text-lg font-medium ${theme === 'dark' ? 'text-white' : 'text-indigo-900'}`}>
            Add New Category
          </h3>
          <button onClick={handleClose} className="p-1 rounded-full hover:bg-gray-200" disabled={isLoading}>
            <FiX className={`w-5 h-5 ${theme === 'dark' ? 'text-white' : 'text-indigo-900'}`} />
          </button>
        </div>

        <div className="mb-4">
          <label className={`block mb-2 ${theme === 'dark' ? 'text-white' : 'text-indigo-900'}`}>Category Name</label>
          <input
            type="text"
            value={newCategoryName}
            onChange={(e) => {
              setNewCategoryName(e.target.value);
            }}
            className={`w-full p-2 border rounded ${theme === 'dark' ? 'bg-indigo-700 text-white' : 'bg-white text-indigo-900'}`}
            placeholder="e.g., Plumbing"
            disabled={isLoading}
          />
          {error && <p className="mt-1 text-red-500 text-sm">{error}</p>}
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={handleClose}
            className={`px-4 py-2 rounded ${theme === 'dark' ? 'bg-gray-600 text-white' : 'bg-gray-200 text-indigo-900'}`}
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            onClick={handleAddCategory}
            className={`px-4 py-2 rounded text-white ${isLoading ? 'bg-indigo-400' : theme === 'dark' ? 'bg-sky-500 hover:bg-sky-600' : 'bg-indigo-600 hover:bg-indigo-700'}`}
            disabled={isLoading}
          >
            {isLoading ? 'Adding...' : 'Add Category'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryModal;
