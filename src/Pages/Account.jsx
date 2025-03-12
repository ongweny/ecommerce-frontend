import React, { useState } from "react";
import "../App.css";

const Account = () => {
  const [selectedSection, setSelectedSection] = useState("profile");

  const renderContent = () => {
    switch (selectedSection) {
      case "profile":
        return <p>User profile information...</p>;
      case "saved":
        return <p>Saved items will be displayed here...</p>;
      case "orders":
        return <p>Previous orders...</p>;
      case "logout":
        return <p>Logging out...</p>;
      case "delete":
        return <p>Account deletion process...</p>;
      default:
        return <p>Select an option</p>;
    }
  };

  return (
    <div className="content account-container">
      <div className="account-left">{renderContent()}</div>
      <div className="account-right">
        <ul>
          <li onClick={() => setSelectedSection("profile")}>Profile</li>
          <li onClick={() => setSelectedSection("saved")}>Saved Items</li>
          <li onClick={() => setSelectedSection("orders")}>Previous Orders</li>
          <li className="red" onClick={() => setSelectedSection("logout")}>Logout</li>
          <li className="red" onClick={() => setSelectedSection("delete")}>Delete Account</li>
        </ul>
      </div>
    </div>
  );
};

export default Account;
