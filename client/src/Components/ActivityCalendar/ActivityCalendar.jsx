import React from "react";
import styles from "./ActivityCalendar.module.css";

const getRandomActivityLevel = () => Math.floor(Math.random() * 5);

const ActivityCalendar = (props) => {
  const analyticsData = props.analyticsData;
  let dates = [];
  for (let i = 0; i < 365; i++) {
    dates.push(0);
  }
  analyticsData.map((playlist) => {
    let date = new Date(playlist.date);
    let diff = Math.abs(new Date() - date);
    let diffDays = Math.ceil(diff / (1000 * 60 * 60 * 24));
    dates[diffDays] += 1;
  });

  const today = new Date();
  const isLeapYear = (year) =>
    (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;

  const days = Array.from({ length: isLeapYear ? 364 : 365 }, (_, index) => {
    const date = new Date(today);
    date.setDate(today.getDate() - index);
    return {
      date: date.toISOString().slice(0, 10),
      activityLevel: dates[index] <= 4 ? dates[index] : 4,
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
