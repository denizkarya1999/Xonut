import React, { useState, useEffect } from 'react';
import '../Styles/Admin.css';

const AdminPage = () => {
  const [donuts, setDonuts] = useState([]);
  const [newDonut, setNewDonut] = useState({ name: '', description: '', price: 0 });
  const [updatedDonut, setUpdatedDonut] = useState({ id: null, name: '', description: '', price: 0 });

  useEffect(() => {
    document.title = 'Xonut: Donut Shop by X-27 (Admin Mode)';
    fetch('http://localhost:8080/projects/donutAPI/')
      .then(response => response.json())
      .then(json => {
        setDonuts(json);
      })
      .catch(error => console.error('Error:', error));
  }, []);

  const handleSelectDonutChange = (donutId) => {
    const selectedDonut = donuts.find(donut => donut.id === donutId);

    setUpdatedDonut({
      id: donutId,
      name: selectedDonut ? selectedDonut.name : '',
      description: selectedDonut ? selectedDonut.description : '',
      price: selectedDonut ? selectedDonut.price : 0,
    });
  };

  const handleCreateDonut = (donutName, donutDescription, donutPrice) => {
    const newDonutObject = {
      name: donutName,
      description: donutDescription,
      price: donutPrice,
    };
    fetch('http://localhost:8080/projects/donutAPI/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newDonutObject),
    })
      .then(response => response.json())
      .then(newDonutFromServer => {
        setDonuts([...donuts, newDonutFromServer]);
        setNewDonut({ name: '', description: '', price: 0 });
      })
      .catch(error => console.error('Error creating donut:', error));
  };

  const handleUpdateDonut = (donutId, donutName, donutDescription, donutPrice) => {
    const updatedDonut = {
      id: donutId,
      name: donutName,
      description: donutDescription,
      price: donutPrice,
    };
  
    fetch(`http://localhost:8080/projects/donutAPI/?id=${donutId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedDonut),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(updatedDonutFromServer => {
        const updatedDonuts = donuts.map((donut) =>
          donut.id === updatedDonut.id ? updatedDonutFromServer : donut
        );
        setDonuts(updatedDonuts);
        setUpdatedDonut({ id: null, name: '', description: '', price: 0 });
      })
      .catch(error => console.error('Error editing donut:', error));
  };

  const handleDeleteDonut = (id) => {
    fetch(`http://localhost:8080/projects/donutAPI/?id=${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(() => {
        // Update the state to reflect the deletion
        const updatedDonuts = donuts.filter((donut) => donut.id !== id);
        setDonuts(updatedDonuts);
      })
      .catch((error) => console.error('Error deleting donut:', error));
  };

  return (
    <div className="admin">
      <header className="admin_header">
        <h1>Xonut - Admin Edition</h1>
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
          <button onClick={() => handleCreateDonut(newDonut.name, newDonut.description, newDonut.price)}>
            Create Donut
          </button>
        </div>

        <div className="form-section">
          <h2>Update Donut</h2>
          <label htmlFor="selectDonut">Select Donut:</label>
          <select
            id="selectDonut"
            value={updatedDonut.id}
            onChange={(e) => handleSelectDonutChange(parseInt(e.target.value))}
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
          <button onClick={() => handleUpdateDonut(updatedDonut.id, updatedDonut.name, updatedDonut.description, updatedDonut.price)}>
            Update Donut
          </button>
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
          <button onClick={() => handleDeleteDonut(updatedDonut.id)}>
            Delete Donut
          </button>
        </div>

        <div className="view-section">
          <h2>View Donuts</h2>
          <ul>
            {donuts.map((donut) => (
              <li key={donut.id}>
                <strong>Name:</strong> {donut.name} <br />
                <strong>Description:</strong> {donut.description} <br />
                <strong>Price:</strong> ${donut.price}
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