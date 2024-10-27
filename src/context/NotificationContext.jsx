import React, { createContext, useContext, useState } from 'react';
import Notification from '../components/Notification/Notification.jsx';

const NotificationContext = createContext();

const NotificationProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('info'); // Can be 'success', 'error', 'warning', 'info'


  const showNotification = (msg, severityType = 'info') => {
    setMessage(msg);
    setSeverity(severityType);
    setOpen(true);
  };

  return (
    <NotificationContext.Provider value={showNotification}>
      {children}
      <Notification open={open} setOpen={setOpen} message={message} severity={severity} />
    </NotificationContext.Provider>
  );
};

const useNotification = () => {
  const showNotification = useContext(NotificationContext);
  if (!showNotification) {
    throw new Error("useNotification must be used within a NotificationProvider");
  }
  return showNotification;
};

export { NotificationProvider, useNotification };
