import React, { useState, useRef, useEffect } from "react";
import styles from "./User.module.css";
import { Link } from "react-router-dom";
import { VscDashboard } from "react-icons/vsc";
import { VscSignOut } from "react-icons/vsc";
import { AiOutlineCaretDown } from "react-icons/ai";

const User = (props) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // this is the logic for outside click detection automaticaly close the dropdown
  useEffect(() => {
    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  const handleDocumentClick = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setOpen(false);
    }
  };

  return (
    <button
      
      className={`${styles.container} relative`}
      ref={dropdownRef}
      onClick={() => setOpen((prevState) => !prevState)}
    >
      {/* prevstate means -> always opposite to the current state when  we will hit the button */}
      <div className="flex items-center gap-x-1">
        <img
        title="ansh"
          src="images/logo.png"
          alt="User Profile"
          className={`${styles["profile-image"]} ${open ? styles["profile-image-open"] : ''}`}

        />

        <span title="ansh" className={`${styles["username"]} ${open ? styles["profile-image-open"] : ''}`}>{props.username}</span>
        {/* <AiOutlineCaretDown className="text-sm text-richblack-100" /> */}
      </div>
      {open && (
        <div
          onClick={(e) => e.stopPropagation()}
          className={`absolute ${styles["new"]}  top-[125%] -right-4 z-[1000] overflow-hidden rounded-lg border-[1px] bg-richblack-800 flex flex-col gap-y-1 p-16 `}
          // ref={ref}
        >
          <div onClick={() => setOpen(false)} className=" absolute top-0   flex flex-col">
            <span
              className="text-sm truncate pb-4 text-center ml-14 mt-2"
              title="name@flowbite.com"
            >
              name@flowbite.com
            </span>

            
        
            <img
              src="images/logo.png"
              onClick={() => setOpen(false)}
              title="ansh"
              alt="User Profile"
              className={`h-8 w-8 rounded-full ml-24 ${styles["journey"]}}`}
            />
            
              <span  title="ansh" className="ml-12 text-lg" onClick={()=>setOpen(false)}> Hi!! Ansh</span>
          
          </div>
        
         
          <div className={`flex mt-20 ${styles["course"]}  justify-center items-center `}>
            
            <Link
              className="flex items-center  gap-2 px-4 py-2 text-md "
              onClick={() => setOpen(false)}
            >
              <VscDashboard className="text-lg " />
              Dashboard
            </Link>
           
            <div className={styles["divider"]} />
            <Link
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 px-4 py-2 text-sm "
            >
              <VscSignOut className="text-lg" />
              Logout
            </Link>
          </div>
        </div>
      )}
    </button>
  );
};

export default User;
