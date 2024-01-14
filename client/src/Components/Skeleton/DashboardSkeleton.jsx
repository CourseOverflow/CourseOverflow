import React from "react";
import styles from "./Skeletons.module.css";
import HomeSkeleton from "./HomeSkeleton";

const DashboardSkeleton = () => {
  return (
    <>
      <div className={styles.top}>
        <div className={`${styles.half} ${styles.user} flex items-center mt-4`}>
          <svg
            class="h-[150px] w-[150px] me-3 text-gray-200 text-gray-700"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
          </svg>
          <div>
            <div class="h-7 bg-gray-200 rounded-full bg-gray-700 w-[300px] mt-2"></div>
          </div>
        </div>
        <div className={`${styles.half}`}>
          <div class="w-[300px] h-7 bg-gray-200 rounded-full bg-gray-700 mb-2"></div>
          <div class="flex items-baseline mt-5">
            <div class="w-full bg-gray-200 rounded-t-lg h-[35px] dark:bg-gray-700"></div>
            <div class="w-full h-[20px] ms-6 bg-gray-200 rounded-t-lg dark:bg-gray-700"></div>
            <div class="w-full bg-gray-200 rounded-t-lg h-[40px] ms-6 dark:bg-gray-700"></div>
            <div class="w-full h-[80px] ms-6 bg-gray-200 rounded-t-lg dark:bg-gray-700"></div>
            <div class="w-full bg-gray-200 rounded-t-lg h-[160px] ms-6 dark:bg-gray-700"></div>
            <div class="w-full bg-gray-200 rounded-t-lg h-[200px] ms-6 dark:bg-gray-700"></div>
          </div>
        </div>
      </div>
      <HomeSkeleton />
    </>
  );
};

export default DashboardSkeleton;
