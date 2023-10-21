import React, { useState , useRef,useEffect} from "react";
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
   
    if (dropdownRef.current && !dropdownRef.current.contains(e.target) ) {
      setOpen(false);
    }
  };

  
  return (
    <button
      className={`${styles.container} relative`}
      ref={dropdownRef}
      onClick={() => setOpen(true)}
    >
      <div className="flex items-center gap-x-1">
        <img
          src="images/logo.png"
          alt="User Profile"
          className={styles["profile-image"]}
        />
        {/* <span className={styles.username}>{props.username}</span> */}
        <AiOutlineCaretDown className="text-sm text-richblack-100" />
      </div>
      {open && (
        <div
          onClick={(e) => e.stopPropagation()}
          
          
          className="absolute  top-[118%] right-2 z-[1000] divide-y-[1px] divide-richblack-700 overflow-hidden rounded-md border-[1px] border-richblack-700 bg-richblack-800 flex flex-col gap-y-1"
          // ref={ref}
        >
          <div className="px-4 p-3 text-sm text-gray-900 dark:text-white flex items-start" onClick={()=>setOpen(false)}>
            <img
              src="images/logo.png"
              alt="User Profile"
              className={`${styles["profile-image"]} `}
            />
            <div className="flex flex-col items-start">
            <span>Ansh</span>
            <span className="font-xs truncate " style={{ fontSize: "0.6rem" }}>name@flowbite.com</span>
            </div>
          </div>
          <ul
            className="py-2 text-sm text-gray-700 dark:text-gray-200 flex flex-col gap-y-1 items-start"
            aria-labelledby="dropdownUserAvatarButton"
          >
            <li>
              <Link
               
                className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white flex gap-2 "
                onClick={() => setOpen(false)}

              >
              <VscDashboard className="text-lg dark:hover:bg-gray-600  " />
                Dashboard
              </Link>
            </li>
            {/* <li>
              <Link
                onClick={() => setOpen(false)}
                class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Settings
              </Link>
            </li> */}

          </ul>
          <div className="py-2">
            <Link
              onClick={() => setOpen(false)}
              className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white flex gap-2 hover:w-[100%]"
            >
             <VscSignOut className="text-lg bg-black" />
              Sign out
            </Link>
          </div>
        </div>
      )}
    </button>
  );
};

export default User;
