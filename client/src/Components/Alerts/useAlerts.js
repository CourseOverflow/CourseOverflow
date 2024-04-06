import { useState, useEffect, useCallback } from "react";
import store from "../../store";

const useAlerts = () => {
  const [alertQueue, setAlertQueue] = useState(store.alertQueue || []);

  const addAlert = useCallback((type, message) => {
    setAlertQueue((prevQueue) => [
      ...prevQueue,
      { type, message, id: Date.now() },
    ]);
  }, []);

  const removeAlert = useCallback((id) => {
    setAlertQueue((prevQueue) => prevQueue.filter((alert) => alert.id !== id));
  }, []);

  useEffect(() => {
    alertQueue.forEach((alert) => {
      const timeout = setTimeout(() => {
        removeAlert(alert.id);
      }, 3000);
      return () => clearTimeout(timeout);
    });
  }, [alertQueue, removeAlert]);

  return { alertQueue, addAlert, removeAlert };
};

export default useAlerts;
