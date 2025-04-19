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
  isEditing
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className={`p-6 rounded-lg shadow-lg w-full max-w-md ${theme === 'dark' ? 'bg-indigo-800' : 'bg-white'}`}>
           <h3 className={`text-lg font-medium ${theme === 'dark' ? 'text-white' : 'text-indigo-900'}`}>
          {isEditing ? 'Edit Category' : 'Add New Category'}
          </h3>
          <input
            type="text"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            placeholder="Category name"
            className={`w-full p-2 mb-2 border rounded ${theme === 'dark' ? 'bg-indigo-700 border-indigo-500 text-white' : 'bg-white border-gray-300'}`}
          />
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      <div className="flex justify-end space-x-2">
            <button
              onClick={onClose}
              className={`px-4 py-2 rounded ${theme === 'dark' ? 'bg-gray-500 hover:bg-gray-600 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
            >
              Cancel
            </button>
            <button
              onClick={handleAddCategory}
              disabled={isLoading}
              className={`px-4 py-2 rounded text-white ${isLoading 
                ? 'bg-gray-400' 
                : theme === 'dark' 
                  ? 'bg-sky-600 hover:bg-sky-700' 
                  : 'bg-indigo-600 hover:bg-indigo-700'}`}
            >
              {isLoading ? 'Processing...' : isEditing ? 'Update' : 'Add'}
            </button>
          </div>
      </div>
    </div>
  );
};

export default CategoryModal;
