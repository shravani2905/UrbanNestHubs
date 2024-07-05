import React, { useState, useEffect, useContext } from 'react';
import './Requests.css';
import { UserContext } from '../../Contexts/UserContext';

function Requests() {
  const [user] = useContext(UserContext);
  const [sendingRequests, setSendingRequests] = useState([]);
  const [receivingRequests, setReceivingRequests] = useState([]);

  useEffect(() => {
    fetchSendingRequests();
    fetchReceivingRequests();
  }, [user]);

  const fetchSendingRequests = () => {
    fetch(`http://localhost:4000/buyRequests?username=${user.username}`)
      .then((res) => res.json())
      .then((data) => {
        setSendingRequests(data);
      })
      .catch((err) => console.error("Error fetching sending buy requests:", err));
  };

  const fetchReceivingRequests = () => {
    fetch(`http://localhost:4000/buyRequests?property.seller=${user.username}`)
      .then((res) => res.json())
      .then((data) => {
        setReceivingRequests(data);
      })
      .catch((err) => console.error("Error fetching receiving buy requests:", err));
  };

  const handleApproval = (id) => {
    fetch(`http://localhost:4000/buyRequests/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: "Approved" }), // Update status to Approved
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to update request');
        }
        return res.json();
      })
      .then((updatedRequest) => {
        // Remove the property from properties in db.json
        fetch(`http://localhost:4000/properties/${updatedRequest.property.id}`, {
          method: "DELETE",
        })
          .then((res) => {
            if (!res.ok) {
              throw new Error('Failed to delete property');
            }
            // Refresh receiving requests after deletion
            fetchReceivingRequests();
          })
          .catch((err) => console.error("Error deleting property:", err));
      })
      .catch((err) => console.error("Error updating request:", err));
  };

  const handleReject = (id) => {
    fetch(`http://localhost:4000/buyRequests/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) {
          // Remove the request from receivingRequests state
          setReceivingRequests(receivingRequests.filter((request) => request.id !== id));
        } else {
          console.error("Error rejecting request:", res.statusText);
        }
      })
      .catch((err) => console.error("Error rejecting request:", err));
  };

  return (
    <div className="requests-container">
      <h2 className="requests-title">Your Buy Requests</h2>
      
      {/* Sending Buy Requests */}
      <div className="requests-list">
        <h3 className="sub-title">Sending Buy Requests</h3>
        {sendingRequests.length === 0 ? (
          <p className="requests-empty">No sending buy requests found.</p>
        ) : (
          sendingRequests.map((request) => (
            <div key={request.id} className="request-item">
              {request.property ? (
                <>
                  <h3>{request.property.title}</h3>
                  <p><b>Location:</b> {request.property.location}</p>
                  <p><b>Cost:</b> {request.property.cost}</p>
                  <p><b>Area:</b> {request.property.squareFeet}</p>
                  <p><b>Status:</b> {request.status}</p>
                  <p><b>Receiver:</b> {request.property.seller}</p>
                </>
              ) : (
                <p className="error">Property details not available.</p>
              )}
            </div>
          ))
        )}
      </div>

      {/* Receiving Buy Requests */}
      <div className="requests-list">
        <h3 className="sub-title">Receiving Buy Requests</h3>
        {receivingRequests.length === 0 ? (
          <p className="requests-empty">No receiving buy requests found.</p>
        ) : (
          receivingRequests.map((request) => (
            <div key={request.id} className="request-item">
              {request.property ? (
                <>
                  <h3>{request.property.title}</h3>
                  <p><b>Location:</b> {request.property.location}</p>
                  <p><b>Cost:</b> {request.property.cost}</p>
                  <p><b>Area:</b> {request.property.squareFeet}</p>
                  <p><b>Status:</b> {request.status}</p>
                  <p><b>Sender:</b> {request.username}</p>
                  <p><b>Contact:</b> {request.buyerDetails}</p>
                  {request.status === "Pending" && (
                    <>
                      <button onClick={() => handleApproval(request.id)}>Approve</button>
                      <button onClick={() => handleReject(request.id)}>Reject</button>
                    </>
                  )}
                </>
              ) : (
                <p className="error">Property details not available.</p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Requests;
