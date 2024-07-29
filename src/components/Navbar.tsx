import React, { useState } from "react";
import { useNotification } from "../contexts/NotificationContext";
import { FaBell, FaEnvelopeOpen, FaEnvelope } from "react-icons/fa";

const Navbar: React.FC = () => {
    const { notifications, markAsRead } = useNotification();
    const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="topbar">
    <h1>Notification App</h1>
    <div className="notification-bell" onClick={() => setDropdownOpen(!dropdownOpen)}>
      <FaBell size={24} />
      {dropdownOpen && notifications?.length ? (
        <div className="notification-dropdown">
          {notifications.map(notification => (
            <div
              key={notification.id}
              className={`notification-dropdown-item ${notification.read ? "read" : "unread"}`}
              onClick={() => markAsRead(notification.id)}
            >
              {notification.read ? <FaEnvelopeOpen className="notification-icon" /> : <FaEnvelope className="notification-icon" />}
              {notification.message}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  </div>
  );
};

export default Navbar;
