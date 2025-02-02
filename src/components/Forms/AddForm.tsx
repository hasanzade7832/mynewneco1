// src/components/AddColumnForm.tsx

import React, { useState } from "react";
import DynamicInput from "../utilities/DynamicInput";
import CustomTextarea from "../utilities/DynamicTextArea";
import DynamicSelector from "../utilities/DynamicSelector";

// Import the separate components
import Component1 from "./ControllerForms/TextController";
import Component2 from "./ControllerForms/RichTextController";
import Component3 from "./ControllerForms/ChoiceController";
import Component4 from "./ControllerForms/NumberController";
import Component5 from "./ControllerForms/DateTimeEnglishController";
import Component6 from "./ControllerForms/DateTimePersianController";
import Component7 from "./ControllerForms/LookupController";
import Component8 from "./ControllerForms/PostPickerList";
import Component9 from "./ControllerForms/LookupRealValueController";
import Component10 from "./ControllerForms/LookUpAdvanceTable";
import Component11 from "./ControllerForms/AdvanceLookupAdvanceTable";
import Component12 from "./ControllerForms/LookupImage";
import Component13 from "./ControllerForms/YesNoController";
import Component14 from "./ControllerForms/AttachFileController";
import Component15 from "./ControllerForms/PictureBoxController";
import Component16 from "./ControllerForms/TableController";
import Component17 from "./ControllerForms/PfiLookUpController";
import Component18 from "./ControllerForms/SeqnialNumber";
import Component19 from "./ControllerForms/AdvanceTableController";
import Component20 from "./ControllerForms/WordPanelController";
import Component21 from "./ControllerForms/ExceclPanelController";
import Component22 from "./ControllerForms/CalculatedField";
import Component23 from "./ControllerForms/ExcelCalculator";
import Component24 from "./ControllerForms/TabController";
import Component25 from "./ControllerForms/MapController";

interface AddColumnFormProps {
  onClose: () => void; // Function to close the modal
}

