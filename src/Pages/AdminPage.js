import React, { useState } from 'react';
import '../Styles/Admin.css';

const AdminPage = () => {
  const [donuts, setDonuts] = useState([]);
  const [newDonut, setNewDonut] = useState({ name: '', description: '', price: 0 });
  const [updatedDonut, setUpdatedDonut] = useState({ id: null, name: '', description: '', price: 0 });

  const handleCreateDonut = () => {
    setDonuts([...donuts, { ...newDonut, id: donuts.length + 1 }]);
    setNewDonut({ name: '', description: '', price: 0 });
  };

  const handleUpdateDonut = () => {
    const updatedDonuts = donuts.map((donut) =>
      donut.id === updatedDonut.id ? updatedDonut : donut
    );
    setDonuts(updatedDonuts);
    setUpdatedDonut({ id: null, name: '', description: '', price: 0 });
  };

  const handleDeleteDonut = (id) => {
    const updatedDonuts = donuts.filter((donut) => donut.id !== id);
    setDonuts(updatedDonuts);
  };

  return (
    <div className="admin">
      <header className="admin_header">
        <h1>Admin Page</h1>
      </header>

      <main className="admin_main">
        <div className="form-section">
          <h2>Create New Donut</h2>
          <label htmlFor="donutName">Name:</label>
          <input
            id="donutName"
            type="text"
            placeholder="Donut Name"
            value={newDonut.name}
            onChange={(e) => setNewDonut({ ...newDonut, name: e.target.value })}
          />
          <label htmlFor="donutDescription">Description:</label>
          <input
            id="donutDescription"
            type="text"
            placeholder="Donut Description"
            value={newDonut.description}
            onChange={(e) => setNewDonut({ ...newDonut, description: e.target.value })}
          />
          <label htmlFor="donutPrice">Price:</label>
          <input
            id="donutPrice"
            type="number"
            placeholder="Donut Price"
            value={newDonut.price}
            onChange={(e) => setNewDonut({ ...newDonut, price: parseFloat(e.target.value) })}
          />
          <button onClick={handleCreateDonut}>Create Donut</button>
        </div>

        <div className="form-section">
          <h2>Update Donut</h2>
          <label htmlFor="selectDonut">Select Donut:</label>
          <select
            id="selectDonut"
            value={updatedDonut.id}
            onChange={(e) => setUpdatedDonut({ ...updatedDonut, id: parseInt(e.target.value) })}
          >
            <option value={null}>Select Donut</option>
            {donuts.map((donut) => (
              <option key={donut.id} value={donut.id}>
                {donut.name}
              </option>
            ))}
          </select>
          <label htmlFor="newDonutName">Name:</label>
          <input
            id="newDonutName"
            type="text"
            placeholder="New Donut Name"
            value={updatedDonut.name}
            onChange={(e) => setUpdatedDonut({ ...updatedDonut, name: e.target.value })}
          />
          <label htmlFor="newDonutDescription">Description:</label>
          <input
            id="newDonutDescription"
            type="text"
            placeholder="New Donut Description"
            value={updatedDonut.description}
            onChange={(e) => setUpdatedDonut({ ...updatedDonut, description: e.target.value })}
          />
          <label htmlFor="newDonutPrice">Price:</label>
          <input
            id="newDonutPrice"
            type="number"
            placeholder="New Donut Price"
            value={updatedDonut.price}
            onChange={(e) => setUpdatedDonut({ ...updatedDonut, price: parseFloat(e.target.value) })}
          />
          <button onClick={handleUpdateDonut}>Update Donut</button>
        </div>

        <div className="form-section">
          <h2>Delete Donut</h2>
          <label htmlFor="deleteDonut">Select Donut:</label>
          <select id="deleteDonut" onChange={(e) => handleDeleteDonut(parseInt(e.target.value))}>
            <option value={null}>Select Donut</option>
            {donuts.map((donut) => (
              <option key={donut.id} value={donut.id}>
                {donut.name}
              </option>
            ))}
          </select>
          <button onClick={handleDeleteDonut}>Delete Donut</button>
        </div>

        <div className="view-section">
          <h2>View Donuts</h2>
          <ul>
            {donuts.map((donut) => (
              <li key={donut.id}>
                <strong>Name:</strong> {donut.name} <br />
                <strong>Description:</strong> {donut.description} <br />
                <strong>Price:</strong> ${donut.price.toFixed(2)}
              </li>
            ))}
          </ul>
        </div>
      </main>

      <footer className="admin_footer">
        <p>&copy; {new Date().getFullYear()} Deniz K Acikbas, All rights are reserved.</p>
      </footer>
    </div>
  );
};

export default AdminPage;