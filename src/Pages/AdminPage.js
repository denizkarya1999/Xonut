import React from 'react';
import '../Styles/Admin.css'; 

const AdminPage = () => {
  return (
    <div className="admin">
      <header className="admin_header">
        <h1>Admin Page</h1>
      </header>

      <main className="admin_main">
      </main>

      <footer className="admin_footer">
        <p>&copy; {new Date().getFullYear()} Deniz K Acikbas, All rights are reserved.</p>
      </footer>
    </div>
  );
};

export default AdminPage;