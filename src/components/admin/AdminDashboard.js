// src/components/admin/AdminDashboard.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import ManageExpositions from './ManageExpositions';
import ManageCollections from './ManageCollections';
import ManageUsers from './ManageUsers';
import './AdminDashboard.css';

function AdminDashboard() {
  return (
    <div className="admin-dashboard">
      <AdminSidebar />
      <div className="admin-content">
        <Routes>
          <Route path="expositions" element={<ManageExpositions />} />
          <Route path="collections" element={<ManageCollections />} />
          <Route path="users" element={<ManageUsers />} />
        </Routes>
      </div>
    </div>
  );
}

export default AdminDashboard;
