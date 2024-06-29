import React, { useState, useEffect } from 'react';
import './Admin.css';

function AdminRequests() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:4000/buyRequests`)
      .then((res) => res.json())
      .then((data) => {
        setRequests(data);
      })
      .catch((err) => console.error("Error fetching buy requests:", err));
  }, []);

  const handleApproval = (id, status) => {
    fetch(`http://localhost:4000/buyRequests/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    })
      .then((res) => res.json())
      .then((updatedRequest) => {
        const updatedRequests = requests.map((request) =>
          request.id === updatedRequest.id ? updatedRequest : request
        );
        setRequests(updatedRequests);
      })
      .catch((err) => console.error("Error updating request:", err));
  };

  return (
    <div className="admin-requests-container">
      <h2 className="admin-requests-title">All Buy Requests</h2>
      <div className="admin-requests-list">
        {requests.length === 0 ? (
          <p className="admin-requests-empty">No buy requests found.</p>
        ) : (
          requests.map((request) => (
            <div key={request.id} className="admin-request-item">
              <h3>{request.property.title}</h3>
              <p><b>User:</b> {request.username}</p>
              <p><b>Location:</b> {request.property.location}</p>
              <p><b>Cost:</b> {request.property.cost}</p>
              <p><b>Area:</b> {request.property.squareFeet}</p>
              <p><b>Status:</b> {request.status}</p>
              {request.status === "Pending" && (
                <div className="admin-buttons">
                  <button className="btn approve" onClick={() => handleApproval(request.id, "Approved")}>Approve</button>
                  <button className="btn reject" onClick={() => handleApproval(request.id, "Rejected")}>Reject</button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default AdminRequests;
