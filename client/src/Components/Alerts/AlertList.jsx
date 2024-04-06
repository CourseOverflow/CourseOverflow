import React, { useEffect } from "react";
import styles from "./Alert.module.css";
import Alert from "./Alert";
import ReactDOM from "react-dom";
import useAlerts from "../Alerts/useAlerts";

const AlertList = () => {
  const { alertQueue, addAlert, removeAlert } = useAlerts();
  useEffect(() => {}, [alertQueue]);

  return ReactDOM.createPortal(
    <div className={styles.alertList}>
      <button
        onClick={() =>
          addAlert("Error", "Alerts are working! This is a success alert.")
        }
      >
        Show Alert
      </button>
      {alertQueue.map((alert) => (
        <Alert
          key={alert.id}
          type={alert.type}
          message={alert.message}
          onClose={() => removeAlert(alert.id)}
        />
      ))}
    </div>,
    document.getElementById("alert-root")
  );
};

export default AlertList;
