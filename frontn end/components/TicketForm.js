// ✅ All imports MUST be at the very top
import React, { useState, useContext } from 'react';
import API from '../Api';
import { AuthContext } from '../context/AuthContext';
import './TicketForm.css'; // Make sure this path is correct

const TicketForm = () => {
  const { user } = useContext(AuthContext);

  const [form, setForm] = useState({
    title: '',
    description: '',
    type: 'issue',
    priority: 'low',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/tickets', form);
      alert('🎫 Ticket created successfully!');
      setForm({ title: '', description: '', type: 'issue', priority: 'low' });
    } catch (err) {
      alert('❌ Error submitting ticket');
    }
  };

  return (
    <div className="ticket-form-container">
      <form onSubmit={handleSubmit} className="ticket-form">
        <h2>Create New Ticket</h2>

        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          rows="4"
          required
        />

        <div className="form-row">
          <select name="type" value={form.type} onChange={handleChange}>
            <option value="issue">Issue</option>
            <option value="bug">Bug</option>
            <option value="feature">Feature</option>
          </select>

          <select name="priority" value={form.priority} onChange={handleChange}>
            <option value="low">Low</option>
            <option value="normal">Normal</option>
            <option value="high">High</option>
          </select>
        </div>

        <button type="submit">🚀 Create Ticket</button>
      </form>
    </div>
  );
};

export default TicketForm;
