import React from 'react';
import Header from '../Layout/Header';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white rounded-lg shadow p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Welcome to Contact Manager</h1>
            <p className="text-gray-600 mb-6">Manage your contacts efficiently and securely.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-indigo-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-indigo-900 mb-2">Total Contacts</h3>
                <p className="text-3xl font-bold text-indigo-600">150</p>
              </div>
              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-green-900 mb-2">Recent Activity</h3>
                <p className="text-3xl font-bold text-green-600">12</p>
              </div>
              <div className="bg-purple-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-purple-900 mb-2">Categories</h3>
                <p className="text-3xl font-bold text-purple-600">5</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;