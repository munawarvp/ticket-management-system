const TicketStatus = [
    {
      value: "open",
      label: "Open",
      color: "bg-blue-50 text-blue-700 ring-blue-600/20",
    },
    {
      value: "in-progress",
      label: "In Progress",
      color: "bg-yellow-50 text-yellow-700 ring-yellow-600/20",
    },
    {
      value: "resolved",
      label: "Resolved",
      color: "bg-green-50 text-green-700 ring-green-600/20",
    },
  ];

  const TicketPriority = [
    {
      value: "low",
      label: "Low",
      color: "bg-green-50 text-green-700 ring-green-600/20",
    },
    {
      value: "medium",
      label: "Medium",
      color: "bg-yellow-50 text-yellow-700 ring-yellow-600/20",
    },
    {
      value: "high",
      label: "High",
      color: "bg-red-50 text-red-700 ring-red-600/20",
    },
  ];

export {TicketStatus, TicketPriority};