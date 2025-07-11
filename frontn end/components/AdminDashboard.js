import React, { useEffect, useState, useContext } from 'react';
import API from '../Api';
import { AuthContext } from '../context/AuthContext';

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const load = async () => {
      const res = await API.get('/tickets');
      setTickets(res.data);
    };
    load();
  }, []);

  const updateTicket = async (id, field, value) => {
    try {
      await API.patch(`/tickets/${id}`, { [field]: value });
      setTickets((prev) =>
        prev.map((t) => (t._id === id ? { ...t, [field]: value } : t))
      );
    } catch (err) {
      alert('Update failed');
    }
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      {tickets.map((ticket) => (
        <div key={ticket._id} style={{ border: '1px solid gray', padding: '10px', marginBottom: '10px' }}>
          <h3>{ticket.title}</h3>
          <p>Status:
            <select value={ticket.status} onChange={(e) => updateTicket(ticket._id, 'status', e.target.value)}>
              <option>open</option>
              <option>in progress</option>
              <option>closed</option>
            </select>
          </p>
          <p>Priority:
            <select value={ticket.priority} onChange={(e) => updateTicket(ticket._id, 'priority', e.target.value)}>
              <option>low</option>
              <option>normal</option>
              <option>high</option>
            </select>
          </p>
        </div>
      ))}
    </div>
  );
};

export default AdminDashboard;