const AddColumnForm: React.FC<AddColumnFormProps> = ({ onClose }) => {
  // Form state
  const [formData, setFormData] = useState({
    formName: "",
    order: "",
    description: "",
    command: "",
    isRequiredInWf: false,
    printCode: "",
    isEditableInWf: false,
    allowedWfBoxName: "",
    showInAlert: false,
    typeOfInformation: "component1",
    required: false,
    mainColumns: false,
    showInListView: false,
    rightToLeft: false,
    readOnly: false,
    metaColumnName: "",
    showInTab: "",
  });

  // Error state
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Loading state
  const [isLoading, setIsLoading] = useState(false);

  // State to track selected component
  const [selectedComponent, setSelectedComponent] = useState<string>(
    "component1" // Initial state set to "component1"
  );

  // State and data for Component8 (PostPickerList)
  const [defaultValues, setDefaultValues] = useState<string[][]>([]);
  const columnDefs = [
    { headerName: "Position", field: "position" },
    // Add other column definitions as needed
  ];
  const rowData = [
    { position: "Manager" },
    { position: "Developer" },
    { position: "Designer" },
    // Add more row data as needed
  ];

  // Options for dynamic components
  const commandOptions = [
    { value: "command1", label: "Command 1" },
    { value: "command2", label: "Command 2" },
  ];

  const typeOfInformationOptions = [
    { value: "component1", label: "Text" },
    { value: "component2", label: "RichText" },
    { value: "component3", label: "Choice" },
    { value: "component4", label: "Number" },
    { value: "component5", label: "Date Time" },
    { value: "component6", label: "Persian Date" },
    { value: "component7", label: "Lookup" },
    { value: "component8", label: "Post PickerList" },
    { value: "component9", label: "LookUp RealValue" },
    { value: "component10", label: "LookUp AdvanceTable" },
    { value: "component11", label: "Advance LookupAdvanceTable" },
    { value: "component12", label: "Lookup Image" },
    { value: "component13", label: "Yes No" },
    { value: "component14", label: "Attach File" },
    { value: "component15", label: "Picture Box" },
    { value: "component16", label: "Table" },
    { value: "component17", label: "Pfi LookUp" },
    { value: "component18", label: "Seqnial Number" },
    { value: "component19", label: "Advance Table" },
    { value: "component20", label: "Word Panel" },
    { value: "component21", label: "Excecl Panel" },
    { value: "component22", label: "Calculated Field" },
    { value: "component23", label: "Excel Calculator" },
    { value: "component24", label: "Tab" },
    { value: "component25", label: "Map" },
  ];

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type } = target;

    if (type === "checkbox") {
      const { checked } = target;
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    // If the changed field is "typeOfInformation", update selectedComponent
    if (name === "typeOfInformation") {
      setSelectedComponent(value);
    }
  };

  // Handle select changes
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "typeOfInformation") {
      setSelectedComponent(value);
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Add your validation and submission logic here
    // For example, simulate a network request
    setTimeout(() => {
      setIsLoading(false);
      // After successful submission, reset the form and close the modal
      setFormData({
        formName: "",
        order: "",
        description: "",
        command: "",
        isRequiredInWf: false,
        printCode: "",
        isEditableInWf: false,
        allowedWfBoxName: "",
        showInAlert: false,
        typeOfInformation: "component1",
        required: false,
        mainColumns: false,
        showInListView: false,
        rightToLeft: false,
        readOnly: false,
        metaColumnName: "",
        showInTab: "",
      });
      setErrors({});
      setSelectedComponent("component1"); // Reset to "component1"
      onClose(); // Close the modal after successful submission
    }, 2000);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white p-4 -mt-16">
      {/* Loading Layer */}
      {isLoading && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
          <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16"></div>
          {/* You can design your own spinner or use existing libraries */}
        </div>
      )}

      <div className="w-full bg-white rounded-lg overflow-auto flex flex-col">
        <h2 className="text-3xl font-semibold mb-8 text-center">
          Add New Column
        </h2>

        {/* Form */}
        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-12 flex-grow"
          onSubmit={handleSubmit}
        >
          {/* Form Name and Order */}
          <DynamicInput
            name="formName"
            type="text"
            value={formData.formName}
            placeholder=""
            onChange={handleChange}
            required
            error={!!errors.formName}
            errorMessage={errors.formName}
            className="md:col-span-1"
          />
          <DynamicInput
            name="order"
            type="number"
            value={formData.order}
            placeholder=""
            onChange={handleChange}
            required
            error={!!errors.order}
            errorMessage={errors.order}
            className="md:col-span-1"
          />

          {/* Description and Command */}
          <CustomTextarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder=""
            required
            label="Description"
            error={!!errors.description}
            errorMessage={errors.description}
            className="md:col-span-1 -mt-10"
          />
          <DynamicSelector
            name="command"
            options={commandOptions}
            selectedValue={formData.command}
            onChange={handleSelectChange}
            label="Command"
            error={!!errors.command}
            errorMessage={errors.command}
            className="md:col-span-1 -mt-16"
          />

          {/* Required in Workflow and Print Code */}
          <div className="flex items-center md:col-span-1 -mt-8">
            <input
              type="checkbox"
              id="isRequiredInWf"
              name="isRequiredInWf"
              checked={formData.isRequiredInWf}
              onChange={handleChange}
              className="h-5 w-5 text-indigo-600 border-gray-300 rounded"
            />
            <label
              htmlFor="isRequiredInWf"
              className="ml-3 text-gray-700 font-medium"
            >
              Required in Workflow
            </label>
          </div>
          <DynamicInput
            name="printCode"
            type="text"
            value={formData.printCode}
            placeholder=""
            onChange={handleChange}
            required
            error={!!errors.printCode}
            errorMessage={errors.printCode}
            className="md:col-span-1 -mt-8"
          />

          {/* Editable in Workflow, Allowed Workflow Box, and Show in Alert */}
          <div className="flex flex-col md:col-span-2 space-y-4 -mt-8">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isEditableInWf"
                  name="isEditableInWf"
                  checked={formData.isEditableInWf}
                  onChange={handleChange}
                  className="h-5 w-5 text-indigo-600 border-gray-300 rounded"
                />
                <label
                  htmlFor="isEditableInWf"
                  className="ml-3 text-gray-700 font-medium"
                >
                  Editable in Workflow
                </label>
              </div>
              <DynamicInput
                name="allowedWfBoxName"
                type="text"
                value={formData.allowedWfBoxName}
                placeholder=""
                onChange={handleChange}
                required
                error={!!errors.allowedWfBoxName}
                errorMessage={errors.allowedWfBoxName}
                className="flex-1"
              />
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="showInAlert"
                  name="showInAlert"
                  checked={formData.showInAlert}
                  onChange={handleChange}
                  className="h-5 w-5 text-indigo-600 border-gray-300 rounded"
                />
                <label
                  htmlFor="showInAlert"
                  className="ml-3 text-gray-700 font-medium"
                >
                  Show in Alert
                </label>
              </div>
            </div>
          </div>

          {/* Type of Information - Full Width */}
          <DynamicSelector
            name="typeOfInformation"
            options={typeOfInformationOptions}
            selectedValue={formData.typeOfInformation}
            onChange={handleSelectChange}
            label="Type of Information"
            error={!!errors.typeOfInformation}
            errorMessage={errors.typeOfInformation}
            className="md:col-span-2 -mt-2"
          />

          {/* Required, Main Columns, Show in List, Right to Left */}
          <div className="flex flex-wrap md:col-span-2 space-x-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="required"
                name="required"
                checked={formData.required}
                onChange={handleChange}
                className="h-5 w-5 text-indigo-600 border-gray-300 rounded"
              />
              <label
                htmlFor="required"
                className="ml-3 text-gray-700 font-medium"
              >
                Required
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="mainColumns"
                name="mainColumns"
                checked={formData.mainColumns}
                onChange={handleChange}
                className="h-5 w-5 text-indigo-600 border-gray-300 rounded"
              />
              <label
                htmlFor="mainColumns"
                className="ml-3 text-gray-700 font-medium"
              >
                Main Columns
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="showInListView"
                name="showInListView"
                checked={formData.showInListView}
                onChange={handleChange}
                className="h-5 w-5 text-indigo-600 border-gray-300 rounded"
              />
              <label
                htmlFor="showInListView"
                className="ml-3 text-gray-700 font-medium"
              >
                Show in List
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="rightToLeft"
                name="rightToLeft"
                checked={formData.rightToLeft}
                onChange={handleChange}
                className="h-5 w-5 text-indigo-600 border-gray-300 rounded"
              />
              <label
                htmlFor="rightToLeft"
                className="ml-3 text-gray-700 font-medium"
              >
                Right to Left
              </label>
            </div>
          </div>

          {/* Read Only, Meta Column, Show in Tab */}
          <div className="flex flex-wrap md:col-span-2 space-x-4 -mt-2">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="readOnly"
                name="readOnly"
                checked={formData.readOnly}
                onChange={handleChange}
                className="h-5 w-5 text-indigo-600 border-gray-300 rounded"
              />
              <label
                htmlFor="readOnly"
                className="ml-3 text-gray-700 font-medium"
              >
                Read Only
              </label>
            </div>
            <DynamicInput
              name="metaColumnName"
              type="text"
              value={formData.metaColumnName}
              placeholder=""
              onChange={handleChange}
              required
              error={!!errors.metaColumnName}
              errorMessage={errors.metaColumnName}
              className="flex-1"
            />
            <DynamicInput
              name="showInTab"
              type="text"
              value={formData.showInTab}
              placeholder=""
              onChange={handleChange}
              required
              error={!!errors.showInTab}
              errorMessage={errors.showInTab}
              className="flex-1"
            />
          </div>

          {/* Conditionally Render Selected Component */}
          <div className="mb-8 w-full md:col-span-2 -mt-8">
            {selectedComponent === "component1" && <Component1 />}
            {selectedComponent === "component2" && <Component2 />}
            {selectedComponent === "component3" && <Component3 />}
            {selectedComponent === "component4" && <Component4 />}
            {selectedComponent === "component5" && <Component5 />}
            {selectedComponent === "component6" && <Component6 />}
            {selectedComponent === "component7" && <Component7 />}
            {selectedComponent === "component8" && (
              <Component8
                defaultValues={defaultValues}
                setDefaultValues={setDefaultValues}
                columnDefs={columnDefs}
                rowData={rowData}
              />
            )}
            {selectedComponent === "component9" && <Component9 />}
            {selectedComponent === "component10" && <Component10 />}
            {selectedComponent === "component11" && <Component11 />}
            {selectedComponent === "component12" && <Component12 />}
            {selectedComponent === "component13" && <Component13 />}
            {selectedComponent === "component14" && <Component14 />}
            {selectedComponent === "component15" && <Component15 />}
            {selectedComponent === "component16" && <Component16 />}
            {selectedComponent === "component17" && <Component17 />}
            {selectedComponent === "component18" && <Component18 />}
            {selectedComponent === "component19" && <Component19 />}
            {selectedComponent === "component20" && <Component20 />}
            {selectedComponent === "component21" && <Component21 />}
            {selectedComponent === "component22" && <Component22 />}
            {selectedComponent === "component23" && <Component23 />}
            {selectedComponent === "component24" && <Component24 />}
            {selectedComponent === "component25" && <Component25 />}
          </div>

          {/* Buttons */}
          <div className="flex justify-center md:col-span-2 space-x-4 -mt-8">
            <button
              type="button"
              className="px-6 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition duration-200"
              onClick={() => {
                // Handle cancel operation: reset the form and close the modal
                setFormData({
                  formName: "",
                  order: "",
                  description: "",
                  command: "",
                  isRequiredInWf: false,
                  printCode: "",
                  isEditableInWf: false,
                  allowedWfBoxName: "",
                  showInAlert: false,
                  typeOfInformation: "component1",
                  required: false,
                  mainColumns: false,
                  showInListView: false,
                  rightToLeft: false,
                  readOnly: false,
                  metaColumnName: "",
                  showInTab: "",
                });
                setErrors({});
                setSelectedComponent("component1"); // Reset to "component1"
                // Reset Component8 state if needed
                setDefaultValues([]);
                onClose(); // Close the modal
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-6 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition duration-200 ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isLoading}
            >
              {isLoading ? "Adding..." : "Add Column"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddColumnForm;
