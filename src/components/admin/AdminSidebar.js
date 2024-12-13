// src/components/admin/AdminSidebar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './AdminSidebar.css';

function AdminSidebar() {
  return (
    <div className="admin-sidebar">
      <h2>Admin Panel</h2>
      <nav>
        <ul>
          <li><Link to="expositions">Gérer les Expositions</Link></li>
          <li><Link to="collections">Gérer les Collections</Link></li>
          <li><Link to="users">Gérer les Utilisateurs</Link></li>
        </ul>
      </nav>
    </div>
  );
}

export default AdminSidebar;
