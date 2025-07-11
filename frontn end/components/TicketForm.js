import React, { useState, useContext } from 'react';
import API from '../Api';
import { AuthContext } from '../context/AuthContext';

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
      alert('Ticket created!');
      setForm({ title: '', description: '', type: 'issue', priority: 'low' });
    } catch (err) {
      alert('Error submitting ticket');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="ticket-form">
      <input name="title" placeholder="Title" value={form.title} onChange={handleChange} required />
      <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} required />
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
      <button type="submit">Create Ticket</button>
    </form>
  );
};

export default TicketForm;
