import React, { useEffect } from "react";
import Login from "../Pages/Auth/Login";
import { connect } from "react-redux";
import { checkAuthenticated, load_user } from "../Actions/Auth";

const AuthCheck = (props) => {
  useEffect(() => {
    // console.log(props);
    props.checkAuthenticated();
    props.load_user();
    // console.log("AuthCheck");
  }, []);
  return (
    <>
      <Login />
      {props.childern}
    </>
  );
};

export default connect(null, { checkAuthenticated, load_user })(AuthCheck);
