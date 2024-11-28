import React, { useEffect, useState } from "react";
import { getTickets } from "../utils/api_service";

const TicketView = () => {
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [userTickets, setUserTickets] = useState([]);

  useEffect(() => {
    fetchUserTickets();
  }, []);

  const fetchUserTickets = async () => {
    const response = await getTickets();
    
    if (response.success) {
      setUserTickets(response.data);
    }
  }

  return (
    <div className="flex flex-col lg:flex-row h-full">
      {/* Left Section - Ticket List */}
      <div
        className={`flex flex-col w-full lg:w-1/3 bg-gray-100 p-4 overflow-y-auto ${
          selectedTicket ? "hidden lg:flex" : "flex"
        }`}
      >
        <h2 className="text-xl font-semibold mb-4">Tickets</h2>
        <ul className="space-y-2">
          {userTickets.map((ticket) => (
            <li
              key={ticket.id}
              className="bg-white rounded-md shadow p-4 cursor-pointer hover:bg-gray-50"
              onClick={() => setSelectedTicket(ticket)}
            >
              <h3 className="font-bold text-gray-800">{ticket.title}</h3>
              <p className="text-gray-600 text-sm truncate">
                {ticket.description}
              </p>
            </li>
          ))}
        </ul>
      </div>

      {/* Right Section - Ticket Details */}
      <div
        className={`flex flex-col w-full lg:w-2/3 bg-white p-4 ${
          selectedTicket ? "block" : "hidden lg:block"
        }`}
      >
        {selectedTicket ? (
          <>
            <button
              className="lg:hidden text-gray-500 mb-2"
              onClick={() => setSelectedTicket(null)}
            >
              &larr; Back
            </button>
            <h2 className="text-2xl font-semibold">{selectedTicket.title}</h2>
            <p className="mt-4 text-gray-700">{selectedTicket.description}</p>
          </>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            <p>Select a ticket to view details</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TicketView;
