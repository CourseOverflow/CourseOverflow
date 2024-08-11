import React from "react";
import styles from "./ActivityCalendar.module.css";

// Helper function to generate random activity levels
const getRandomActivityLevel = () => Math.floor(Math.random() * 5);

const ActivityCalendar = () => {
  // Generate 365 days of data with random activity levels
  const today = new Date();
  const isLeapYear = (year) =>
    (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  const days = Array.from({ length: isLeapYear ? 364 : 365 }, (_, index) => {
    const date = new Date(today);
    date.setDate(today.getDate() - index);
    return {
      date: date.toISOString().slice(0, 10), // Format: YYYY-MM-DD
      activityLevel: getRandomActivityLevel(), // Random activity level between 0 and 4
    };
  });

  return (
    <div className={styles.calendarWrapper}>
      <div className={styles.calendar}>
        {days.reverse().map((day, index) => (
          <div
            key={index}
            className={`${styles.day} ${styles[`level${day.activityLevel}`]}`}
            title={`Date: ${day.date}, Activity: ${day.activityLevel}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ActivityCalendar;
