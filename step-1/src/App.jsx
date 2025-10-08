import React, { useState } from "react";
import { Pencil } from "lucide-react"; // make sure: npm i lucide-react

const modules = [
  "User Management",
  "Client Master",
  "Order Management",
  "Sales Module",
  "Purchase Module",
  "Production Module",
  "Dispatch Module",
  "Payment Module",
  "Reports/Dashboard",
];

const initialWorkflows = {
  "User Management": {
    "Create User": "Completed",
    "Assign Role": "Pending",
    "Edit Access Rights": "In Progress",
  },
  "Client Master": {
    "Add Client": "Completed",
    "Verify Details": "In Progress",
    "Approve Account": "Pending",
  },
  "Order Management": {
    "Create Order": "Completed",
    "Send to Sales": "Pending",
    "Order Status Update": "In Progress",
  },
  "Sales Module": {
    "PI Generated": "Completed",
    "Client Approval": "In Progress",
    "Order Confirmed": "Pending",
  },
  "Purchase Module": {
    "Raw Material Request": "In Progress",
    "Supplier Approval": "Pending",
    "Material Received": "Not Started",
  },
  "Production Module": {
    "Measurement Taken": "Completed",
    "Production Started": "In Progress",
    "Product Completed": "Pending",
  },
  "Dispatch Module": {
    "Packing": "Completed",
    "Labeling": "Pending",
    "Out for Delivery": "In Progress",
  },
  "Payment Module": {
    "Invoice Generated": "Completed",
    "Payment Received": "Pending",
    "Verification Done": "Not Started",
  },
  "Reports/Dashboard": {
    "Sales Report": "Completed",
    "Production Summary": "Pending",
    "Dispatch Overview": "In Progress",
  },
};

function App() {
  const [selectedModule, setSelectedModule] = useState(null);
  const [workflows, setWorkflows] = useState(initialWorkflows);
  const [editTask, setEditTask] = useState(null);
  const [newStatus, setNewStatus] = useState("");

  const openEditForm = (taskName, currentStatus) => {
    setEditTask(taskName);
    setNewStatus(currentStatus);
  };

  const handleUpdateStatus = () => {
    if (!selectedModule || !editTask) return;
    setWorkflows((prev) => ({
      ...prev,
      [selectedModule]: {
        ...prev[selectedModule],
        [editTask]: newStatus,
      },
    }));
    setEditTask(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-50 flex">
      {/* Sidebar */}
      <div className="w-1/4 bg-white shadow-xl p-4 border-r border-gray-200">
        <h2 className="text-xl font-bold mb-4 text-gray-700">Modules</h2>
        <ul>
          {modules.map((mod) => (
            <li
              key={mod}
              onClick={() => setSelectedModule(mod)}
              className={`p-3 cursor-pointer rounded-lg mb-2 font-medium transition-all ${
                selectedModule === mod
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-gray-100 hover:bg-blue-100 hover:text-blue-700"
              }`}
            >
              {mod}
            </li>
          ))}
        </ul>
      </div>

      {/* Workflow Display */}
      <div className="flex-1 p-10 relative">
        {selectedModule ? (
          <div>
            <h2 className="text-3xl font-bold mb-6 text-blue-700 border-b pb-2">
              {selectedModule} Workflow
            </h2>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              {Object.entries(workflows[selectedModule]).map(([key, value]) => (
                <div
                  key={key}
                  className="flex justify-between items-center border-b py-3 text-gray-700 hover:bg-gray-50 transition"
                >
                  <span className="font-medium text-lg">{key}</span>
                  <div className="flex items-center gap-4">
                    <span
                      className={`font-semibold text-sm px-3 py-1 rounded-full ${
                        value === "Completed"
                          ? "bg-green-100 text-green-700"
                          : value === "In Progress"
                          ? "bg-yellow-100 text-yellow-700"
                          : value === "Pending"
                          ? "bg-gray-100 text-gray-600"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {value}
                    </span>

                    {/* ✏️ Stylish Icon Button */}
                    <button
                      onClick={() => openEditForm(key, value)}
                      className="relative group p-2 rounded-full bg-blue-100 hover:bg-blue-600 transition"
                    >
                      <Pencil
                        size={16}
                        className="text-blue-700 group-hover:text-white transition"
                      />
                      <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs bg-gray-700 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
                        Edit Status
                      </span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-gray-500 text-lg mt-20 text-center">
            Select a module to view its workflow.
          </div>
        )}

        {/* Modal Form */}
        {editTask && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm">
            <div className="bg-white p-8 rounded-2xl shadow-2xl w-96 animate-fadeIn">
              <h3 className="text-xl font-bold mb-4 text-gray-700">
                Update Status:{" "}
                <span className="text-blue-700">{editTask}</span>
              </h3>

              <label className="block mb-2 text-gray-600">
                Select New Status:
              </label>
              <select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
                className="w-full border rounded-lg p-2 mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>Not Started</option>
                <option>Pending</option>
                <option>In Progress</option>
                <option>Completed</option>
              </select>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setEditTask(null)}
                  className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdateStatus}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-md transition"
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
