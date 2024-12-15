// DataTable.tsx

import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import { FaSearch } from "react-icons/fa";
import { FiPlus, FiTrash2, FiEdit, FiCopy } from "react-icons/fi";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import "./DataTable.css";

interface DataTableProps {
  columnDefs: any[];
  rowData: any[];
  onRowDoubleClick: (data: any) => void;
  setSelectedRowData: (data: any) => void;
  showDuplicateIcon?: boolean;
  showEditIcon?: boolean;
  showAddIcon?: boolean;
  showDeleteIcon?: boolean;
  onAdd: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onDuplicate: () => void;
  domLayout?: "autoHeight" | "normal";
  isRowSelected: boolean;
  showSearch?: boolean; // اضافه کردن پراپ جدید
}

const DataTable: React.FC<DataTableProps> = ({
  columnDefs,
  rowData,
  onRowDoubleClick,
  setSelectedRowData,
  showDuplicateIcon = false,
  showEditIcon = true,
  showAddIcon = true,
  showDeleteIcon = true,
  onAdd,
  onEdit,
  onDelete,
  onDuplicate,
  domLayout = "normal",
  isRowSelected,
  showSearch = true, // تنظیم مقدار پیش‌فرض
}) => {
  const [searchText, setSearchText] = useState("");
  const [gridApi, setGridApi] = useState<any>(null);

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    if (gridApi) {
      gridApi.setQuickFilter(e.target.value);
    }
  };

  const onGridReady = (params: any) => {
    setGridApi(params.api);
    params.api.sizeColumnsToFit();
  };

  useEffect(() => {
    if (gridApi) {
      gridApi.sizeColumnsToFit();
    }
  }, [gridApi, columnDefs]);

  const handleRowClick = (event: any) => {
    setSelectedRowData(event.data);
  };

  const handleRowDoubleClick = (event: any) => {
    onRowDoubleClick(event.data);
  };

  const gridClasses =
    domLayout === "autoHeight"
      ? "ag-theme-quartz auto-height"
      : "ag-theme-quartz flex-grow h-full";

  const getRowClass = (params: any) => {
    return params.node.selected ? "ag-row-selected" : "";
  };

  // Grid options to use for rowClass
  const gridOptions = {
    getRowClass: getRowClass, // This function will handle row class logic
  };

  return (
    <div className="w-full h-full flex flex-col bg-red-100">
      {/* Search Bar and Action Buttons */}
      <div className="flex items-center justify-between mb-4 bg-red-100">
        {showSearch && ( // شرطی کردن نمایش نوار جستجو
          <div className="relative max-w-sm">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Search...."
              value={searchText}
              onChange={onSearchChange}
              className="search-input w-full pl-10 pr-3 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
              style={{ fontFamily: "inherit" }}
            />
          </div>
        )}

        <div className="flex items-center space-x-4">
          {showDuplicateIcon && (
            <button
              className={`text-yellow-600 hover:text-yellow-800 transition ${
                !isRowSelected ? "opacity-50 cursor-not-allowed" : ""
              }`}
              title="Duplicate"
              onClick={onDuplicate}
              disabled={!isRowSelected}
            >
              <FiCopy size={25} />
            </button>
          )}

          {showEditIcon && (
            <button
              className={`text-blue-600 hover:text-blue-800 transition ${
                !isRowSelected ? "opacity-50 cursor-not-allowed" : ""
              }`}
              title="Edit"
              onClick={onEdit}
              disabled={!isRowSelected}
            >
              <FiEdit size={25} />
            </button>
          )}

          {showDeleteIcon && (
            <button
              className={`text-red-600 hover:text-red-800 transition ${
                !isRowSelected ? "opacity-50 cursor-not-allowed" : ""
              }`}
              title="Delete"
              onClick={onDelete}
              disabled={!isRowSelected}
            >
              <FiTrash2 size={25} />
            </button>
          )}

          {showAddIcon && (
            <button
              className="text-green-600 hover:text-green-800 transition"
              title="Add"
              onClick={onAdd}
            >
              <FiPlus size={25} />
            </button>
          )}
        </div>
      </div>

      {/* Data Table */}
      <div className={gridClasses}>
        <AgGridReact
          onGridReady={onGridReady}
          columnDefs={columnDefs}
          rowData={rowData}
          pagination={false}
          paginationPageSize={10}
          animateRows={true}
          onRowClicked={handleRowClick}
          onRowDoubleClicked={handleRowDoubleClick}
          domLayout={domLayout}
          suppressHorizontalScroll={false}
          rowSelection="multiple"
          gridOptions={gridOptions} // Pass gridOptions here
        />
      </div>
    </div>
  );
};

export default DataTable;
