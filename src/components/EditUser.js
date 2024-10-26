import React, { useState } from 'react';

const EditUser = ({ user, onSave, onCancel }) => {
  const [formData, setFormData] = useState({ ...user }); // Initialize form data with user details

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value })); // Update form data on input change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSave(user.id, formData); // Pass user ID and form data to the save function
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h3>Edit User</h3>
        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name || ''}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>
          <div style={styles.formGroup}>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email || ''}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>
          <div style={styles.formGroup}>
            <label>Phone:</label>
            <input
              type="text"
              name="phone"
              value={formData.phone || ''}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>
          <div style={styles.buttonGroup}>
            <button type="submit" style={styles.saveButton}>Save</button>
            <button type="button" style={styles.cancelButton} onClick={onCancel}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modal: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.3)',
    minWidth: '300px',
  },
  formGroup: {
    marginBottom: '15px',
  },
  input: {
    width: '100%',
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '16px',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  saveButton: {
    padding: '10px 15px',
    fontSize: '16px',
    color: '#fff',
    backgroundColor: '#28a745',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  cancelButton: {
    padding: '10px 15px',
    fontSize: '16px',
    color: '#fff',
    backgroundColor: '#dc3545',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default EditUser;
