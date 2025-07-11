import React, { useEffect, useState } from 'react';
import API from '../Api';

const TicketList = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchTickets = async () => {
      const res = await API.get('/tickets');
      setTickets(res.data);
    };
    fetchTickets();
  }, []);

  return (
    <div>
      <h2>All Tickets</h2>
      <ul>
        {tickets.map((ticket) => (
          <li key={ticket._id}>
            <strong>{ticket.title}</strong> [{ticket.type}] - {ticket.priority} ({ticket.status})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TicketList;
