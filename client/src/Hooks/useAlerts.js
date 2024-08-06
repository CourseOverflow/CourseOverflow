import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import Alert from "../Components/Alerts/Alert";
import styles from "../Components/Alerts/Alert.module.css";
import { v4 as uuidv4 } from "uuid";

let globalSetAlertQueue;

const AlertContainer = () => {
  const [alertQueue, setAlertQueue] = useState([]);

  useEffect(() => {
    globalSetAlertQueue = setAlertQueue;
  }, []);

  const removeAlert = (id) => {
    setAlertQueue((prevQueue) => prevQueue.filter((alert) => alert.id !== id));
  };

  return (
    <div className={styles.alertList}>
      {alertQueue.map((alert) => (
        <Alert
          key={alert.id}
          type={alert.type}
          message={alert.message}
          onClose={() => removeAlert(alert.id)}
        />
      ))}
    </div>
  );
};

const useAlerts = () => {
  useEffect(() => {
    const alertRoot = document.getElementById("alert-root");
    if (alertRoot && !alertRoot.hasChildNodes()) {
      const root = ReactDOM.createRoot(alertRoot);
      root.render(<AlertContainer />);
    }
  }, []);

  const addAlert = (type, message) => {
    const id = uuidv4();
    const newAlert = { id, type, message };
    globalSetAlertQueue((prevQueue) => [...prevQueue, newAlert]);
    setTimeout(() => {
      globalSetAlertQueue((prevQueue) =>
        prevQueue.filter((alert) => alert.id !== id)
      );
    }, 3000);
  };

  return { addAlert };
};

export default useAlerts;
