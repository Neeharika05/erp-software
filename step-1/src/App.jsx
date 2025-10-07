import React, { useState } from "react";


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

// Dummy workflow data
const workflows = {
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

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="w-1/4 bg-white shadow-md p-4">
        <h2 className="text-xl font-bold mb-4">Modules</h2>
        <ul>
          {modules.map((mod) => (
            <li
              key={mod}
              onClick={() => setSelectedModule(mod)}
              className={`p-2 cursor-pointer rounded-lg mb-2 transition-all ${
                selectedModule === mod
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 hover:bg-blue-200"
              }`}
            >
              {mod}
            </li>
          ))}
        </ul>
      </div>

      {/* Workflow Display */}
      <div className="flex-1 p-8">
        {selectedModule ? (
          <div>
            <h2 className="text-2xl font-bold mb-4 text-blue-700">
              {selectedModule} Workflow
            </h2>
            <div className="bg-white p-6 rounded-xl shadow-md">
              {Object.entries(workflows[selectedModule]).map(([key, value]) => (
                <div
                  key={key}
                  className="flex justify-between border-b py-2 text-gray-700"
                >
                  <span className="font-medium">{key}</span>
                  <span
                    className={`font-semibold ${
                      value === "Completed"
                        ? "text-green-600"
                        : value === "In Progress"
                        ? "text-yellow-600"
                        : "text-gray-500"
                    }`}
                  >
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-gray-500 text-lg">
            Select a module to view its workflow.
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
