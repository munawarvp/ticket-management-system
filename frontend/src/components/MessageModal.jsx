import React from "react";
import Button from "./Button";

const MessageModal = ({ isOpen, onClose, onSubmit, description }) => {
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
        <i class="fa-solid fa-circle-exclamation"></i>
        <h2 className="text-xl text-gray-600 font-semibold mb-4 text-center">
          Are you sure?
        </h2>
        <p className="text-gray-600 text-center mb-6">{description}</p>
        <div className="flex justify-center gap-2">
          <Button
            label="Cancel"
            onClick={onClose}
            className="bg-gray-200 ring-1 ring-gray-600/20 text-gray-600 px-4 py-2 rounded hover:bg-gray-300"
          />
          <Button
            label="Confirm"
            onClick={onSubmit}
            className="bg-blue-500 ring-1 ring-blue-700/20 text-white px-4 py-2 rounded hover:bg-blue-600"
          />
        </div>
      </div>
    </div>
  );
};

export default MessageModal;
