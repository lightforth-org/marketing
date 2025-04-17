"use client";
import React, { useState } from "react";

const PaymentDetailsForm = ({
  handleSubmit,
}: {
  handleSubmit: (data) => void;
}) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <form className="space-y-4">
      {/* First Name */}
      <div>
        <label
          htmlFor="firstname"
          className="block text-sm font-medium text-gray-700"
        >
          First Name
        </label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>

      {/* Last Name */}
      <div>
        <label
          htmlFor="lastname"
          className="block text-sm font-medium text-gray-700"
        >
          Last Name
        </label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>

      {/* Email */}
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>

      {/* Submit Button */}
      <div>
        <button
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md transition duration-300"
          onClick={() => {
            if (!formData.firstName || !formData.lastName || !formData.email) {
              alert("Please fill in all fields.");
              return;
            }
            handleSubmit(formData);
          }}
        >
          Go to Step 2
        </button>
      </div>
    </form>
  );
};

export default PaymentDetailsForm;
