import React, { useEffect, useState } from "react";
import {
  assignTicket,
  deleteTicket,
  deleteTicketAdmin,
  getAdminTickets,
  getTickets,
  listUsers,
  updateTicketStatus,
} from "../utils/api_service";
import Dropdown from "./Dropdown";
import Button from "./Button";
import { TicketPriority, TicketStatus } from "../utils/constants";
import TicketModal from "./TicketModal";
import MessageModal from "./MessageModal";

const TicketView = ({ userType, setUsername }) => {
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [userTickets, setUserTickets] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [userList, setUserList] = useState([]);
  const [userFilter, setUserFilter] = useState("");

  useEffect(() => {
    fetchUserTickets();
  }, [statusFilter, priorityFilter, userFilter, userType]);

  const fetchUserTickets = async () => {
    if (userType === "admin") {
      const response = await getAdminTickets(
        statusFilter,
        priorityFilter,
        userFilter
      );
      const userResponse = await listUsers();

      if (response.success) {
        setUserTickets(response.data);
        if (response.data.length > 0) {
          setUsername(response.data[0].user.username);
        }
      }
      if (userResponse.success) {
        setUserList(userResponse.data);
      }
    } else {
      const response = await getTickets(statusFilter, priorityFilter);
      if (response.success) {
        setUserTickets(response.data);
        if (response.data.length > 0) {
          setUsername(response.data[0].user.username);
        }
      }
    }
  };

  const deleteUserTicket = async () => {
    if (userType === "admin") {
      const response = await deleteTicketAdmin(selectedTicket.id);
      if (response.success) {
        const updatedUserTickets = userTickets.filter(
          (item) => item.id !== selectedTicket.id
        );
        setUserTickets(updatedUserTickets);
        setSelectedTicket(null);
        setIsMessageModalOpen(false);
      } else {
        alert(response.message);
      }
      return;
    }
    let response = await deleteTicket(selectedTicket.id);
    if (response.success) {
      const updatedUserTickets = userTickets.filter(
        (item) => item.id !== selectedTicket.id
      );
      setUserTickets(updatedUserTickets);
      setSelectedTicket(null);
      setIsMessageModalOpen(false);
    } else {
      alert(response.message);
    }
    return;
  };

  const updateStatus = async (status) => {
    const response = await updateTicketStatus(selectedTicket.id, {
      status,
    });
    if (response.success) {
      fetchUserTickets();
      setSelectedTicket((prevTicket) => ({ ...prevTicket, status }));
    }
  };

  const assignTicketToUser = async (user_id) => {
    const response = await assignTicket(selectedTicket.id, user_id);
    if (response.success) {
      fetchUserTickets();
      setSelectedTicket((prevTicket) => ({ ...prevTicket, assigned_to: user_id }));
    }
  }

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

  const openModal = (edit) => {
    !edit && setSelectedTicket(null);
    setIsModalOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);

  const openMessageModal = () => setIsMessageModalOpen(true);
  const closeMessageModal = () => setIsMessageModalOpen(false);

  return (
    <>
      <div className="flex gap-5 align-center justify-start mb-2">
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
          {userType === "admin" && (
            <Dropdown
              name="Users"
              options={userList}
              onchange={setUserFilter}
            />
          )}
        </div>
        {userType === "user" && (
          <Button
            label="New Ticket"
            icon={<i className="fa-solid fa-circle-plus"></i>}
            onClick={() => openModal(false)}
            className="bg-blue-500 text-white hover:bg-blue-600"
          >
            New Ticket
          </Button>
        )}
      </div>
      <div className="flex flex-col lg:flex-row h-screen">
        {/* Left Section - Ticket List */}
        <div
          className={`flex flex-col w-full h-full lg:w-1/3 bg-gray-100 lg:pr-4 ${selectedTicket ? "hidden lg:flex" : "flex"
            }`}
        >
          <div className="flex flex-col h-full overflow-y-auto">
            {userTickets.length === 0 && (
              <div className="h-full flex items-center justify-center bg-white rounded-lg">
                <h1 className="text-xl font-semibold text-gray-700">
                  No Tickets
                </h1>
              </div>
            )}
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
                        className={`inline-flex items-center rounded-md px-5 py-1.5 text-xs font-medium ring-1 ring-inset ${getStatusProperties(ticket.status).color
                          }`}
                      >
                        {getStatusProperties(ticket.status).label}
                      </span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <p className="text-gray-600 text-sm">priority:</p>
                      <span
                        className={`inline-flex items-center rounded-md px-5 py-1.5 text-xs font-medium ring-1 ring-inset ${getPriorityProperties(ticket.priority).color
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
          className={`flex flex-col w-full h-full lg:w-2/3 bg-white p-4 ${selectedTicket ? "block" : "hidden lg:block"
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
                  {userType === "user" && <button
                    className="flex items-center justify-center gap-2 px-4 py-1 bg-gray-100 text-gray-500 font-semibold rounded-md hover:bg-gray-200"
                    type="submit"
                    onClick={() => openModal(true)}
                  >
                    <span>Edit</span>
                    <i className="fa-sharp fa-solid fa-pen"></i>
                  </button>}
                  <button
                    className="flex items-center justify-center gap-2 px-4 py-1 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700"
                    type="submit"
                    onClick={openMessageModal}
                  >
                    <i className="fa-sharp fa-solid fa-trash"></i>
                  </button>
                </div>
              </div>
              <h2 className="text-2xl pb-1 font-semibold">
                {selectedTicket.title}
              </h2>
              <p>
                <span className="text-gray-700">
                  {selectedTicket.user.username}
                </span>
              </p>
              <p className="text-gray-700 text-sm mb-2">
                Created At:{" "}
                {new Date(selectedTicket.created_at).toLocaleString()}
              </p>
              <div className="flex justify-center gap-1">
                {userType === "admin" && (
                  <div className="flex gap-2 h-25 mb-2">
                    <h2 className="text-gray-700 mb-2">Change Status :</h2>
                    <select
                      id="dropdown"
                      className="block text-sm border border-gray-300 rounded-lg shadow-sm focus:outline-none"
                      value={selectedTicket.status}
                      onChange={(e) => updateStatus(e.target.value)}
                    >
                      <option value="" disabled>
                        Select a status
                      </option>
                      {TicketStatus.map((status, index) => (
                        <option key={index} value={status.value}>
                          {status.label}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
                {userType === "admin" && (
                  <div className="flex gap-2 h-25 mb-2">
                    <h2 className="text-gray-700 mb-2">Assign To :</h2>
                    <select
                      id="dropdown"
                      className="block px-2 py-2 text-sm border border-gray-300 rounded-lg shadow-sm focus:outline-none"
                      value={selectedTicket.assigned_to}
                      onChange={(e) => assignTicketToUser(e.target.value)}
                    >
                      <option value="" disabled>
                        Select a status
                      </option>
                      {userList.map((user, index) => (
                        <option key={index} value={user.value}>
                          {user.label}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
              <hr />
              <div className="flex gap-2 my-2">
                <p>status :</p>
                <span
                  className={`inline-flex items-center rounded-md px-5 py-1.5 text-xs font-medium ring-1 ring-inset ${getStatusProperties(selectedTicket.status).color
                    }`}
                >
                  {getStatusProperties(selectedTicket.status).label}
                </span>
              </div>
              <div className="flex gap-2">
                <p>priority:</p>
                <span
                  className={`inline-flex items-center rounded-md px-5 py-1.5 text-xs font-medium ring-1 ring-inset ${getPriorityProperties(selectedTicket.priority).color
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
          selectedTicket={selectedTicket}
          fetchUserTickets={fetchUserTickets}
          setSelectedTicket={setSelectedTicket}
        />
      )}

      {isMessageModalOpen && (
        <MessageModal
          isOpen={isMessageModalOpen}
          onClose={closeMessageModal}
          onSubmit={deleteUserTicket}
          description={
            "The ticket will be cancelled and deleted permanently. Are you sure?"
          }
        />
      )}
    </>
  );
};

export default TicketView;