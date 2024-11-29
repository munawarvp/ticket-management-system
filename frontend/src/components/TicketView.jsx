import React, { useEffect, useState } from "react";
import { getAdminTickets, getTickets } from "../utils/api_service";
import Dropdown from "./Dropdown";
import Button from "./Button";
import { TicketPriority, TicketStatus } from "../utils/constants";
import TicketModal from "./TicketModal";
import { getLocal } from "../utils/helper";

const TicketView = ({ userType }) => {
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [userTickets, setUserTickets] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");

  useEffect(() => {
    fetchUserTickets();
  }, [statusFilter, priorityFilter]);

  const fetchUserTickets = async () => {
    if (userType === "admin") {
      const response = await getAdminTickets(statusFilter, priorityFilter);
      if (response.success) {
        setUserTickets(response.data);
      }
    } else {
      const response = await getTickets(statusFilter, priorityFilter);
      if (response.success) {
        setUserTickets(response.data);
      }
    }
  };

  function getStatusProperties(status) {
    return (
      TicketStatus.find((item) => item.value === status) || {
        label: "Unknown",
        color: "bg-gray-50 text-gray-700 ring-gray-600/20",
      }
    );
  }

  function getPriorityProperties(priority) {
    return (
      TicketPriority.find((item) => item.value === priority) || {
        label: "Unknown",
        color: "bg-gray-50 text-gray-700 ring-gray-600/20",
      }
    );
  }

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div className="flex gap-5 align-center justify-end mb-2">
        <div className="flex gap-1">
          <Dropdown
            name="Status"
            options={TicketStatus}
            onchange={setStatusFilter}
          />
          <Dropdown
            name="Priority"
            options={TicketPriority}
            onchange={setPriorityFilter}
          />
        </div>
        <Button
          label="New Ticket"
          icon={<i className="fa-solid fa-circle-plus"></i>}
          onClick={openModal}
        >
          New Ticket
        </Button>
      </div>
      <div className="flex flex-col lg:flex-row h-screen">
        {/* Left Section - Ticket List */}
        <div
          className={`flex flex-col w-full h-full lg:w-1/3 bg-gray-100 lg:pr-4 ${
            selectedTicket ? "hidden lg:flex" : "flex"
          }`}
        >
          <div className="flex flex-col h-full overflow-y-auto">
            <ul className="space-y-2">
              {userTickets.map((ticket, index) => (
                <li
                  key={index}
                  className=" bg-white rounded-md shadow p-4 cursor-pointer hover:bg-gray-50 text-left"
                  onClick={() => setSelectedTicket(ticket)}
                >
                  <h3 className="font-bold text-gray-800 mb-2">
                    {ticket.title}
                  </h3>
                  <div className="flex gap-2">
                    <div className="flex flex-col gap-1">
                      <p className="text-gray-600 text-sm">status:</p>
                      <span
                        className={`inline-flex items-center rounded-md px-5 py-1.5 text-xs font-medium ring-1 ring-inset ${
                          getStatusProperties(ticket.status).color
                        }`}
                      >
                        {getStatusProperties(ticket.status).label}
                      </span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <p className="text-gray-600 text-sm">priority:</p>
                      <span
                        className={`inline-flex items-center rounded-md px-5 py-1.5 text-xs font-medium ring-1 ring-inset ${
                          getPriorityProperties(ticket.priority).color
                        }`}
                      >
                        {getPriorityProperties(ticket.priority).label}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Section - Ticket Details */}
        <div
          className={`flex flex-col w-full h-full lg:w-2/3 bg-white p-4 ${
            selectedTicket ? "block" : "hidden lg:block"
          }`}
        >
          {selectedTicket ? (
            <div className="text-start">
              <div className="flex justify-between mb-2 lg:justify-end">
                <button
                  className="lg:hidden text-gray-500 mb-2"
                  onClick={() => setSelectedTicket(null)}
                >
                  &larr; Back
                </button>
                <div className="flex gap-2">
                  <button
                    className="flex items-center justify-center gap-2 px-4 py-1 bg-yellow-400 text-white font-semibold rounded-md hover:bg-yellow-500"
                    type="submit"
                  >
                    <span>Edit</span>
                    <i class="fa-sharp fa-solid fa-pen"></i>
                  </button>
                  <button
                    className="flex items-center justify-center gap-2 px-4 py-1 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700"
                    type="submit"
                  >
                    <i class="fa-sharp fa-solid fa-trash"></i>
                  </button>
                </div>
              </div>
              <h2 className="text-2xl pb-1 font-semibold">
                {selectedTicket.title}
              </h2>
              <p className="text-gray-700 text-sm mb-2">
                Created At:{" "}
                {new Date(selectedTicket.created_at).toLocaleString()}
              </p>
              <hr />
              <div className="flex gap-2 my-2">
                <p>status :</p>
                <span
                  className={`inline-flex items-center rounded-md px-5 py-1.5 text-xs font-medium ring-1 ring-inset ${
                    getStatusProperties(selectedTicket.status).color
                  }`}
                >
                  {getStatusProperties(selectedTicket.status).label}
                </span>
              </div>
              <div className="flex gap-2">
                <p>priority:</p>
                <span
                  className={`inline-flex items-center rounded-md px-5 py-1.5 text-xs font-medium ring-1 ring-inset ${
                    getPriorityProperties(selectedTicket.priority).color
                  }`}
                >
                  {getPriorityProperties(selectedTicket.priority).label}
                </span>
              </div>
              <p className="mt-4 text-gray-700">{selectedTicket.description}</p>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              <p>Select a ticket to view details</p>
            </div>
          )}
        </div>
      </div>

      {isModalOpen && (
        <TicketModal
          isOpen={isModalOpen}
          onClose={closeModal}
          userTickets={userTickets}
        />
      )}
    </>
  );
};

export default TicketView;
