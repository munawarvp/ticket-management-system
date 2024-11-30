import React, { useEffect, useState } from "react";
import { TicketPriority } from "../utils/constants";
import Button from "./Button";
import { createTicket, updateTicket } from "../utils/api_service";

const TicketModal = ({ isOpen, onClose, userTickets, selectedTicket, fetchUserTickets, setSelectedTicket }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "",
  });

  useEffect(() => {
    if (isOpen) {
      setFormData({
        title: selectedTicket?.title || "",
        description: selectedTicket?.description || "",
        priority: selectedTicket?.priority || TicketPriority[0]?.value,
      });
    }
  }, [isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    if (!formData.title || !formData.description || !formData.priority) {
      alert("Please fill in all fields");
      return;
    }
    e.preventDefault();

    // Create FormData object
    const form = new FormData();
    form.append("title", formData.title);
    form.append("description", formData.description);
    form.append("priority", formData.priority);

    if (!selectedTicket) {
      const response = await createTicket(Object.fromEntries(form));
      if (response.success) {
        userTickets.push(response.data);
        onClose();
      } else {
        alert(response.message);
      }
    } else {
      const response = await updateTicket(selectedTicket.id, Object.fromEntries(form));
      if (response.success) {
        fetchUserTickets();
        setSelectedTicket(response.data);
        onClose();
      } else {
        alert(response.message);
      }
    }
  };

  return (
    <div
  className={`fixed inset-0 flex items-center justify-center z-50 bg-gray-500 bg-opacity-50 transition-opacity ${
    isOpen ? "opacity-100" : "opacity-0"
  }`}
>
  {/* Modal Body */}
  <div
    className={`bg-white p-6 rounded-lg w-11/12 sm:w-1/3 lg:w-1/4 max-w-full transform transition-all ${
      isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
    }`}
    style={{ transitionDuration: "300ms" }}
  >
    <h2 className="text-xl text-gray-600 font-semibold mb-4">
      Add New Ticket
    </h2>
    <form onSubmit={handleSubmit}>
      <div className="text-gray-600 text-start mb-4">
        <label className="block mb-1">Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Enter ticket title"
          required
        />
      </div>
      <div className="text-gray-600 text-start mb-4">
        <label className="block mb-1">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Enter ticket description"
          required
        ></textarea>
      </div>
      <div className="text-gray-600 text-start mb-4">
        <label className="block mb-1">Priority</label>
        <select
          name="priority"
          value={formData.priority}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded"
        >
          {TicketPriority.map((priority) => (
            <option key={priority.value} value={priority.value}>
              {priority.label}
            </option>
          ))}
        </select>
      </div>
      <div className="flex justify-end gap-2">
        <Button
          label="Cancel"
          onClick={onClose}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        />
        <Button
          label="Submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        />
      </div>
    </form>
  </div>
</div>

  );
};

export default TicketModal;
